import React, { Component, lazy } from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
const Widget04 = lazy(() => import('../../views/Widgets/Widget05'));

class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      get: false,
      windD: '',
      windS: '',
      pm25: '',
      pm10: '',
      humi: '',
      temp: '',
    };
  }

  componentDidMount() {
    console.log(this.props.id);
    if (this.props.id.length === 0) {
      this.setState({
        windD: '暂无数据',
        windS: '暂无数据',
        pm25: '暂无数据',
        pm10: '暂无数据',
        humi: '暂无数据',
        temp: '暂无数据',
        get: false,
      });
    } else {
      this.setState({
        windD: this.props.id.data.windDirection,
        windS: this.props.id.data.windSpeed,
        pm25: this.props.id.data.pm25,
        pm10: this.props.id.data.pm10,
        humi: this.props.id.data.humi,
        temp: this.props.id.data.temp,
        get: true,
      });
    }
  }

  WindDFormat(windD) {
    if (windD === 1) {
      return '正北风';
    } else if (windD === 2) {
      return '东北风';
    } else if (windD === 3) {
      return '正东风';
    } else if (windD === 4) {
      return '东南风';
    } else if (windD === 5) {
      return '正南风';
    } else if (windD === 6) {
      return '西南风';
    } else if (windD === 7) {
      return '正西风';
    } else if (windD === 8) {
      return '西北风';
    } else if (windD === 9) {
      return '无风';
    } else {
      return '暂无数据';
    }
  }

  render() {

    return (
      <Row>
        <Col sm="6" md="2">
          <Widget04
            color="info"
            header={"风向:" + (this.state.get ? this.WindDFormat(this.state.windD) : "暂无数据")}
            invert >
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04
            color="success"
            header={"风速:" + (this.state.get ? (this.state.windS / 10).toFixed(3) + ' m/s' : '暂无数据')}
            invert>
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04
            color="warning"
            header={"PM2.5:" + (this.state.get ? this.state.pm25 + ' μg/m³' : '暂无数据')}
            invert>
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04
            color="primary"
            header={"PM10:" + (this.state.get ? this.state.pm10 + ' μg/m³' : '暂无数据')}
            invert>
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04
            color="danger"
            header={"温度:" + (this.state.get ? this.state.temp + ' ℃' : '暂无数据')}
            invert>
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04
            color="info"
            header={"湿度:" + (this.state.get ? this.state.humi + '%' : '暂无数据')}
            invert>
          </Widget04>
        </Col>
      </Row>
    );
  }
}

export default Feature;
