import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      gatewayId: null,
      type: "indoor",
      frequency: "Asia 920-923MHz",
      model: "X01",
      location: null,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleGatewayId = this.handleGatewayId.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleFrequency = this.handleFrequency.bind(this);
    this.handleModel = this.handleModel.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }
  handleToggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleGatewayId(event) {
    this.setState({
      gatewayId: event.target.value,
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
    })
  }
  handlePost(){

  }
  render() {
    const pagination = {
      current: 0,
      total: 1,
      pageSize: 10,
    }
    const dataSource = [
      {
        gatewayId: "7EFD63FFFE6CBE49",
        frequencyPlan: "China 433MHz",
        location: "(116E 39.5N)",
        model: "X01",
        type: "outdoor",
        timestamp: "1564042658",
      }
    ];
    const columns = [
      {
        title: '网关ID',
        dataIndex: 'gatewayId',
        key: 'gatewayId',
        width: '10%',
        render: gatewayId => <Link to={`/gateway/${gatewayId}/data`}>{gatewayId}</Link>,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        render: type => type,
      },
      {
        title: '频段',
        dataIndex: 'frequencyPlan',
        key: 'frequencyPlan',
        width: '10%',
        render: frequencyPlan => frequencyPlan,
      },
      {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
        width: '10%',
        render: model => model,
      },
      {
        title: '地理位置',
        dataIndex: 'location',
        key: 'location',
        width: '10%',
        render: location => location,
      },
      {
        title: '最新数据时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: '10%',
        render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
    ];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-feed"></i> LoRa网关设备
                <div className="card-header-actions">
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

        <Modal isOpen={this.state.modal} toggle={this.handleToggle} key="gateway_create">
          <ModalHeader toggle={this.handleToggle}>创建网关</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              <InputGroup className="mb-3">
                <Col md="3">
                  <InputGroupText>
                    网关ID：
                </InputGroupText>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="gatewayId" name="gatewayId" placeholder="唯一且为8字节长" value={this.state.gatewayId} onChange={this.handleGatewayId} />
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
                  <Input type="text" id="location" name="location" placeholder="网关地理位置" value={this.state.location} onChange={this.handleLocation} />
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handlePost}>确认</Button>{' '}
            <Button color="secondary" onClick={this.handleToggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default Index;
