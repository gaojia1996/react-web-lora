import React, { Component, Suspense } from 'react';
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';
import IMG from '../../images/typicalApp1.png';
import IMG2 from '../../images/typicalApp2.png';
import IMG3 from '../../images/typicalApp3.png';


class Application extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <Suspense fallback={this.loading()}>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card color="light">
              <CardHeader className="h3 bg-teal">
                <strong> 典型应用</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <Card className="bg-light" color="white">
                      <CardBody className="pb-0">
                        <Row>
                          <Col xs="12" sm="6" lg="6" className='offset-lg-1'>
                            <div className="h3 text-center">环境监测</div>
                            <div className='myTextStyle'>
                              空气质量指数备受人们关注，传统空气质量监测系统中，数据更新速度慢，
                              除监测站外的其他地方无法精准范围测量，技术成本、维护费用也较高。
                              </div>
                            <div className='myTextStyle'>
                              随着LoRa通讯技术的引入，基于LoRa技术的空气质量实时监测系统
                              将在数据实时性、 监测范围以及部署维护成本等方面得到提升和改善。
                            </div>
                          </Col>
                          <Col xs="12" sm="6" lg="4">
                            <img src={IMG} alt="环境监测架构" width="90%"></img>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="12" lg="12" className="offset-xs-1">
                    <Card className="bg-light" color="white">
                      <CardBody className="pb-0">
                        <Row>
                          <Col xs="12" sm="6" lg="6" className='offset-md-1'>
                            <div className="h3 text-center">智能停车</div>
                            <div className='myTextStyle'>
                              当前，我国汽车保有量约2亿，停车位缺口超过5000万个。
                              在立体车库投资大、维护成本高、使用麻烦的问题下，
                              错峰使用，实行“共享停车”,可有效提高车位资源使用率。
                            </div>
                            <div className='myTextStyle'>
                              基于LoRa/NB-IoT通信技术的智能车位锁，具有功耗低、通信距离远等优势，
                              停车场的部署及维护成本低、覆盖范围广。
                            </div>
                          </Col>
                          <Col xs="12" sm="5" lg="5">
                            <img src={IMG2} alt="智能停车架构" width="90%"></img>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="12" lg="12" className="offset-xs-1">
                    <Card className="bg-light" color="white">
                      <CardBody className="pb-0">
                        <Row>
                          <Col xs="12" sm="6" lg="6" className='offset-md-1'>
                            <div className="h3 text-center">智能灌溉</div>
                            <div className='myTextStyle'>
                              传统智能灌溉系统通信方式使用GPRS或者蓝牙wifi等方式，
                              然而对于WI-FI覆盖范围不能满足大型农场的基本要求，
                              对于采用GPRS的方式通信模块功耗太大，系统维护较为复杂。
                            </div>
                            <div className='myTextStyle'>
                              智能灌溉系统采用LoRa通信技术，具有功耗低、成本低廉，覆盖范围较广的特点。
                            </div>
                          </Col>
                          <Col xs="12" sm="5" lg="5">
                            <img src={IMG3} alt="智能灌溉架构" width="90%"></img>
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

export default Application;