import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Line, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import getGraphData from '../Device/getTableData';

class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      get: false,
      first: true,
      end_time: Date.parse(new Date()) / 1000,
      data: [],
    };
  }

  componentDidMount() {
    if (this.state.first) {
      const end_time = this.state.end_time;
      getGraphData.dataSearch(this.props.id, end_time, resD => {
        const resData = JSON.parse(resD);
        this.setState({
          data: resData.message,
          first: false,
          get: true,
        });
      })
    } else {
      const start_time = this.state.end_time;
      const end_time = Date.parse(new Date()) / 1000
      getGraphData.search(this.props.id, start_time, end_time, resD => {
        const resData = JSON.parse(resD);
        const dataNew = resData.contact(this.state.data);
        this.setState({
          data: dataNew,
        })
      })
    }
  }

  timeFormat(timestamp) {
    const time = new Date(timestamp);
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const result = month + '/' + date + ' ' + hour + ':' + minute + ':' + second;
    return result;
  }

  render() {
    var CH4Line = {};
    var CH4PieData = {};
    var temperatureLine = {};
    var temperaturePieData = {};
    var humidityLine = {};
    var humidityPieData = {};
    var waterlevelLine = {};
    var waterlevelPieData = {};
    
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'minute'
          }
        }],
        yAxes: [{
          ticks: {
              suggestedMin: 50,
              suggestedMax: 100,
          }
      }],
      },
      maintainAspectRatio: false
    }
    // const temperatureoptions = {
    //   tooltips: {
    //     enabled: false,
    //     custom: CustomTooltips
    //   },
    //   scales: {
    //     xAxes: [{
    //       type: 'time',
    //       time: {
    //         unit: 'minute'
    //       }
    //     }],
    //     yAxes: [{
    //       ticks: {
    //           suggestedMin: 20,
    //           suggestedMax: 40,
    //       }
    //   }],
    //   },
    //   maintainAspectRatio: false
    // }
    if (this.state.get) {
      const a = this.state.data;
      const CH4 = [];
      const temperature = [];
      const humidity = [];
      const waterlevel = [];
      const time = [];
      a.forEach((value) => {
        CH4.push(value.data[0].CH4);
        temperature.push(value.data[0].temperature);
        humidity.push(value.data[0].humidity);
        waterlevel.push(value.data[0].waterlevel);
        time.push(this.timeFormat(value.timestamp * 1000));
      });

      const CH4Pie = [0, 0, 0, 0, 0, 0];
      CH4.forEach((value) => {
        if (value <= 35) {
          CH4Pie[0]++;
        } else if (value <= 75) {
          CH4Pie[1]++;
        } else if (value <= 115) {
          CH4Pie[2]++;
        } else if (value <= 150) {
          CH4Pie[3]++;
        } else if (value <= 250) {
          CH4Pie[4]++;
        } else {
          CH4Pie[5]++;
        }
      });

      const temperaturePie = [0, 0, 0, 0];
      temperature.forEach((value) => {
        if (value <= 0) {
          temperaturePie[0]++;
        } else if (value <= 11.9) {
          temperaturePie[1]++;
        } else if (value <= 19.9) {
          temperaturePie[2]++;
        } else {
          temperaturePie[3]++;
        }
      });

      const humidityPie = [0, 0, 0, 0, 0, 0];
      humidity.forEach((value) => {
        if (value <= 0) {
          humidityPie[0]++;
        } else if (value <= 60) {
          humidityPie[1]++;
        } else if (value <= 80) {
          humidityPie[2]++;
        } else {
          humidityPie[3]++;
        }
      });

      const waterlevelPie = [0, 0, 0, 0, 0, 0];
      waterlevel.forEach((value) => {
        if (value <= 40) {
          waterlevelPie[0]++;
        } else if (value <= 60) {
          waterlevelPie[1]++;
        } else if (value <= 80) {
          waterlevelPie[2]++;
        } else {
          waterlevelPie[3]++;
        }
      });

      CH4Line = {
        labels: time,
        datasets: [
          {
            label: '甲烷',
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
            data: CH4,
          },
        ],
      };

      CH4PieData = {
        labels: [
          '优：0-35',
          '良：35-75',
          '轻度污染：75-115',
          '中度污染：115-150',
          '重度污染：150-250',
          '严重污染：250以上',
        ],
        datasets: [
          {
            data: CH4Pie,
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

      temperatureLine = {
        labels: time,
        datasets: [
          {
            label: '温度',
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
            data: temperature,
          },
        ],
      };

      temperaturePieData = {
        labels: [
          '寒：-10℃-0℃',
          '凉：0℃-11.9℃',
          '温：11.9℃-19.9℃',
          '舒适：19.9℃-30℃',
          '炎热：30℃-40℃',
        ],
        datasets: [
          {
            data: temperaturePie,
            backgroundColor: [
              '#6f42c1',
              '#36A2EB',
              '#FFCE56',
              '#4dbd74',
              '#FF6384',
            ],
            hoverBackgroundColor: [
              '#6f42c1',
              '#36A2EB',
              '#FFCE56',
              '#4dbd74',
              '#FF6384',
            ],
          }],
      }

      humidityLine = {
        labels: time,
        datasets: [
          {
            label: '湿度',
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
            data: humidity,
          },
        ],
      }

      humidityPieData = {
        labels: [
          '干燥：<40%',
          '舒适：40%-60%',
          '潮湿：60%-80%',
          '不正常天气：>80%',
        ],
        datasets: [
          {
            data: humidityPie,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#6f42c1',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#6f42c1',
            ],
          }],
      }

      waterlevelLine = {
        labels: time,
        datasets: [
          {
            label: '水位',
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
            data: waterlevel,
          },
        ],
      }

      waterlevelPieData = {
        labels: [
          '干燥：<40%',
          '舒适：40%-60%',
          '潮湿：60%-80%',
          '不正常天气：>80%',
        ],
        datasets: [
          {
            data: waterlevelPie,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#6f42c1',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#6f42c1',
            ],
          }],
      }
    }

    return (
      <div className="animated fadeIn">
        <Row>
          {/* <Col xs="12" sm="12" lg="12" >什么时间段的数据TODO</Col> */}
          <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                甲烷数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Line data={CH4Line} options={options} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                ch4数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Pie data={CH4PieData} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col> */}

          <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                温度数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Line data={temperatureLine} options={options} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                温度数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Pie data={temperaturePieData} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col> */}

          <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                水位数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Line data={waterlevelLine} options={options} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                水位数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Pie data={waterlevelPieData} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col> */}

          <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                湿度数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Line data={humidityLine} options={options} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xs="12" sm="12" lg="6">
            <Card>
              <CardHeader>
                湿度数据图
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.get ? <Pie data={humidityPieData} /> : <div>Loading...</div>}
                </div>
              </CardBody>
            </Card>
          </Col> */}

        </Row>
      </div >
    )
  }
}

export default Graph;
