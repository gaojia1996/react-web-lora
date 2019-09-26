import React, { Component, Suspense } from 'react';
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';
import IMG from '../../images/loraApp1.jpg';
import IMG2 from '../../images/loraApp2.jpg';
class LoRa extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <Suspense fallback={this.loading()}>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card color="light">
              <CardHeader className="h3 bg-teal">
                <strong>LoRa 物联网</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <Card className="bg-light text-center" color="white">
                      <CardBody className="pb-0">
                        <Row>
                          <Col xs="12" sm="6" lg="6" height='100%'>
                            <img src={IMG} alt="LoRa网关" width="50%"></img>
                          </Col>
                          <Col xs="12" sm="6" lg="6" height='100%'>
                            <div className="h3">LoRa 网关</div>
                            <div className='loraStyle'>
                              室外型LoRa网关基于高性能ARM处理器，方便就近进行物联网边缘计算；
                              具备以太网、Wi-Fi、4G等多种接入互联网方式；
                              单网关覆盖范围城区环境可达5公里以上，在郊区可达10公里以上；
                              可同时服务6000个以上LoRa终端；提供PoE供电方式， 室外安装简单便捷。
                              </div>
                            <div className='loraStyle'>
                              用户利用室外型LoRa网关，可快速搭建私有通信网络，应用于智能医疗，智能停车，智慧城市，智能农业等。
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <Card className="bg-light text-center" color="white">
                      <CardBody className="pb-0">
                        <Row>
                          <Col xs="12" sm="6" lg="6">
                            <img src={IMG2} alt="LoRa终端开发套件" width="50%"></img>
                          </Col>
                          <Col xs="12" sm="6" lg="6">
                            <div className="h3">LoRa终端开发套件</div>
                            <div className='loraStyle'>
                              LoRa终端开发套件基于Semtech SX1276和STM32微处理器进行模块化设计;
                              方便用户快速进行物联网应用开发和设计;
                              开发套件提供丰富的通信接口，用户可按需外接各类传感器;
                              </div>
                            <div className='loraStyle'>
                              用户可自行选择使用USB供电或者电池供电（室外可用太阳能充电）。
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Suspense>
    )
  }
}

export default LoRa;