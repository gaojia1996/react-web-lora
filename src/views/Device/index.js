import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { devicesFirst, devicesNoFirst, applicationChange, changeCurrentPage, app2device } from '../../redux/actions';
import { bindActionCreators } from "redux";
import fetchData from '../../redux/fetchData';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalSelect: false,
      name: " ", //设备名称
      nameValid: false,
      activationMode: "OTAA", //设备激活模式
      protocolVersion: "1.0.2", //loraWAN 版本
      DevEUI: this.getRandom(16), //FIX ME
      DevEUIValid: true,
      AppKey: this.getRandom(32),//FIX ME
      AppKeyValid: true,
      frequencyPlan: "433", //使用的频率
      DevAddr: this.getRandom(8), //FIX ME
      DevAddrValid: true,
      AppSKey: this.getRandom(32), //FIX ME
      AppSKeyValid: true,
      NwkSKey: this.getRandom(32), //FIX ME
      NwkSKeyValid: true,
      Description: " ", //设备描述
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggleSelect = this.handleToggleSelect.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleActivationMode = this.handleActivationMode.bind(this);
    this.handleProtocolVersion = this.handleProtocolVersion.bind(this);
    this.handleDevEUI = this.handleDevEUI.bind(this);
    this.handleAppKey = this.handleAppKey.bind(this);
    this.handleFrequencyPlan = this.handleFrequencyPlan.bind(this);
    this.handleDevAddr = this.handleDevAddr.bind(this);
    this.handleAppSKey = this.handleAppSKey.bind(this);
    this.handleNwkSKey = this.handleNwkSKey.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
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
  handleName(event) {
    this.setState({
      name: event.target.value,
      nameValid: event.target.value === " " || event.target.value === null || event.target.value === "" ? false : true,
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
    const regexp = /[0-9a-fA-F]{16}/;
    this.setState({
      DevEUI: event.target.value,
      DevEUIValid: regexp.test(event.target.value) ? true : false,
    });
  }
  handleAppKey(event) {
    const regexp = /[0-9a-fA-F]{32}/;
    this.setState({
      AppKey: event.target.value,
      AppKeyValid: regexp.test(event.target.value) ? true : false,
    });
  }
  handleFrequencyPlan(event) {
    this.setState({
      frequencyPlan: event.target.value,
    });
  }
  handleDevAddr(event) {
    const regexp = /[0-9a-fA-F]{8}/;
    this.setState({
      DevAddr: event.target.value,
      DevAddrValid: regexp.test(event.target.value) ? true : false,
    });
  }
  handleAppSKey(event) {
    const regexp = /[0-9a-fA-F]{32}/;
    this.setState({
      AppSKey: event.target.value,
      AppSKeyValid: regexp.test(event.target.value) ? true : false,
    });
  }
  handleNwkSKey(event) {
    const regexp = /[0-9a-fA-F]{32}/;
    this.setState({
      NwkSKey: event.target.value,
      NwkSKeyValid: regexp.test(event.target.value) ? true : false,
    });
  }
  handleDescription(event) {
    this.setState({
      Description: event.target.value,
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
      fetchData.device(this.props.data.applicationChoose['AppEUI'], this.state.DevEUI, this.state.AppKey, this.state.protocolVersion,
        this.state.name, this.state.Description)
        .then((res) => {
          if (res.code === 200) {
            alert("成功创建OTAA设备~");
            this.setState({ //关闭创建设备模态框
              modal: !this.state.modal,
              name: " ", //设备名称
              nameValid: false,
              activationMode: "OTAA", //设备激活模式
              protocolVersion: "1.0.2", //loraWAN 版本
              DevEUI: this.getRandom(16), //FIX ME
              DevEUIValid: true,
              AppKey: this.getRandom(32),//FIX ME
              AppKeyValid: true,
              frequencyPlan: "433", //使用的频率
              DevAddr: this.getRandom(8), //FIX ME
              DevAddrValid: true,
              AppSKey: this.getRandom(32), //FIX ME
              AppSKeyValid: true,
              NwkSKey: this.getRandom(32), //FIX ME
              NwkSKeyValid: true,
              Description: " ", //设备描述
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
      if (this.state.frequencyPlan === "915") {
        ChMask = 'FF00000000000000FF';
        CFList = '7CC5687CBD987CB5C87CADF87CA6287C9E587C96887C8EB8';
        ChDrRange = '5050505050505050';
        RX1CFList = '7E44387E2CC87E15587DFDE87DE6787DCF087DB7987DA028';
        RX2Freq = 923.300;
        RX2DataRate = 8;
        MaxEIRP = 30;
      }
      else if (this.state.frequencyPlan === "868") {
        ChMask = '00FF';
        CFList = '756A987562C8755AF8755328754B58754388753BB87533E8';
        ChDrRange = '5050505050505050';
        RX1CFList = '756A987562C8755AF8755328754B58754388753BB87533E8';
        RX2Freq = 869.525;
        RX2DataRate = 0;
        MaxEIRP = 16;
      }
      else if (this.state.frequencyPlan === "787") {
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
        this.state.protocolVersion, this.state.frequencyPlan, ChMask, CFList, ChDrRange, RX1CFList, RX2Freq, RX2DataRate, MaxEIRP, ADR, DevNonce,
        this.state.name, this.state.Description)
        .then((res) => {
          if (res.code === 200) {
            alert("成功创建ABP设备~");
            this.setState({ //关闭创建设备模态框
              modal: !this.state.modal,
              name: " ", //设备名称
              nameValid: false,
              activationMode: "OTAA", //设备激活模式
              protocolVersion: "1.0.2", //loraWAN 版本
              DevEUI: this.getRandom(16), //FIX ME
              DevEUIValid: true,
              AppKey: this.getRandom(32),//FIX ME
              AppKeyValid: true,
              frequencyPlan: "433", //使用的频率
              DevAddr: this.getRandom(8), //FIX ME
              DevAddrValid: true,
              AppSKey: this.getRandom(32), //FIX ME
              AppSKeyValid: true,
              NwkSKey: this.getRandom(32), //FIX ME
              NwkSKeyValid: true,
              Description: " ", //设备描述
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
  handleDeleteDevice(DevEUI) {
    fetchData.deviceDelete(DevEUI)
      .then((res) => {
        if (res.code === 200) {
          alert("设备删除成功~");
          if (this.props.data.devicesTableItem.length === 1) {
            this.props.app2device(this.props.data.applicationChoose['AppEUI'], this.props.data.devicesPageCurrent - 1, this.props.data.devicesPagesize);
          } else {
            this.props.app2device(this.props.data.applicationChoose['AppEUI'], this.props.data.devicesPageCurrent, this.props.data.devicesPagesize);
          }
        } else {
          alert(res.message);
        }
      })
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
              <Input type="text" id="DevEUI" name="DevEUI" placeholder="唯一且为8字节长" value={this.state.DevEUI}
                onChange={this.handleDevEUI} maxLength={16} pattern="[0-9a-fA-F]{0,16}" valid={this.state.DevEUIValid}
                invalid={!this.state.DevEUIValid}>
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
              <Input type="text" id="AppKey" name="AppKey" placeholder="唯一且为16字节长" value={this.state.AppKey}
                onChange={this.handleAppKey} maxLength={32} pattern="[0-9a-fA-F]{0,16}" valid={this.state.AppKeyValid}
                invalid={!this.state.AppKeyValid}>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                设备描述：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="textarea" id="description" name="description" placeholder="设备描述，可空" onChange={this.handleDescription}>
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
              <Input type="select" id="frequencyPlan" name="frequencyPlan" onChange={this.handleFrequencyPlan} valid>
                <option value="433">433 MHz</option>
                <option value="787">787 MHz</option>
                <option value="868">868 MHz</option>
                <option value="915">915 MHz</option>
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
              <Input type="text" id="DevEUI" name="DevEUI" placeholder="唯一且为8字节长" value={this.state.DevEUI}
                onChange={this.handleDevEUI} maxLength={16} pattern="[0-9a-fA-F]{0,16}" valid={this.state.DevEUIValid}
                invalid={!this.state.DevEUIValid}>
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
              <Input type="text" id="DevAddr" name="DevAddr" placeholder="唯一且为4字节长" value={this.state.DevAddr}
                onChange={this.handleDevAddr} maxLength={8} pattern="[0-9a-fA-F]{0,16}" valid={this.state.DevAddrValid}
                invalid={!this.state.DevAddrValid}>
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
              <Input type="text" id="AppSKey" name="AppSKey" placeholder="唯一且为16字节长" value={this.state.AppSKey}
                onChange={this.handleAppSKey} maxLength={32} pattern="[0-9a-fA-F]{0,16}" valid={this.state.AppSKeyValid}
                invalid={!this.state.AppSKeyValid}>
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
              <Input type="text" id="NwkSKey" name="NwkSKey" placeholder="唯一且为16字节长" value={this.state.NwkSKey}
                onChange={this.handleNwkSKey} maxLength={32} pattern="[0-9a-fA-F]{0,16}" valid={this.state.NwkSKeyValid}
                invalid={!this.state.NwkSKeyValid}>
              </Input>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col md="4">
              <InputGroupText>
                设备描述：
              </InputGroupText>
            </Col>
            <Col xs="12" md="8">
              <Input type="textarea" id="description" name="description" placeholder="设备描述，可空" onChange={this.handleDescription}>
              </Input>
            </Col>
          </InputGroup>
        </React.Fragment>
      );
    }
  }
  componentDidMount() { //第一次加载第一位应用下的设备数据
    if (!this.props.data.applicationChoose.hasOwnProperty('AppEUI')) {
      this.props.devicesFirst(this.props.data.userId, this.props.data.devicesPageCurrent, this.props.data.devicesPagesize);
    }else{
      this.props.devicesNoFirst(this.props.data.userId, this.props.data.applicationChoose['AppEUI'], this.props.data.devicesPageCurrent, this.props.data.devicesPagesize);
    }
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
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        render: name => (!name || name === "") ? "暂无" : name,
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
      // {
      //   title: 'AES-128密钥',
      //   dataIndex: 'AppKey',
      //   key: 'AppKey',
      //   width: '10%',
      //   render: AppKey => (!AppKey || AppKey === "") ? "暂无" : AppKey,
      // },
      // {
      //   title: '网络会话密钥',
      //   dataIndex: 'NwkSKey',
      //   key: 'NwkSKey',
      //   width: '10%',
      //   render: NwkSKey => (!NwkSKey || NwkSKey === "") ? "暂无" : NwkSKey,
      // },
      // {
      //   title: '应用会话密钥',
      //   dataIndex: 'AppSKey',
      //   key: 'AppSKey',
      //   width: '10%',
      //   render: AppSKey => (!AppSKey || AppSKey === "") ? "暂无" : AppSKey,
      // },
      {
        title: '设备描述',
        dataIndex: 'description',
        key: 'description',
        width: '10%',
        render: description => (!description || description === "" || description === " ") ? "暂无" : description,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        render: createdAt => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '操作',
        dataIndex: 'DevEUI',
        key: 'action',
        width: '5%',
        render: DevEUI => <Button color="danger" onClick={() => { this.handleDeleteDevice(DevEUI); }}>删除</Button>,
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
                  // scroll={{ x: 1600 }}
                  loading={!this.props.data.devicesFetch} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.handleToggle} key="device_create" >
          <ModalHeader toggle={this.handleToggle}>创建设备</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              <InputGroup className="mb-3">
                <Col md="4">
                  <InputGroupText>
                    设备名称：
                </InputGroupText>
                </Col>
                <Col xs="12" md="8">
                  <Input type="text" id="name" name="name" placeholder="设备名称，必填" value={this.state.name}
                    onChange={this.handleName} valid={this.state.nameValid} invalid={!this.state.nameValid}>
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
                  <Input type="select" id="activationMode" name="activationMode" onChange={this.handleActivationMode} valid>
                    <option value="OTAA">OTAA</option>
                    <option value="ABP">ABP</option>
                  </Input>
                </Col>
              </InputGroup>
              <InputGroup className="mb-3">
                <Col md="4">
                  <InputGroupText>
                    LoRaWAN版本：
                </InputGroupText>
                </Col>
                <Col xs="12" md="8">
                  <Input type="select" id="protocolVersion" name="protocolVersion" onChange={this.handleProtocolVersion} valid>
                    <option value="1.0.2">LoRaWAN 1.0.2</option>
                    <option value="1.1">LoRaWAN 1.1</option>
                  </Input>
                </Col>
              </InputGroup>
              {this.FormItem()}
            </Form>
          </ModalBody>
          <ModalFooter>
            {this.state.nameValid && this.state.DevEUIValid && this.state.AppKeyValid &&
              this.state.DevAddrValid && this.state.AppSKeyValid && this.state.NwkSKeyValid
              ? <Button color="primary" onClick={this.handlePost}>确认</Button>
              : <Button color="primary" onClick={this.handlePost} disabled>确认</Button>}
            {' '}
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
  return bindActionCreators({ devicesFirst, devicesNoFirst, applicationChange, changeCurrentPage, app2device }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
