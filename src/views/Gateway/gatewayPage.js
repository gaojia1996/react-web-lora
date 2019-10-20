// import React, { Component, useDebugValue } from 'react';
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, } from 'reactstrap';
// import { Table, Descriptions } from 'antd';
import { Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from 'query-string'
import config from '../../config.js'
import {
  getGatewayInfo, selectedGateway,
} from '../../redux/actions/action_gateway'
const baseUrl = config.dataUrl;
class GatewayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: null,
      nameValid: false,
      idValid: false,
      locationValid: false,
      gatewayId: null,
      type: "indoor",
      frequency: "Asia 920-923MHz",
      model: "X01",
      location: null,
      description: null,
      isDataSourceUpdated: false,
      pageSize: 7,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGatewayId = this.handleGatewayId.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleFrequency = this.handleFrequency.bind(this);
    this.handleModel = this.handleModel.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }
  componentDidMount() {
    this.props.getGatewayInfo(this.props.data.userId, this.props.data.currentPageOfGateway, this.state.pageSize);
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
  handleGatewayId(event) {
    this.setState({
      gatewayId: event.target.value,
      idValid: event.target.value.length !== 16 || event.target.value === null || event.target.value === "" ? false : true,
    });
  }
  handleType(event) {
    this.setState({
      type: event.target.value,
    });
  }
  handleFrequency(event) {
    this.setState({
      frequency: event.target.value,
    });
  }
  handleModel(event) {
    this.setState({
      model: event.target.value,
    })
  }
  handleLocation(event) {
    this.setState({
      location: event.target.value,
      locationValid: event.target.value === " " || event.target.value === null || event.target.value === "" ? false : true,
    })
  }
  handleDescription(event) {
    this.setState({
      description: event.target.value,
    })
  }
  handlePost() { }
  deleteOneGateway(id) {
    const Url = baseUrl + '/gateway';
    var data = {
      gatewayId: id,
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
          alert('该网关删除成功');
          //再次刷新页面
          this.props.getGatewayInfo(this.props.data.userId, this.props.data.currentPageOfGateway, this.state.pageSize);
        } else {
          alert('删除操作遇到问题');
          console.log('the res code is ', res.code);
          console.log('the res is ', res)
        }
      })
      .catch(() => {
        alert("删除失败，删除请求错误");
      })


  }
  postGatewayInfo(name, id, type, frequency, model, location, description) {
    if (name === null) {
      alert("网关名称不能为空,请重新输入");
    } else if (id === null) {
      alert("网关ID不能为空，请重新输入");
    } else if (id.length !== 16) {
      alert("网关ID位数为16，请重新输入")
    } else if (location === null) {
      alert('地址位置不能为空，请重新输入');
    } else {
      const Url = baseUrl + '/gateway';
      var data = {
        name: name,
        userID: this.props.data.userId,
        gatewayId: id,
        type: type,
        frequencyPlan: frequency,
        model: model,
        location: location,
        description: description,
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
            alert('创建网关成功');
            this.handleToggle();
            //再次刷新页面
            this.props.getGatewayInfo(this.props.data.userId, this.props.data.currentPageOfGateway, this.state.pageSize);
          } else if (res.code === 400) {
          } else if (res.code === 3109) {
            alert("创建失败，请填写完整的信息");
          } else if (res.code === 2106) {
            alert("创建失败，请输入正确格式的网关ID")
          } else if (res.code === 3401) {
            alert('创建失败，该网关已经存在');
          } else if (res.code === 3102) {
            alert("该用户还没有注册，请先注册用户");
          } else {
            alert('网关创建失败,未知问题');
            console.log('the res code is ', res.code);
            console.log('the res is ', res)
          }
        })
    }

  }

  render() {
    const dataSource = this.props.data.gatewayInfo.map((each) => {
      return ({
        gatewayId: each['gatewayId'],
        name: each['name'],
        frequencyPlan: each['frequencyPlan'],
        location: each['location'],
        model: each['model'],
        type: each['type'],
        timestamp: moment(new Date(each['updatedAt'])).format('YYYY/MM/DD HH:mm:ss'),
        description: each['description'],
        // deleteEach:<button>删除</button>
      })
    })
    const columns = [
      {
        title: '网关名称',
        dataIndex: 'name',
        key: 'name',
        width: '5%',
        render: (text, record, index) => {
          var thisId = this.props.data.gatewayInfo[index]['gatewayId'] !== undefined ? this.props.data.gatewayInfo[index]['gatewayId'] : null;
          var name = text
          // console.log('the id of this name is '  + '     ' + thisId + " " + name);
          return <Link to={
            {
              pathname: `/gateway/${thisId}/${name}/data`,
              state: { name: name }
            }
          }>{name}</Link>
          // render: (index) => {
          //   var thisId = null;
          //   for(var i = 0; i < this.props.data.gatewayInfo.length; i++) {
          //     if(this.props.data.gatewayInfo[i]['name'] === name) {
          //       thisId = this.props.data.gatewayInfo[i]['gatewayId'];
          //       console.log('the id of this name is ' + name + '     ' + index);
          //     }
          //   }
          //   return <Link to = {
          //     {
          //       pathname: `/gateway/${thisId}/${name}/data`,
          //       state:{name:name}
          //     }
          //   }>{name}</Link>
        }
      },
      {
        title: '网关ID',
        dataIndex: 'gatewayId',
        key: 'gatewayId',
        width: '10%',
        render: (gatewayId) => gatewayId
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '5%',
        render: type => type,
      },
      {
        title: '频段',
        dataIndex: 'frequencyPlan',
        key: 'frequencyPlan',
        width: '5%',
        render: frequencyPlan => frequencyPlan,
      },
      {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
        width: '5%',
        render: model => model,
      },
      {
        title: '地理位置',
        dataIndex: 'location',
        key: 'location',
        width: '5%',
        render: location => location,
      },
      {
        title: '最新数据时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: '10%',
        // render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        render: timestamp => timestamp,
      },
      {
        title: '网关描述',
        dataIndex: 'description',
        key: 'description',
        width: '10%',
        // render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        render: description => description === null ? '暂无' : description,
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
              if (this.props.data.gatewayInfo[index]['gatewayId'] !== undefined) {
                this.deleteOneGateway(this.props.data.gatewayInfo[index]['gatewayId']);
                // this.props.getGatewayInfo(this.props.data.userId, this.props.data.currentPageOfGateway, this.state.pageSize);
              }
            }}>删除</Button>
          )
        },
      },
    ];
    // console.log('the redux data is ',this.props.data);
    return (

      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-feed"></i>LoRa网关设备
                <div className="card-header-actions">
                  <Button color="warning" onClick={this.handleToggle}><i className="icon-plus"></i> {" "}创建</Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  //   pagination={pagination}
                  pagination={
                    {
                      pageSize: this.state.pageSize,
                      total: this.props.data.gatewayNumber,
                      current: this.props.data.currentPageOfGateway

                    }
                  }
                  //   onChange={this.handleChange}
                  onChange={(pagination) => {
                    this.setState({
                      currentPage: pagination.current,
                    });
                    this.props.getGatewayInfo(this.props.data.userId, pagination.current, this.state.pageSize);

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
          <ModalHeader toggle={this.handleToggle}>创建网关</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    网关名称：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" placeholder="必填" value={this.state.name} onChange={this.handleName} maxLength={10}
                    valid={this.state.nameValid} invalid={!this.state.nameValid} />
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    网关ID：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="gatewayId" name="gatewayId" placeholder="必填，唯一且为8字节长(16个字符)" value={this.state.gatewayId} onChange={this.handleGatewayId} maxLength={16} pattern="[0-9a-fA-F]{0,16}"
                    valid={this.state.idValid} invalid={!this.state.idValid} />
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    类型：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" id="type" name="type" onChange={this.handleType}>
                    <option value="indoor">indoor</option>
                    <option value="outdoor">outdoor</option>
                  </Input>
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    频段：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" id="frequency" name="frequency" onChange={this.handleFrequency}>
                    <option value="Asia 920-923MHz">Asia 920-923MHz</option>
                    <option value="Asia 923-925MHz">Asia 923-925MHz</option>
                    <option value="Australia 915MHz">Australia 915MHz</option>
                    <option value="China 433MHz">China 433MHz</option>
                    <option value="China 470-510MHz">China 470-510MHz</option>
                    <option value="Europe 868MHz">Europe 868MHz</option>
                    <option value="India 865-867MHz">India 865-867MHz</option>
                    <option value="Korea 920-923MHz">Korea 920-923MHz</option>
                    <option value="United States 915MHz">United States 915MHz</option>
                  </Input>
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    型号：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" id="model" name="model" onChange={this.handleModel}>
                    <option value="X01">X01</option>
                    <option value="X02">X02</option>
                    <option value="X03">X03</option>
                  </Input>
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    地理位置：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="location" name="location" placeholder="必填，网关的地理位置" value={this.state.location} onChange={this.handleLocation}
                    valid={this.state.locationValid} invalid={!this.state.locationValid} />
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    网关描述：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" id="description" name="description" placeholder="选填，为网关添加适当的描述" value={this.state.description} onChange={this.handleDescription} />
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              this.postGatewayInfo(this.state.name, this.state.gatewayId, this.state.type, this.state.frequency, this.state.model, this.state.location, this.state.description);
            }
            }>确认</Button>{' '}
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
  return bindActionCreators({ getGatewayInfo, selectedGateway }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GatewayPage);
