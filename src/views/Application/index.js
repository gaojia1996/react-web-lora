import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: null,
      AppEUI: this.getRandom(16),
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAppEUI = this.handleAppEUI.bind(this);
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
    const pagination = {
      current: 0,
      total: 1,
      pageSize: 10,
    }
    const dataSource = [
      {
        name: "WeatherStation_Pb ",
        AppEUI: "8b912fb159a92328",
        timestamp: "1564042658",
      },
      {
        name: "Irrigation_pb  ",
        AppEUI: "2ab5fc5445f1b6c4",
        timestamp: "1564042658",
      }
    ];
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
        render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
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
            <Button color="primary" onClick={this.handlePost}>确认</Button>{' '}
            <Button color="secondary" onClick={this.handleToggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default Index;
