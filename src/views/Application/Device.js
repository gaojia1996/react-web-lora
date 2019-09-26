import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';
import DeviceCard from './DeviceCard';
import DeviceTable from './DeviceTable';

class Device extends Component {

  render() {
    //teal
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">{
                // this.props.match.params.id === "00fcd82d" ? "设备 1" :
                  this.props.match.params.id === "00f87ce4" ? "设备 1" :
                    this.props.match.params.id === "00afeb95" ? "设备 2" :
                      this.props.match.params.id === "00be4fe1" ? "设备 3" :
                        this.props.match.params.id === "00f38dd9" ? "设备 4" :
                          this.props.match.params.id === "006282a4" ? "设备 5" :
                            this.props.match.params.id === "00449f67" ? "设备 6" :
                              this.props.match.params.id === "000bfb77" ? "设备 7" :
                                this.props.match.params.id === "00a78d3d" ? "设备 8" :
                                  this.props.match.params.id === "00f469ad" ? "设备 9" : "设备 10"
              }
              </CardHeader>
              <CardBody>
                <DeviceCard id={this.props.match.params.id}></DeviceCard>
                <Row>
                  <Col xs="12" sm="12" lg="12">
                    <DeviceTable id={this.props.match.params.id}></DeviceTable>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default Device;
