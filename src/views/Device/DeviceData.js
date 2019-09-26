import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, } from 'reactstrap';
import { Line, } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Table } from 'antd';
import moment from 'moment';

class DeviceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.renderTable(),
    };
    this.handleClick = this.handleClick.bind(this);
  }
  renderTable() {
    const pagination = {
      current: 0,
      total: 1,
      pageSize: 10,
    }
    const dataSource = [
      {
        timestamp: "1564042658",
        rxnb: 1,
        rxok: 1,
        rxfw: 1,
        ackr: "100%",
        dwnb: 1,
        txnb: 1,
      }
    ];
    const columns = [
      {
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: '10%',
        render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '接收无线数据包数量',
        dataIndex: 'rxnb',
        key: 'rxnb',
        width: '10%',
        render: rxnb => rxnb,
      },
      {
        title: '接收已授权数据包数量',
        dataIndex: 'rxok',
        key: 'rxok',
        width: '10%',
        render: rxok => rxok,
      },
      {
        title: '转发无线数据包数量',
        dataIndex: 'rxfw',
        key: 'rxfw',
        width: '10%',
        render: rxfw => rxfw,
      },
      {
        title: '已授权上行数据占比',
        dataIndex: 'ackr',
        key: 'ackr',
        width: '10%',
        render: ackr => ackr,
      },
      {
        title: '接收下行数据包数量',
        dataIndex: 'dwnb',
        key: 'dwnb',
        width: '10%',
        render: dwnb => dwnb,
      },
      {
        title: '发送数据包数量',
        dataIndex: 'txnb',
        key: 'txnb',
        width: '10%',
        render: txnb => txnb,
      },
    ];
    return (
      <Table
        pagination={pagination}
        onChange={this.handleChange}
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.timestamp}
        scroll={{ x: 1200 }}
        loading={false} />
    );
  }
  handleClick(type) {
    if (type === 0) {
      const pagination = {
        current: 0,
        total: 1,
        pageSize: 10,
      }
      const dataSource = [
        {
          timestamp: "1564042658",
          rxnb: 1,
          rxok: 1,
          rxfw: 1,
          ackr: "100%",
          dwnb: 1,
          txnb: 1,
        }
      ];
      const columns = [
        {
          title: '时间',
          dataIndex: 'timestamp',
          key: 'timestamp',
          width: '10%',
          render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          title: '接收无线数据包数量',
          dataIndex: 'rxnb',
          key: 'rxnb',
          width: '10%',
          render: rxnb => rxnb,
        },
        {
          title: '接收已授权数据包数量',
          dataIndex: 'rxok',
          key: 'rxok',
          width: '10%',
          render: rxok => rxok,
        },
        {
          title: '转发无线数据包数量',
          dataIndex: 'rxfw',
          key: 'rxfw',
          width: '10%',
          render: rxfw => rxfw,
        },
        {
          title: '已授权上行数据占比',
          dataIndex: 'ackr',
          key: 'ackr',
          width: '10%',
          render: ackr => ackr,
        },
        {
          title: '接收下行数据包数量',
          dataIndex: 'dwnb',
          key: 'dwnb',
          width: '10%',
          render: dwnb => dwnb,
        },
        {
          title: '发送数据包数量',
          dataIndex: 'txnb',
          key: 'txnb',
          width: '10%',
          render: txnb => txnb,
        },
      ];
      const body =
        <Table
          pagination={pagination}
          onChange={this.handleChange}
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.timestamp}
          scroll={{ x: 1200 }}
          loading={false} />;
      this.setState({
        body: body,
      });
    } else {
      const line = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
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
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      };
      const options = {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false
      }
      const body =
        <Line data={line} options={options} />;
      this.setState({
        body: body,
      });
    }
  }
  render() {

    // const deviceInfo = {
    //   DevEUI: "7EFD63FFFE6CBE49",
    //   AppEUI: "8b912fb159a92328",
    //   activationMode: "OTAA",
    //   DevAddr: "00f5de98",
    //   AppKey: "d52e86a5b0ea6e348f923e543ed5f459",
    //   AppSKey: "8183459b792a8617d1b659d85ea06f4e",
    //   NwkSKey: "a697e59b1f0c45dd8549d068b757dd3c",
    //   timestamp: "1564042658",
    // }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                设备唯一标识符:{this.props.match.params.DevEUI}
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
                        {this.state.body}

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

export default DeviceData;
