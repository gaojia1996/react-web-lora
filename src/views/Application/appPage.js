import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
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
      euiValid: true,
      name: "",
      AppEUI: this.getRandom(16),
      description: "",
      pageSize: 8,
      currentPage: 1,
      data: {
        count: 0,
        rows: [],
      },
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAppEUI = this.handleAppEUI.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }
  componentDidMount() {
    this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize);
  }
  getAppData(userId, pageNumber, pageSize) {
    getDataFuncs.getAppInfo(userId, pageNumber, pageSize)
      .then(res => {
        this.setState({
          data: res,
        });
      })
      .catch(() => { console.log('获取用户应用列表数据错误~') })
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
          alert('删除成功~');
          if (this.state.data['rows'].length === 1 && this.state.pageSize !== 1) {
            this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize - 1);
          } else {
            this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize);
          }
        }
        else {
          alert('删除遇到问题~');
        }
      })
      .catch(() => {
        alert("删除失败，删除请求错误~");
      })

  }
  postAppInfo(userId, AppEUI, name, description) {
    if (this.state.name === null) {
      alert('应用名称不能为空，请重新输入~');
    } else if (this.state.AppEUI === null || this.state.AppEUI.length !== 16) {
      alert("AppEUI为16位，请重新输入~");
    } else {
      const Url = baseUrl + '/application';
      var data = {
        userID: userId,
        AppEUI: AppEUI,
        name: name,
        description: description
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
            alert('成功创建应用~');
            this.handleToggle();
            this.setState({
              AppEUI: this.getRandom(16),
            });
            this.getAppData(this.props.data.userId, this.state.pageNumber, this.state.pageSize);
          } else if (res.code === 3108) {
            alert('名字不能为空，请重新输入~');
          } else if (res.code === 3107) {
            alert('APPEUI不能为空，请重新输入~');
          } else if (res.code === 2103) {
            alert('AppEUI格式错误，请重新输入~');
          } else if (res.code === 3201) {
            alert('创建失败，该应用已经存在~');
            this.handleToggle();
          }
          else {
            alert('创建失败,遇到其它未知的错误~');
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
      nameValid: event.target.value === " " || event.target.value === null || event.target.value === "" || (event.target.value.length > 0 && event.target.value.trim().length === 0) ? false : true,
    });
  }
  handleAppEUI(event) {
    const regexp = /[0-9a-fA-F]{16}/;
    this.setState({
      AppEUI: event.target.value,
      euiValid: regexp.test(event.target.value) ? false : true,
    });
  }
  handleDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }
  render() {
    const dataSource = this.state.data['rows'].length !== 0 ?
      this.state.data['rows'].map((each) => {
        return ({
          name: each['name'],
          AppEUI: each['AppEUI'],
          description: each['description'],
          timestamp: moment(new Date(each['updatedAt'])).format('YYYY/MM/DD HH:mm:ss'),
        })
      }) : [];

    const columns = [
      {
        title: '应用名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text, record, index) => {
          return <Link to={
            {
              pathname: `/application/${record.AppEUI}/${text}/dataType`,
            }
          }>{text}</Link>
        }
      },
      {
        title: 'AppEUI',
        dataIndex: 'AppEUI',
        key: 'AppEUI',
        width: '10%',
        sorter: (a, b) => parseInt(String(a.AppEUI), 16) - parseInt(String(b.AppEUI), 16),
        render: AppEUI => AppEUI,
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '10%',
        render: description => (description === null || description.length === 0 || description.trim().length === 0) ? '暂无' : description
      },
      {
        title: '创建时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)),
        width: '10%',
        render: timestamp => timestamp,
      },
      {
        title: '操作',
        dataIndex: 'deleteEach',
        key: 'deleteEach',
        width: '5%',
        render: (text, record, index) => {
          return (
            <Button color="danger" onClick={() => {
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
                    current: this.state.currentPage,
                    total: this.state.data['count'],
                  }}
                  onChange={(pagination) => {
                    this.setState({
                      currentPage: pagination.current,
                    });
                    this.getAppData(this.props.data.userId, pagination.current, this.state.pageSize);
                  }}
                  dataSource={dataSource}
                  columns={columns}
                  rowKey={record => record.timestamp}
                  loading={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.handleToggle} key="application_create">
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
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    描述：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" id="description" name="description" placeholder="选填，添加适当的描述" value={this.state.description}
                    onChange={this.handleDescription} />
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              this.postAppInfo(this.props.data.userId, this.state.AppEUI, this.state.name, this.state.description);
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
