import React, { Component } from 'react';
import { Card, CardBody, Col, Row, } from 'reactstrap';
import getDetail from './getData';

class DeviceCard extends Component {

  constructor(props) { //构造函数
    super(props);
    this.state = {
      get: false,
      card: {},
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.getData(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getData() {
    getDetail.search(this.props.id, res => {
      const resJson = JSON.parse(res);
      if(resJson[0]){
        this.setState({
        card: resJson[0].message[0],
        get: true,
      })
      }
      
    });
  }

  timeFormate = (seconds) => {
    const dayTime = parseInt(seconds / (24 * 60 * 60));
    const hourTime = parseInt((seconds % (24 * 60 * 60)) / 3600);
    const minuteTime = parseInt((seconds % (60 * 60)) / 60);
    const secondTime = parseInt(seconds % 60);
    const result = dayTime + '天' + hourTime + '小时' + minuteTime + '分' + secondTime + '秒';
    return result;
  }

  render() {

    return (
      //-light-blue
      //-teal
      //-cyan
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Row className="justify-content-around">
              <Col xs="12" sm="4" lg="4">
                <Card className="text-white bg-light-blue text-center">
                  <CardBody className="pb-0">
                    <i className="fa fa-cogs float-center h2"></i>
                    <div className="text-value">节点数据</div>
                    <div>{this.state.get ? this.state.card.number : 'Loading...'}</div>
                    <br></br>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="4" lg="4">
                <Card className="text-white bg-teal text-center">
                  <CardBody className="pb-0">
                    <i className="icon-calendar float-center h1"></i>
                    <div className="text-value">运行时间</div>
                    <div>{this.state.get ? this.timeFormate(this.state.card.run_time) : 'Loading...'}</div>
                    <br></br>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="4" lg="4">
                <Card className="text-white bg-cyan text-center">
                  <CardBody className="pb-0">
                    <i className="fa fa-laptop float-center h2"></i>
                    <div className="text-value">当前电量</div>
                    <div>{this.state.get ? this.state.card.battery + "%" : 'Loading...'}</div>
                    <br></br>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div >
    )
  }
}

export default DeviceCard;
