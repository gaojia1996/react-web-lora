import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { devicesFirst, applicationChange, changeCurrentPage, app2device } from '../../redux/actions';
import { bindActionCreators } from "redux";
import fetchData from '../../redux/fetchData';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalSelect: false,
      activationMode: "OTAA",
      protocolVersion: "1.0.2",
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
    this.handleAppChange = this.handleAppChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  getRandom(weishu) { //FIX ME (new Date().getTime()/1000).tostring(16) 产生8-9位的十六进制数
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
  handleAppChange(event) { //选择应用按钮 选择应用之后显示相应应用下的设备数据
    const devicesPageCurrent = 1;
    this.props.applicationChange(event.target.value, devicesPageCurrent, this.props.data.devicesPagesize);
    this.setState({ //关闭选择应用模态框
      modalSelect: !this.state.modalSelect,
    });
  }
  handlePost() {
    if (this.state.activationMode === "OTAA") {
      fetchData.device(this.props.data.applicationChoose['AppEUI'], this.state.DevEUI, this.state.AppKey, this.state.protocolVersion)
        .then((res) => {
          if (res.code === 200) {
            alert("成功创建OTAA设备~");
            this.setState({ //关闭创建设备模态框
              modal: !this.state.modal,
              DevEUI: this.getRandom(16), //FIX ME
              AppKey: this.getRandom(32),//FIX ME
              DevAddr: this.getRandom(8), //FIX ME
              AppSKey: this.getRandom(32), //FIX ME
              NwkSKey: this.getRandom(32), //FIX ME
            });
            this.props.app2device(this.props.data.applicationChoose['AppEUI'], this.props.data.devicesPageCurrent, this.props.data.devicesPagesize);
          } else {
            alert(res.message);
          }
        });
    } else {
      var ChMask = '00FF';
      var CFList = '330A6833029832FAC832F2F832EB2832E35832DB8832D3B8';
      var ChDrRange = '5050505050505050';
      var RX1CFList = '330A6833029832FAC832F2F832EB2832E35832DB8832D3B8';
      var RX2Freq = 434.665;
      var RX2DataRate = 0;
      var MaxEIRP = 12.15;
      if (this.state.frequencyPlan === "915 MHz") {
        ChMask = 'FF00000000000000FF';
        CFList = '7CC5687CBD987CB5C87CADF87CA6287C9E587C96887C8EB8';
        ChDrRange = '5050505050505050';
        RX1CFList = '7E44387E2CC87E15587DFDE87DE6787DCF087DB7987DA028';
        RX2Freq = 923.300;
        RX2DataRate = 8;
        MaxEIRP = 30;
      }
      else if (this.state.frequencyPlan === "868 MHz") {
        ChMask = '00FF';
        CFList = '756A987562C8755AF8755328754B58754388753BB87533E8';
        ChDrRange = '5050505050505050';
        RX1CFList = '756A987562C8755AF8755328754B58754388753BB87533E8';
        RX2Freq = 869.525;
        RX2DataRate = 0;
        MaxEIRP = 16;
      }
      else if (this.state.frequencyPlan === "787 MHz") {
        ChMask = '00FF';
        CFList = '67E5A867DDD867D60867CE3867c66867BE9867B6C867AEF8';
        ChDrRange = '5050505050505050';
        RX1CFList = '67E5A867DDD867D60867CE3867c66867BE9867B6C867AEF8';
        RX2Freq = 786.000;
        RX2DataRate = 0;
        MaxEIRP = 12.15;
      }
      const ADR = 0;
      const DevNonce = this.getRandom(4);
      fetchData.deviceAbp(this.props.data.applicationChoose['AppEUI'], this.state.DevEUI, this.state.DevAddr, this.state.AppSKey, this.state.NwkSKey,
        this.state.protocolVersion, this.state.frequencyPlan, ChMask, CFList, ChDrRange, RX1CFList, RX2Freq, RX2DataRate, MaxEIRP, ADR, DevNonce)
        .then((res) => {
          if (res.code === 200) {
            alert("成功创建ABP设备~");
            this.setState({ //关闭创建设备模态框
              modal: !this.state.modal,
              DevEUI: this.getRandom(16), //FIX ME
              AppKey: this.getRandom(32),//FIX ME
              DevAddr: this.getRandom(8), //FIX ME
              AppSKey: this.getRandom(32), //FIX ME
              NwkSKey: this.getRandom(32), //FIX ME
            });
            this.props.app2device(this.props.data.applicationChoose['AppEUI'], this.props.data.devicesPageCurrent, this.props.data.devicesPagesize);
          } else {
            alert(res.message);
          }
        });
    }
  }
  handleChange = (pagination) => { //切换页码，使用应用AppEUI+page+pagesize重新获取设备数据
    const page = pagination;
    this.props.changeCurrentPage(page.current);
    this.props.app2device(this.props.data.applicationChoose['AppEUI'], page.current, this.props.data.devicesPagesize);
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
              <Input type="text" id="DevEUI" name="DevEUI" placeholder="唯一且为8字节长" value={this.state.DevEUI} onChange={this.handleDevEUI} maxLength={16} pattern="[0-9a-fA-F]{0,16}">
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
              <Input type="text" id="AppKey" name="AppKey" placeholder="唯一且为16字节长" value={this.state.AppKey} onChange={this.handleAppKey} maxLength={32} pattern="[0-9a-fA-F]{0,16}">
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
              <Input type="text" id="DevEUI" name="DevEUI" placeholder="唯一且为8字节长" value={this.state.DevEUI} onChange={this.handleDevEUI} maxLength={16} pattern="[0-9a-fA-F]{0,16}">
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
              <Input type="text" id="DevAddr" name="DevAddr" placeholder="唯一且为4字节长" value={this.state.DevAddr} onChange={this.handleDevAddr} maxLength={8} pattern="[0-9a-fA-F]{0,16}">
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
              <Input type="text" id="AppSKey" name="AppSKey" placeholder="唯一且为16字节长" value={this.state.AppSKey} onChange={this.handleAppSKey} maxLength={32} pattern="[0-9a-fA-F]{0,16}">
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
              <Input type="text" id="NwkSKey" name="NwkSKey" placeholder="唯一且为16字节长" value={this.state.NwkSKey} onChange={this.handleNwkSKey} maxLength={32} pattern="[0-9a-fA-F]{0,16}">
              </Input>
            </Col>
          </InputGroup>
        </React.Fragment>
      );
    }
  }
  componentDidMount() { //第一次加载第一位应用下的设备数据
    this.props.devicesFirst(this.props.data.userId, this.props.data.devicesPageCurrent, this.props.data.devicesPagesize);
  }
  render() {
    const pagination = {
      current: parseInt(this.props.data.devicesPageCurrent, 10),
      total: parseInt(this.props.data.devicesPagecount, 10),
      pageSize: parseInt(this.props.data.devicesPagesize, 10),
    }
    const columns = [
      {
        title: 'LoRa设备唯一标识符',
        dataIndex: 'DevEUI',
        key: 'DevEUI',
        width: '10%',
        render: DevEUI => <Link to={`/device/${DevEUI}/data`}>{DevEUI}</Link>,
      },
      {
        title: '激活模式',
        dataIndex: 'activationMode',
        key: 'activationMode',
        width: '10%',
        render: activationMode => activationMode,
      },
      {
        title: 'LoRaWAN版本',
        dataIndex: 'ProtocolVersion',
        key: 'ProtocolVersion',
        width: '10%',
        render: ProtocolVersion => ProtocolVersion,
      },
      {
        title: '设备地址',
        dataIndex: 'DevAddr',
        key: 'DevAddr',
        width: '10%',
        render: DevAddr => (!DevAddr || DevAddr === "") ? "暂无" : DevAddr,
      },
      {
        title: 'AES-128密钥',
        dataIndex: 'AppKey',
        key: 'AppKey',
        width: '10%',
        render: AppKey => (!AppKey || AppKey === "") ? "暂无" : AppKey,
      },
      {
        title: '网络会话密钥',
        dataIndex: 'NwkSKey',
        key: 'NwkSKey',
        width: '10%',
        render: NwkSKey => (!NwkSKey || NwkSKey === "") ? "暂无" : NwkSKey,
      },
      {
        title: '应用会话密钥',
        dataIndex: 'AppSKey',
        key: 'AppSKey',
        width: '10%',
        render: AppSKey => (!AppSKey || AppSKey === "") ? "暂无" : AppSKey,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        render: createdAt => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      }
    ];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-layers"></i> {!this.props.data.applicationFetch ? null : this.props.data.applicationChoose['name']} LoRa传感设备
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
                  dataSource={this.props.data.devicesTableItem}
                  columns={columns}
                  rowKey={record => record.createdAt}
                  scroll={{ x: 1600 }}
                  loading={!this.props.data.devicesFetch} />
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
                    <option value="1.0.2">LoRaWAN 1.0.2</option>
                    <option value="1.1">LoRaWAN 1.1</option>
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
                  <select className="form-control" value={this.props.data.applicationChoose['AppEUI']} onChange={this.handleAppChange} id="SelectApplication">
                    {!this.props.data.applicationFetch ? "Loading..." :
                      (this.props.data.applicationInfo.map((key, index) => {
                        return (
                          <option value={key['AppEUI']} key={key['AppEUI']} >{key['name']}</option>
                        );
                      }))}
                  </select>
                </Col>
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.handlePostSelect}>确认</Button>{' '} */}
            <Button color="secondary" onClick={this.handleToggleSelect}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ devicesFirst, applicationChange, changeCurrentPage, app2device }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
