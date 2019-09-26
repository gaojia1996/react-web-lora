import React, { Component, Suspense } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

class Developer extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <Suspense fallback={this.loading()}>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardHeader className="h3 bg-teal">
                <strong>智能物联网云服务</strong>
              </CardHeader>
              <CardBody>
                <Row className="justify-content-around">
                  <Col xs="12" sm="4" lg="4">
                    <Card className="text-white bg-success text-center">
                      <CardBody className="pb-0">
                        <i className="fa fa-cogs float-center h2"></i>
                        <div className="text-value">Develop</div>
                        <div className='text-value'>开发平台</div>
                        <div className='text-value'>产品开发，设备管理</div>
                        <br></br>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xs="12" sm="4" lg="4">
                    <Card className="text-white bg-danger text-center">
                      <CardBody className="pb-0">
                        <i className="icon-calendar float-center h1"></i>
                        <div className="text-value">Data</div>
                        <div className='text-value'>数据平台</div>
                        <div className='text-value'>数据展示，监控管理</div>
                        <br></br>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xs="12" sm="4" lg="4">
                    <Card className="text-white bg-warning text-center">
                      <CardBody className="pb-0">
                        <i className="fa fa-laptop float-center h2"></i>
                        <div className="text-value">Operation</div>
                        <div className='text-value'>运营平台</div>
                        <div className='text-value'>日常维护，运营监管</div>
                        <br></br>
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

export default Developer;