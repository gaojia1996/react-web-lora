import React, { Component, lazy } from 'react';
import { Row, Col, } from 'reactstrap';
const Widget04 = lazy(() => import('./TableCard'));

class Feature extends Component {
  // WindDFormat(windD) {
  //   if (windD === 1) {
  //     return '正北风';
  //   } else if (windD === 2) {
  //     return '东北风';
  //   } else if (windD === 3) {
  //     return '正东风';
  //   } else if (windD === 4) {
  //     return '东南风';
  //   } else if (windD === 5) {
  //     return '正南风';
  //   } else if (windD === 6) {
  //     return '西南风';
  //   } else if (windD === 7) {
  //     return '正西风';
  //   } else if (windD === 8) {
  //     return '西北风';
  //   } else if (windD === 9) {
  //     return '无风';
  //   } else {
  //     return 'N/A';
  //   }
  // }


  render() {
    return ( 
      <Row>
        <Col sm="4" md="3">
          {console.log(this.props.id)}
          <Widget04
            // color="info"
            color={!this.props.id ? "info" :(this.props.id.data[0].CH4 > 5 ? "danger" : "info")}
            header={"甲烷: " + (!this.props.id ? "Loading..." : (this.props.id.data[0].CH4) + ' ppm')}
          invert style={{ height: '90%' }}>
          </Widget04>
        </Col>
      <Col sm="4" md="3">
        <Widget04
          // color="success"
          color={!this.props.id ? "success" :(this.props.id.data[0].temperature > 50 ? "danger" : "success")}
          header={"温度: " + (!this.props.id ? "Loading..." : (this.props.id.data[0].temperature) + '℃')}
          invert style={{ height: '90%' }}>
        </Widget04>
      </Col>
      <Col sm="4" md="3">
        <Widget04
          // color="warning"
          color={!this.props.id ? "warning" :(this.props.id.data[0].humidity > 80 ? "danger" : "warning")}
          header={"湿度: " + (!this.props.id ? "Loading..." : (this.props.id.data[0].humidity) + '%')}
          invert style={{ height: '90%' }}>
        </Widget04>
      </Col>
      <Col sm="4" md="3">
        <Widget04
          // color="primary"
          color={!this.props.id ? "primary" :(this.props.id.data[0].waterlevel > 10 ? "danger" : "primary")}
          header={"水位: " + (!this.props.id ? "Loading..." : (this.props.id.data[0].waterlevel) + ' cm')}
          invert style={{ height: '90%' }}>
        </Widget04>
      </Col>
      </Row >
    );
  }
}

export default Feature;
