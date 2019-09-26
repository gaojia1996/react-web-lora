import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';
import { Table } from 'antd';
import moment from 'moment';

class GatewayData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
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
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3 bg-teal">
                网关ID:{this.props.match.params.gatewayId}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader className="h4 bg-blue">
                        <i className="fa fa-table fa-lg"></i>网关通信数据
                      </CardHeader>
                      <CardBody>
                        <Table
                          pagination={pagination}
                          onChange={this.handleChange}
                          dataSource={dataSource}
                          columns={columns}
                          rowKey={record => record.timestamp}
                          scroll={{ x: 1200 }}
                          loading={false} />
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

export default GatewayData;
