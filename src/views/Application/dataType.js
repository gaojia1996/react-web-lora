import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input, InputGroup, InputGroupText, } from 'reactstrap';
import { Table } from 'antd';
import getDataFuncs from '../../redux/actions/getDataFuncs'
import qs from 'query-string'
import config from '../../config.js'
const baseUrl = config.dataUrl;

class AppDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeOne: false,
      singleIndex: 0,
      addOne: false,
      forAddOne: {
        type: null,
        id: null,
        name: null,
        unit: null,
      },
      hasData: false,
      modal: false,
      message: null,
      messageNameForShow: [],
      messageName: [],
      dataType: [],
      forTest: [],
      data: {
        AppEUI: null,
        createAt: null,
        message: null,
        updatedAt: null,
      },
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }
  componentDidMount() {
    this.getAppDataType(this.props.match.params.AppEUI);
  }
  handleToggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleDescription(event) {
    this.setState({
      message: event.target.value,
    })
  }
  handleTypeKind(event, index) {
    var temp_messageName = this.state.messageName;
    temp_messageName[index] = event.target.value;
    this.setState({
      messageName: temp_messageName,
    })
  }
  handleType(event, index) {
    var temp_forTest = this.state.forTest;
    temp_forTest[index]['type'] = event.target.value;
    this.setState({
      forTest: [...temp_forTest]
    })
  }
  handleName(event, index) {
    var temp_forTest = this.state.forTest;
    temp_forTest[index]['name'] = event.target.value;
    this.setState({
      forTest: [...temp_forTest]
    })
  }
  handleId(event, index) {
    var temp_forTest = this.state.forTest;
    temp_forTest[index]['id'] = event.target.value;
    this.setState({
      forTest: [...temp_forTest]
    })
  }
  handleUnit(event, index) {
    var temp_forTest = this.state.forTest;
    temp_forTest[index]['unit'] = event.target.value;
    this.setState({
      forTest: [...temp_forTest]
    })
  }
  getAppDataType(AppEUI) {
    getDataFuncs.getAppDataTypeFunc(AppEUI)
      .then(res => {
        // console.log(res);
        if (res['message'] === 'No such item' || res['message'] === '{}') {
          this.setState({
            messageName: [null],
            forTest: [{ type: null, id: null, name: null, unit: null }],
            hasData: false,
          })
        } else {
          var data = JSON.parse(res['message']);
          var messageName = [];
          var dataType = [];
          var forTest = [];
          if (data !== undefined) {
            for (var each in data) {
              messageName.push(each);
              forTest.push(data[each]);
            }
            for (var each1 in data[messageName[0]]) {
              dataType.push(each1);
            }
            this.setState({
              data: res,
              hasData: true,
              message: data,
              messageName: messageName,
              messageNameForShow: [...messageName],
              dataType: dataType,
              forTest: forTest,
            })
          }
        }
      })
      .catch(() => console.log('获取appDataType数据出现错误'))
  }
  postAppDataType(AppEUI, message) {
    const Url = baseUrl + '/app2devType';
    var data = {
      AppEUI: AppEUI,
      message: message,
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
          alert('成功修改数据格式~');
          this.handleToggle();
          //再次刷新页面
          this.getAppDataType(this.props.match.params.AppEUI);
        } else {
          alert('操作失败~');
        }
      })
  }
  deleteAppDataType(AppEUI, message) {
    const Url = baseUrl + '/app2devType';
    var data = {
      AppEUI: AppEUI,
      message: message,
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
          alert('成功修改数据格式~');
          //再次刷新页面
          this.getAppDataType(this.props.match.params.AppEUI);
        } else {
          alert('操作失败~');
        }
      })
  }
  createSingleView(index) {
    return (
      <React.Fragment key={index}>
        <InputGroup className="mb-3">
          <Col md="3">
            <InputGroupText>
              种类 {index + 1}：
              </InputGroupText>
          </Col>
          <Col xs="12" md="9">
            <Input type='text' id={index} name='typeKind'
              value={this.state.messageName[index]} placeholder="填入数据种类" onChange={(event) => this.handleTypeKind(event, index)} />
          </Col>
        </InputGroup>
        <InputGroup className="mb-3">
          <Col md="3">
            <InputGroupText>
              数据类型：
              </InputGroupText>
          </Col>
          <Col xs="12" md="9">
            <Input type='text' id={index} name='type'
              value={this.state.forTest[index]['type']} placeholder="填入数据类型" onChange={(event) => this.handleType(event, index)} />
          </Col>
        </InputGroup>
        <InputGroup className="mb-3">
          <Col md="3">
            <InputGroupText>
              序号：
              </InputGroupText>
          </Col>
          <Col xs="12" md="9">
            <Input type='text' id={index} name='id'
              value={this.state.forTest[index]['id']} placeholder="填入序号" onChange={(event) => this.handleId(event, index)} />
          </Col>
        </InputGroup>
        <InputGroup className="mb-3">
          <Col md="3">
            <InputGroupText>
              名称：
              </InputGroupText>
          </Col>
          <Col xs="12" md="9">
            <Input type='text' id={index} name='name'
              value={this.state.forTest[index]['name']} placeholder="填入名称" onChange={(event) => this.handleName(event, index)} />
          </Col>
        </InputGroup>
        <InputGroup className="mb-3">
          <Col md="3">
            <InputGroupText>
              单位：
              </InputGroupText>
          </Col>
          <Col xs="12" md="9">
            <Input type='text' id={index} name='unit'
              value={this.state.forTest[index]['unit']} placeholder="填入单位" onChange={(event) => this.handleUnit(event, index)} />
          </Col>
        </InputGroup>
      </ React.Fragment>
    )
  }
  render() {
    if (this.state.addOne === true && this.state.modal === false) {
      this.setState(
        {
          addOne: false,
          changeOne: false,
          modal: false,
        }
      )
      this.getAppDataType(this.props.match.params.AppEUI);
    }
    var test = this.state.forTest.map(
      (each, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 ? <center>------------------------------------------------------------</center> : null}
            <br></br>
            <InputGroup className="mb-3">
              <Col md="3">
                <InputGroupText>
                  种类 {index + 1}：
              </InputGroupText>
              </Col>
              <Col xs="12" md="9">
                <Input type='text' id={index} name='typeKind'
                  value={this.state.messageName[index]} placeholder="填入数据种类" onChange={(event) => this.handleTypeKind(event, index)} />
              </Col>
            </InputGroup>
            <InputGroup className="mb-3">
              <Col md="3">
                <InputGroupText>
                  数据类型：
              </InputGroupText>
              </Col>
              <Col xs="12" md="9">
                <Input type='text' id={index} name='type'
                  value={each['type']} placeholder="填入数据类型" onChange={(event) => this.handleType(event, index)} />
              </Col>
            </InputGroup>
            <InputGroup className="mb-3">
              <Col md="3">
                <InputGroupText>
                  序号：
              </InputGroupText>
              </Col>
              <Col xs="12" md="9">
                <Input type='text' id={index} name='id'
                  value={each['id']} placeholder="填入序号" onChange={(event) => this.handleId(event, index)} />
              </Col>
            </InputGroup>
            <InputGroup className="mb-3">
              <Col md="3">
                <InputGroupText>
                  名称：
              </InputGroupText>
              </Col>
              <Col xs="12" md="9">
                <Input type='text' id={index} name='name'
                  value={each['name']} placeholder="填入名称" onChange={(event) => this.handleName(event, index)} />
              </Col>
            </InputGroup>
            <InputGroup className="mb-3">
              <Col md="3">
                <InputGroupText>
                  单位：
              </InputGroupText>
              </Col>
              <Col xs="12" md="9">
                <Input type='text' id={index} name='unit'
                  value={each['unit']} placeholder="填入单位" onChange={(event) => this.handleUnit(event, index)} />
              </Col>
            </InputGroup>
          </ React.Fragment>

        )
      }
    )
    // var aaaa = {};
    // console.log('tttttt', aaaa === null)
    // console.log('the statr is ', this.state)
    var columns = [];
    columns.push({
      title: '种类',
      dataIndex: 'typeKind',
      key: 'typeKind',
      width: '5%',
      render: typeKind => typeKind,
    })
    const addColumns = this.state.dataType.map(
      (value) => {
        return (
          {
            title: value,
            dataIndex: value,
            key: value,
            width: '5%',
            render: value => value,
          }
        )
      }
    )
    for (let i = 0; i < addColumns.length; i++) {
      columns.push(addColumns[i]);
    }
    const deleteButton = {
      title: '操作',
      dataIndex: 'deleteButton',
      key: 'deleteButton',
      width: '5%',
      render: (text, record, index) => {
        return (
          <Button color='danger' onClick={() => {
            var temp_message = this.state.message;
            delete temp_message[this.state.messageNameForShow[index]];
            this.deleteAppDataType(this.props.match.params.AppEUI, JSON.stringify(temp_message));
          }}>删除</Button>
        )
      }
    }
    const changeButton = {
      title: '操作2',
      dataIndex: 'changeButton',
      key: 'changeButton',
      width: '5%',
      render: (text, record, index) => {
        return (
          <Button color='primary' onClick={() => {
            this.setState({
              changeOne: true,
              modal: !this.state.modal,
              singleIndex: index,
            })
          }}>修改</Button>
        )
      }
    }
    columns.push(deleteButton);
    columns.push(changeButton);
    var dataSource = this.state.messageNameForShow.map(
      (value) => {
        return ({
          typeKind: value,
          ...JSON.parse(this.state.data['message'])[value],
        })
      }
    );
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-feed"></i>应用数据格式
                <div className="card-header-actions">
                  {this.state.hasData === false ?
                    (<Button color="warning" onClick={() => { this.handleToggle(); this.setState({ changeOne: false }) }}><i className="icon-plus"></i> {" "}创建</Button>) :
                    (<React.Fragment>
                      <Button color="warning" onClick={() => {
                        this.handleToggle();
                        this.setState({
                          changeOne: true,
                          singleIndex: this.state.messageName.length,
                          forTest: [...this.state.forTest, { type: null, id: null, name: null, unit: null }],
                          messageName: [...this.state.messageName, null],
                          addOne: true,
                        })
                      }}><i className="icon-plus"></i> {" "}增加</Button>
                      {/* {'  -   '} */}
                      {/* <Button color="warning" onClick={() => { this.handleToggle(); this.setState({ changeOne: false }) }}><i className="icon-plus"></i> {" "}更改</Button> */}
                    </React.Fragment>
                    )
                  }
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  {this.state.hasData === false ?
                    (<font size='4' color='red'>对不起，该应用暂时还没有定义数据格式,请先点击上方创建数据格式~</font>) :
                    (
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={record => record.typeKind + Math.random().toFixed(3)}
                        loading={false} />
                    )
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.handleToggle} key="dataType_create">
          <ModalHeader toggle={this.handleToggle}>数据格式</ModalHeader>
          <ModalBody>
            <Form className="form-horizontal">
              {this.state.changeOne === false ? (test) : (this.createSingleView(this.state.singleIndex))}
              {this.state.changeOne === false ?
                (<center><Button color='danger' onClick={
                  () => {
                    // console.log('点击一次增加');
                    this.setState({
                      forTest: [...this.state.forTest, { type: null, id: null, name: null, unit: null }],
                      messageName: [...this.state.messageName, null],
                    })
                  }
                }
                >增加种类</Button></center>) : null
              }
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              var temp_message = {};
              const temp_message1 = this.state.messageName;
              const temp_forTest = this.state.forTest;
              for (var i = 0; i < temp_message1.length; i++) {
                temp_message[temp_message1[i]] = temp_forTest[i];
              }
              this.postAppDataType(this.props.match.params.AppEUI, JSON.stringify(temp_message));
            }
            }>确认</Button>{' '}
            <Button color="secondary" onClick={() => { this.handleToggle()}}>取消</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default AppDataType;
