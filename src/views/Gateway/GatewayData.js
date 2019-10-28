import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';
import { Table } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import moment from 'moment';
import getDataFuncs from '../../redux/actions/getDataFuncs'
const testGatewayId = 'b827ebfffe075b04'
class GatewayData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 8,
      currentPage: 1,
      data: {
        count: 0,
        rows: [],
      },
    };
  }
  componentDidMount() {
    this.getGatewayCommunicateData(this.props.match.params.gatewayId, this.state.currentPage, this.state.pageSize);
  }
  getGatewayCommunicateData(gatewayId, pageNumber, pageSize) {

    getDataFuncs.getGatewayCommunicateDataFunc(gatewayId, pageNumber, pageSize)
      .then(res => {
        // console.log('the res is ', res)
        this.setState({
          data: res
        })

      })
      .catch(() => { console.log('获取网关通信数据错误'); })
    // alert('获取一次数据');

  }
  render() {
    // console.log('the pams is ', this.props.match);
    // console.log('the data of subpage is ', this.state.data);
    // console.log('the id is', this.props.location.state.oneGatewayId);
    // const gatewayId = this.props.location.state.oneGatewayId;
    // const pagination = {
    //   current: 0,
    //   total: 1,
    //   pageSize: 10,
    // }
    const dataSource = this.state.data['rows'].map((each) => {
      return ({
        rxnb: each['rxnb'],
        rxok: each['rxok'],
        rxfw: each['rxfw'],
        ackr: each['ackr'] + '%',
        dwnb: each['dwnb'],
        // timestamp:new Date(each['updatedAt']).toLocaleString()
        txnb: each['txnb'],
        timestamp: moment(new Date(each['updatedAt'])).format('YYYY/MM/DD HH:mm:ss'),
      })
    })
    // console.log('the datasource is ', dataSource);
    const columns = [
      {
        title: '时间',
        dataIndex: 'timestamp',
        sorter: (a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)),
        key: 'timestamp',
        width: '10%',
        render: timestamp => timestamp,
      },
      {
        title: '接收无线数据包',
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

                {/* 网关ID:{'this.props.match.params.gatewayId'} */}
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
                          pagination={{
                            pageSize: this.state.pageSize,
                            total: this.state.data['count'],
                            current: this.state.currentPage,

                          }}
                          onChange={(pagination) => {
                            this.setState(
                              { currentPage: pagination.current }
                            );
                            this.getGatewayCommunicateData(testGatewayId, pagination.current, this.state.pageSize);
                          }}
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


