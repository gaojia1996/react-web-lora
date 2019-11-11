import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Alert } from 'reactstrap';
import { Line, Pie } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Table } from 'antd';
import { connect } from "react-redux";
import { deviceGetAppData, deviceGetGraphData, changeDevicePageType, deviceChangeTablePage, deviceDidUnmount } from '../../redux/actions';
import { bindActionCreators } from "redux";
import moment from 'moment';

class DeviceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  handleChange = (pagination) => { //设备应用数据页面变化
    const page = pagination;
    this.props.deviceChangeTablePage(page.current);
    this.props.deviceGetAppData(this.props.match.params.DevEUI, this.props.data.applicationChoose['AppEUI'], this.props.data.devicePagesize, page.current);
  }
  handleClick(type) {
    this.props.changeDevicePageType(type);
    if (type === 0) {
      this.props.deviceGetAppData(this.props.match.params.DevEUI, this.props.data.applicationChoose['AppEUI'], this.props.data.devicePagesize, 1);
    } else {
      this.props.deviceGetGraphData(this.props.match.params.DevEUI, this.props.data.applicationChoose['AppEUI']); //发接口获取画图数据
    }
  }
  onDismiss() {
    this.setState({ visible: false });
  }
  componentDidMount() {
    if (this.props.data.pageType === 0) {
      this.props.deviceGetAppData(this.props.match.params.DevEUI, this.props.data.applicationChoose['AppEUI'], this.props.data.devicePagesize, 1);
    } else {
      this.props.deviceGetGraphData(this.props.match.params.DevEUI, this.props.data.applicationChoose['AppEUI']); //发接口获取画图数据
    }
  }
  componentWillUnmount() {
    this.props.deviceDidUnmount();
  }
  render() {
    console.log(this.props.data.deviceTableItem)
    const pagination = {
      current: this.props.data.devicePageCurrent,
      total: this.props.data.devicePagecount,
      pageSize: this.props.data.devicePagesize,
    }
    const dataSource = this.props.data.deviceFetch ? this.props.data.deviceTableItem : [];
    const columns = this.props.data.deviceFetch ? this.props.data.deviceColum : [];
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips, //将默认的tooltip禁用，使用自己的tooltip
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 50,
            suggestedMax: 100,
          }
        }],
      },
      maintainAspectRatio: true, //窗口缩放时仍保持比例
    }
    var array = [];
    if (this.props.data.deviceGraphFetch && this.props.data.deviceGraphData.length !== 0) {
      for (let i = 0; i < this.props.data.deviceColum.length; i++) { //循环获取二维数组
        array.push([]);
        for (let j = 0; j < this.props.data.deviceGraphData.length; j++) {
          let array2;
          if (i === 0) {
            array2 = moment(this.props.data.deviceGraphData[j][this.props.data.deviceColum[i]['key']] * 1000).format('YYYY-MM-DD HH:mm:ss');
          } else {
            array2 = this.props.data.deviceGraphData[j]['data'][this.props.data.deviceColum[i]['key']];
          }
          array[i].push(array2);
        }
      };
      var lineObjArr = [];
      var pieObjArr = [];
      for (let i = 1; i < array.length; i++) {
        let lineObj = { //趋势图的data
          labels: array[0],
          datasets: [
            {
              label: this.props.data.deviceColum[i]['title'],
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: array[i],
            }
          ]
        }
        lineObjArr.push(lineObj);
        const d3 = require('d3');
        let min = d3.min(array[i]);
        let max = d3.max(array[i]);
        let labelArr = d3.range(min, max, (max - min) / 5);
        let pieObj = {}; //饼状图的data
        if (labelArr.length === 0) { //都是相等的值
          pieObj = {
            labels: [
              min,
            ],
            datasets: [
              {
                data: [array[i].length],
                backgroundColor: [
                  '#36A2EB',
                ],
                hoverBackgroundColor: [
                  '#36A2EB',
                ],
              }],
          }
        } else {
          let pieArr = [0, 0, 0, 0, 0];
          array[i].forEach((value) => { //构成饼状图的数据
            if (value <= labelArr[0]) {
              pieArr[0]++;
            } else if (value <= labelArr[1]) {
              pieArr[1]++;
            } else if (value <= labelArr[2]) {
              pieArr[2]++;
            } else if (value <= labelArr[3]) {
              pieArr[3]++;
            } else {
              pieArr[4]++;
            }
          })
          pieObj = {
            labels: [
              min + "-" + labelArr[0],
              labelArr[0] + "-" + labelArr[1],
              labelArr[1] + "-" + labelArr[2],
              labelArr[2] + "-" + labelArr[3],
              labelArr[3] + "-" + max,
            ],
            datasets: [
              {
                data: pieArr,
                backgroundColor: [
                  '#20c997',
                  '#36A2EB',
                  '#FFCE56',
                  '#6f42c1',
                  '#f86c6b',
                  '#2f353a',
                ],
                hoverBackgroundColor: [
                  '#20c997',
                  '#36A2EB',
                  '#FFCE56',
                  '#6f42c1',
                  '#f86c6b',
                  '#2f353a',
                ],
              }],
          }
        }
        pieObjArr.push(pieObj);
      }
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                设备名称:{this.props.match.params.name}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <Button color="primary" onClick={() => { this.handleClick(0) }}>数据表</Button>{" "}
                        <Button color="primary" onClick={() => { this.handleClick(1) }}>数据图</Button>
                      </CardHeader>
                      <CardBody>
                        {this.props.data.deviceNoDevAddr ? (
                          <Alert color="danger" isOpen={true} toggle={this.onDismiss}>
                            该设备暂时没有DevAddr属性，请稍后查看数据~
                          </Alert>
                        ) : (
                            this.props.data.deviceNoColum ? (
                              <Alert color="danger" isOpen={true} toggle={this.onDismiss}>
                                该设备所属的应用暂时未上传数据格式文件，请上传后再来查看数据~
                              </Alert>
                            ) : (
                                this.props.data.pageType === 0 ? (
                                  <Table
                                    pagination={pagination}
                                    onChange={this.handleChange}
                                    dataSource={dataSource}
                                    columns={columns}
                                    rowKey={record => record.timestamp + Math.random()}
                                    // scroll={{ x: 1200 }}
                                    loading={!this.props.data.deviceFetch} />
                                ) : (
                                    this.props.data.deviceGraphFetch ? (
                                      this.props.data.deviceGraphData.length === 0 ? (
                                        <Row>
                                          <Col xs="12" sm="12" lg="12">
                                            <div className="h5 text-center">
                                              <strong>暂无数据~</strong>
                                            </div>
                                          </Col>
                                        </Row>
                                      ) : (
                                          <React.Fragment>
                                            <Row>
                                              <Col xs="12" sm="12" lg="12">
                                                <div className="h5 text-center">
                                                  <strong>最近100条数据图</strong>
                                                </div>
                                              </Col>
                                            </Row>
                                            {this.props.data.deviceColum.map((k, i) => {
                                              if (i !== 0) {
                                                return (
                                                  <Row key={i}>
                                                    <Col xs="12" sm="12" lg="6">
                                                      <Card>
                                                        <CardHeader>
                                                          <strong>{k['kName']}数据图</strong>
                                                        </CardHeader>
                                                        <CardBody>
                                                          <div className="chart-wrapper">
                                                            <Line data={lineObjArr[i - 1]} options={options} />
                                                          </div>
                                                        </CardBody>
                                                      </Card>
                                                    </Col>
                                                    <Col xs="12" sm="12" lg="6">
                                                      <Card>
                                                        <CardHeader>
                                                          <strong>{k['kName']}数据图</strong>
                                                        </CardHeader>
                                                        <CardBody>
                                                          <div className="chart-wrapper">
                                                            <Pie data={pieObjArr[i - 1]} />
                                                          </div>
                                                        </CardBody>
                                                      </Card>
                                                    </Col>
                                                  </Row>
                                                )
                                              } else { return null }
                                            })}
                                          </React.Fragment>
                                        )
                                    ) : (
                                        <React.Fragment>
                                          <Row>
                                            <Col xs="12" sm="12" lg="12">
                                              <div className="h5 text-center">
                                                <strong>最近100条数据图</strong>
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            Loading...
                                          </Row>
                                        </React.Fragment>
                                      )
                                  )
                              )
                          )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deviceGetAppData, deviceGetGraphData, changeDevicePageType, deviceChangeTablePage, deviceDidUnmount }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceData);
