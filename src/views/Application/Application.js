import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

class Application extends Component {

  handle() {

  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-screen-desktop"></i>传感数据监测
              </CardHeader>
              <CardBody>
                <Jumbotron>
                  <h1 className="display-6">LoRa智能硬件</h1>
                  <p className="lead">采集和检测各种传感数据流</p>
                  <p className="lead">采用了云平台与屏幕终端互动进行交互</p>
                  <p className="lead">实时获取PM10扬尘及环境气象等数据</p>
                  <p className="lead">及时预警工作人员核查该工地施工状况</p>
                  <hr className="my-2" />
                  <p className="lead">
                    <Link to="/application/device" replace><Button color="primary">查看实例</Button></Link>
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-social-youtube"></i>视频数据监控
              </CardHeader>
              <CardBody>
                <Jumbotron fluid>
                  <Container fluid>
                    <h1 className="display-6">视频监控设备</h1>
                    <p className="lead">基于WIFI自组网的安防视频监控设备</p>
                    <p className="lead">重点区域可视化</p>
                    <p className="lead">视频实时高质量传输</p>
                    <p className="lead">划分管理区域，俯瞰分析隐患重点区</p>
                    <hr className="my-2" />
                    <p className="lead">
                      <Link to="/application/video" replace><Button color="primary" href="/application/video">查看实例</Button></Link>
                    </p>
                  </Container>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Application;
