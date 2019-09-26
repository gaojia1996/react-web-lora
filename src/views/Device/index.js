import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, Badge } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalSelect: false,
      activationMode: "OTAA",
      protocolVersion: "LoRaWAN 1.0.2",
      DevEUI: this.getRandom(16), //FIX ME
      AppKey: this.getRandom(32),//FIX ME
      frequencyPlan: "433 MHz",
      DevAddr: this.getRandom(8), //FIX ME
      AppSKey: this.getRandom(32), //FIX ME
      NwkSKey: this.getRandom(32), //FIX ME
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggleSelect = this.handleToggleSelect.bind(this);
    this.handleActivationMode = this.handleActivationMode.bind(this);
    this.handleDevEUI = this.handleDevEUI.bind(this);
    this.handleProtocolVersion = this.handleProtocolVersion.bind(this);
    this.handleAppKey = this.handleAppKey.bind(this);
    this.handleFrequencyPlan = this.handleFrequencyPlan.bind(this);
    this.handleDevAddr = this.handleDevAddr.bind(this);
    this.handleAppSKey = this.handleAppSKey.bind(this);
    this.handleNwkSKey = this.handleNwkSKey.bind(this);
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
  handleToggleSelect() {
    this.setState({
      modalSelect: !this.state.modalSelect,
    });
  }
  handleActivationMode(event) {
    this.setState({
      activationMode: event.target.value,
    });
  }
  handleProtocolVersion(event) {
    this.setState({
      protocolVersion: event.target.value,
    });
  }
  handleDevEUI(event) {
    this.setState({
      DevEUI: event.target.value,
    });
  }
  handleAppKey(event) {
    this.setState({
      AppKey: event.target.value,
    });
  }
  handleFrequencyPlan(event) {
    this.setState({
      frequencyPlan: event.target.value,
    });
  }
  handleDevAddr(event) {
    this.setState({
      DevAddr: event.target.value,
    });
  }
  handleAppSKey(event) {
    this.setState({
      AppSKey: event.target.value,
    });
  }
  handleNwkSKey(event) {
    this.setState({
      NwkSKey: event.target.value,
    });
  }
  handlePost() {
  }
  handlePostSelect() {
  }
  FormItem() {
    if (this.state.activationMode === "OTAA") {
      return (
        <React.Fragment>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                设备唯一标识符：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="text" id="DevEUI" name="DevEUI" placeholder="唯一且为8字节长" value={this.state.DevEUI} onChange={this.handleDevEUI}>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                AppKey：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="text" id="AppKey" name="AppKey" placeholder="唯一且为16字节长" value={this.state.AppKey} onChange={this.handleAppKey}>
              </Input>
            </Col>
          </InputGroup>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                设备使用频段：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="select" id="frequencyPlan" name="frequencyPlan" onChange={this.handleFrequencyPlan}>
                <option value="Asia 920-923MHz">433 MHz</option>
                <option value="Asia 923-925MHz">787 MHz</option>
                <option value="Australia 915MHz">868 MHz</option>
                <option value="China 433MHz">915 MHz</option>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                设备唯一标识符：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="text" id="DevEUI" name="DevEUI" placeholder="唯一且为8字节长" value={this.state.DevEUI} onChange={this.handleDevEUI}>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                设备地址：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="text" id="DevAddr" name="DevAddr" placeholder="唯一且为4字节长" value={this.state.DevAddr} onChange={this.handleDevAddr}>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                AppSKey：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="text" id="AppSKey" name="AppSKey" placeholder="唯一且为16字节长" value={this.state.AppSKey} onChange={this.handleAppSKey}>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                NwkSKey：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="text" id="NwkSKey" name="NwkSKey" placeholder="唯一且为16字节长" value={this.state.NwkSKey} onChange={this.handleNwkSKey}>
              </Input>
            </Col>
          </InputGroup>
        </React.Fragment>
      );
    }
  }
  // getDataSource() {
  //   const data = this.props.data.firstItems; //从store中获取数据
  //   if (data.length === 0 || data.length !== config.devAddr.length) { return []; }
  //   else {
  //     const dataSource = [];
  //     config.devAddr.map((k, i) => {
  //       const state = this.getStateItem(data[i][0].data);
  //       const objectPush = {
  //         name: i,
  //         addr: config.addrArray[i],
  //         timestamp: data[i][0].timestamp,
  //         state: state,
  //       }
  //       return dataSource[i] = objectPush;
  //     });
  //     return dataSource;
  //   }
  // }
  getColumns() {
    return [
      {
        title: "设备名称",
        dataIndex: "name",
        key: "name",
        width: "25%",
        // render: name => <Link to={`/application/device/${config.devAddr[name]}/table/1`}>{`环境监测设备-${name + 1}`}</Link>,
      },
      {
        title: "地址",
        dataIndex: "addr",
        key: "addr",
        width: "25%",
        render: addr => addr,
      },
      {
        title: "最新数据时间",
        dataIndex: "timestamp",
        key: "timestamp",
        width: "30%",
        render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: "设备状态",
        dataIndex: "state",
        key: "state",
        width: "20%",
        render: state => state ? <Badge color="danger">Alarming!</Badge> : <Badge color="success">Active</Badge>
      }
    ];
  }
  render() {
    const pagination = {
      current: 0,
      total: 1,
      pageSize: 10,
    }
    const dataSource = [
      {
        DevEUI: "22b766c413a5c932",
        name: "设备一",
        address: "科研楼一层",
        timestamp: "1564042658",
        status: true,
      }
    ];
    const columns = [
      {
        title: 'LoRa设备唯一标识符',
        dataIndex: 'DevEUI',
        key: 'DevEUI',
        width: '10%',
        render: DevEUI => <Link to={`/device/${DevEUI}/data`}>{DevEUI}</Link>,
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        render: name => name,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: '10%',
        render: address => address,
      },
      {
        title: '最新数据时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: '10%',
        render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        render: status => status ? <Badge color="success">Active</Badge> : <Badge color="danger">Alarming!</Badge>,
      },
    ];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-layers"></i> LoRa传感设备
                <div className="card-header-actions">
                  <Button color="warning" onClick={this.handleToggleSelect}><i className="icon-note"></i> {" "}选择产品</Button>
                  {" "}
                  <Button color="warning" onClick={this.handleToggle}><i className="icon-plus"></i> {" "}创建</Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  pagination={pagination}
                  onChange={this.handleChange}
                  dataSource={dataSource}
                  columns={columns}
                  rowKey={record => record.timestamp}
                  scroll={{ x: 1200 }}
                  loading={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.handleToggle} key="device_create">
          <ModalHeader toggle={this.handleToggle}>创建设备</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              <InputGroup className="mb-3">
                <Col md="4">
                  <InputGroupText>
                    LoRaWAN版本：
                </InputGroupText>
                </Col>
                <Col xs="12" md="8">
                  <Input type="select" id="protocolVersion" name="protocolVersion" onChange={this.handleProtocolVersion}>
                    <option value="LoRaWAN 1.0.2">LoRaWAN 1.0.2</option>
                    <option value="LoRaWAN 1.1">LoRaWAN 1.1</option>
                  </Input>
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="4">
                  <InputGroupText>
                    设备激活模式：
                </InputGroupText>
                </Col>
                <Col xs="12" md="8">
                  <Input type="select" id="activationMode" name="activationMode" onChange={this.handleActivationMode}>
                    <option value="OTAA">OTAA</option>
                    <option value="ABP">ABP</option>
                  </Input>
                </Col>
              </InputGroup>
              {this.FormItem()}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handlePost}>确认</Button>{' '}
            <Button color="secondary" onClick={this.handleToggle}>取消</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalSelect} toggle={this.handleToggleSelect} key="AppEUI_select">
          <ModalHeader toggle={this.handleToggleSelect}>选择应用</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    选择应用：
                  </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" id="protocolVersion" name="protocolVersion">
                    <option value="indoor">应用1</option>
                    <option value="outdoor">应用2</option>
                  </Input>
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handlePostSelect}>确认</Button>{' '}
            <Button color="secondary" onClick={this.handleToggleSelect}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default Index;
