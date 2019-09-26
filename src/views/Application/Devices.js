import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import getTableData from './getTableData';
import moment from 'moment';
import config from '../../config';
class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_timestamp: 1556592491,
      date: Date.parse(new Date()) / 1000 - 1556592491,
      DevAddr: config.DevAddr,
      location: config.location
      // data: null,
    };
    this.tick = this.tick.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }
  tick() {
    Promise.all(this.state.DevAddr.map((k, index) => {
      return this.getNewData(k);
    }))
      .then((res) => {
        console.log(res);
        this.setState({
          data: res,
          date: this.state.date + 5,
        });
      });
    // this.setState({
    //   date: this.state.date + 5,
    // });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
    clearInterval(this.timerID);
  }

  timeFormate = (seconds) => {
    const dayTime = parseInt(seconds / (24 * 60 * 60));
    const hourTime = parseInt((seconds % (24 * 60 * 60)) / 3600);
    const minuteTime = parseInt((seconds % (60 * 60)) / 60);
    const secondTime = parseInt(seconds % 60);
    const result = dayTime + '天' + hourTime + '小时' + minuteTime + '分';
    return result;
  }

  timeFormateTimestamp(timestamp) {
    const time = new Date(timestamp);
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const result = month + '/' + date + ' ' + hour + ':' + minute + ':' + second;
    return result;
  }

  getNewData(DevAddr) {
    return getTableData.nowSearch(DevAddr, (Date.parse(new Date()) / 1000), resD => {
      const resData = JSON.parse(resD);
      console.log(resData.message)
      return resData.message;
    });
  }

  select(data) {
    if (data[0].data[0].CH4 > 5) {
      return (<Badge color="danger">Alarming!</Badge>);
    } else if (data[0].data[0].temperature > 50) {
      return (<Badge color="danger">Alarming!</Badge>);
    } else if (data[0].data[0].humidity > 80) {
      return (<Badge color="danger">Alarming!</Badge>);
    } else if (data[0].data[0].waterlevel > 10) {
      return (<Badge color="danger">Alarming!</Badge>);
    } else {
      return (<Badge color="success">Active</Badge>);
    }
  }

  render() {
    const checkData = (i) => {
      let ret = false;
      const data = this.state.data;
      if (data && Array.isArray(data)) {
        if (Array.isArray(data[i]) && data[i].length > 0) {
          if (data[i][0] instanceof Object) {
            ret = true
          }
        }
      }
      return ret;
    }
    const tableItem = this.state.DevAddr.map((k, i) => {
      const url = `/application/device/${k}/graph`;
      const deviceName = `监测设备-${i + 1}`;
      console.log(this.state.data);
      return (
        <tr key={i}>
          <td>{
            checkData(i) ?
              <Link to={url}>{deviceName}</Link>
              : deviceName
          }</td>
          {/* <td> <Link to="/application/device/D51ef2c9c694d8da073799/table">D51ef2c9c694d8da073799</Link></td> */}
          <td>{this.state.location[i]}</td>
          {/* <td>1.0.2</td> */}
          {checkData(i) ? (
            <React.Fragment>
              <td>{moment(this.state.data[i][0].timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{this.select(this.state.data[i])}</td>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <td>No Data</td>
                <td>No Data</td>
              </React.Fragment>
            )}
        </tr>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-around">
          <Col xs="12" sm="4" lg="4">
            <Card className="text-white bg-light-blue text-center">
              <CardBody className="pb-0">
                <i className="icon-feed float-center h2"></i>
                <div className="text-value">设备数量</div>
                <div>{config.DevAddr.length}</div>
                <br></br>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <Card className="text-white bg-teal text-center">
              <CardBody className="pb-0">
                <i className="icon-cloud-download float-center h2"></i>
                <div className="text-value">网关数量</div>
                <div>1</div>
                <br></br>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <Card className="text-white bg-cyan text-center">
              <CardBody className="pb-0">
                <i className="icon-settings float-center h2"></i>
                <div className="text-value">系统运行时间</div>
                <div>{this.timeFormate(this.state.date)}</div>
                <br></br>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-location-pin"></i> 传感数据监测设备
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>设备名称</th>
                      {/* <th>设备唯一标识符</th> */}
                      <th>地址</th>
                      {/* <th>LoRaWAN版本</th> */}
                      <th>最新数据时间</th>
                      <th>设备状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableItem}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Devices;
