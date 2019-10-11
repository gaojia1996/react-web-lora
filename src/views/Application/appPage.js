import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from 'query-string';
import getDataFuncs from '../../redux/actions/getDataFuncs'
import config from '../../config.js'

const baseUrl = config.dataUrl;
class AppPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: null,
      AppEUI: this.getRandom(16),
      pageSize: 3,
      currentPage: 1,
      data: {
        count: 0,
        rows: [],
      },
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAppEUI = this.handleAppEUI.bind(this);
  }
  componentDidMount() {
    this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize);
  }
  getAppData(userId, pageNumber, pageSize) {

    getDataFuncs.getAppInfo(userId, pageNumber, pageSize)
      .then(res => {
        console.log('the appInfo in this page is ', res)
        this.setState({
          data: res
        })
      })
      .catch(() => { console.log('获取网关通信数据错误'); })
  }
  postAppInfo(userId, AppEUI, name) {
    const Url = baseUrl + '/application';
    var data = {
      userID: userId,
      AppEUI: AppEUI,
      name: name,
    }
    fetch(Url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: qs.stringify(data),
    }).then(responce => responce.json())
      .then(res => {
        if (res.code === 200) {
          console.log('应用创建成功');
          alert('成功创建应用');
          this.handleToggle();
          const temp_data = this.state.data;
          this.setState({
            data: {
              ...temp_data,
              count: temp_data['count'] + 1,
            }
          })
        } else if (res.code === 3108) {
          alert('名字不能为空，请重新输入');
        } else if (res.code === 3107) {
          alert('APPEUI不能为空，请重新输入');
        } else if (res.code === 2103) {
          alert('AppEUI格式错误，请重新输入');
        } else if (res.code === 3201) {
          alert('创建失败，该应用已经存在');
          this.handleToggle();
        }
        else {
          alert('创建失败,遇到其它未知的错误');
          console.log('the res code is ', res.code);
          console.log('the res is ', res);
          this.handleToggle();
        }
      })
  }
  getRandom(weishu) {
    var random = '';
    for (var i = 0; i < weishu; i++) {
      var a = parseInt(Math.random() * 16).toString(16);
      random = random + a;
    }
    return random;
  }
  handleToggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleAppEUI(event) {
    this.setState({
      AppEUI: event.target.value,
    });
  }
  handlePost() {

  }
  render() {
    console.log('the app data is ', this.props.data);


    const dataSource = this.state.data['rows'].map((each) => {
      return ({
        name: each['name'],
        AppEUI: each['AppEUI'],
        timestamp: moment(new Date(each['updatedAt'])).format('YYYY/MM/DD hh:mm:ss'),
      })
    })

    const columns = [
      {
        title: 'AppEUI',
        dataIndex: 'AppEUI',
        key: 'AppEUI',
        width: '10%',
        render: AppEUI => AppEUI,
      },
      {
        title: '应用名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        render: name => name,
      },
      {
        title: '创建时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: '10%',
        render: timestamp => timestamp,
      },
    ];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-handbag"></i> LoRa应用
                <div className="card-header-actions">
                  <Button color="warning" onClick={this.handleToggle}><i className="icon-plus"></i> {" "}创建</Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  pagination={{
                    pageSize: this.state.pageSize,
                    //   current:this.state.currentPage,
                    total: this.state.data['count']
                  }}
                  onChange={(pagination) => {
                    this.setState({
                      currentPage: pagination.current,
                    })
                    this.getAppData(this.props.data.userId, pagination.current, this.state.pageSize);

                  }}
                  dataSource={dataSource}
                  columns={columns}
                  rowKey={record => record.timestamp}
                  scroll={{ x: 1200 }}
                  loading={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.handleToggle} key="gateway_create">
          <ModalHeader toggle={this.handleToggle}>创建应用</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    应用名称：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" placeholder="应用名称" value={this.state.name} onChange={this.handleName} />
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    AppEUI：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="AppEUI" name="AppEUI" placeholder="唯一且为8字节长" value={this.state.AppEUI} onChange={this.handleAppEUI} />
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              console.log('准备提交')
              this.postAppInfo(this.props.data.userId, this.state.AppEUI, this.state.name);
            }}>确认</Button>{' '}
            <Button color="secondary" onClick={this.handleToggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage);

