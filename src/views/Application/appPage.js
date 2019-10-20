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
      nameValid: false,
      euiValid: false,
      name: null,
      // AppEUI: this.getRandom(16),
      AppEUI: null,
      pageSize: 7,
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
        this.setState({
          data: res
        })
      })
      .catch(() => { console.log('获取网关通信数据错误'); })
  }
  deleteOneApp(AppEUI) {
    const Url = baseUrl + '/application';
    var data = {
      AppEUI: AppEUI,
    }
    fetch(Url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: qs.stringify(data),
    }).then(responce => responce.json())
      .then(res => {
        if (res.code === 200) {
          alert('删除成功');
          this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize);
        }
        else {
          alert('删除遇到问题');
        }
      })
      .catch(() => {
        alert("删除失败，删除请求错误");
      })

  }
  postAppInfo(userId, AppEUI, name) {
    if (this.state.name === null) {
      alert('应用名称不能为空，请重新输入');
    } else if (this.state.AppEUI === null || this.state.AppEUI.length !== 16) {
      alert("AppEUI为16位，请重新输入");
    } else {
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
            alert('成功创建应用');
            this.handleToggle();
            this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize);
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
            this.handleToggle();
          }
        })
    }

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
      nameValid: event.target.value === " " || event.target.value === null || event.target.value === "" ? false : true,
    });
  }
  handleAppEUI(event) {
    this.setState({
      AppEUI: event.target.value,
      euiValid: event.target.value.length !== 16 || event.target.value === null || event.target.value === "" ? false : true,
    });
  }
  handlePost() {

  }
  render() {
    // console.log('the state is ',this.state)
    const dataSource = this.state.data['rows'].map((each) => {
      return ({
        name: each['name'],
        AppEUI: each['AppEUI'],
        timestamp: moment(new Date(each['updatedAt'])).format('YYYY/MM/DD HH:mm:ss'),
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
      {
        title: '',
        dataIndex: 'deleteEach',
        key: 'deleteEach',
        width: '10%',
        // render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        render: (text, record, index) => {
          return (
            <Button color="danger" onClick={() => {
              // alert('this is ' + this.state.data['rows'][index]['AppEUI']);
              if (this.state.data['rows'][index]['AppEUI'] !== undefined) {
                this.deleteOneApp(this.state.data['rows'][index]['AppEUI']);
              }
            }}>删除</Button>
          )
        },
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
                  <Input type="text" id="name" name="name" placeholder="应用名称" value={this.state.name}
                    onChange={this.handleName} maxLength={10} valid={this.state.nameValid} invalid={!this.state.nameValid} />
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    AppEUI：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="AppEUI" name="AppEUI" placeholder="唯一且为8字节长" value={this.state.AppEUI}
                    onChange={this.handleAppEUI} maxLength={16} pattern="[0-9a-fA-F]{0,16}" valid={this.state.euiValid} invalid={!this.state.euiValid} />
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
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

