import React, { Component } from 'react';
import { Table } from 'antd';
import getTableData from '../Device/getTableData';
import Now from './Now';
import { Button, Card, CardBody, CardHeader, } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

class DeviceTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first: true,
      end_time: Date.parse(new Date()) / 1000,
      data: [],
      get: false,
    };
  }

  componentDidMount() {
    if (this.state.first) {
      const end_time = this.state.end_time;
      console.log(typeof(this.props.id))
      getTableData.firstSearch(this.props.id, end_time, resD => {
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
      getTableData.search(this.props.id, start_time, end_time, resD => {
        const resData = JSON.parse(resD);
        const dataNew = resData.contact(this.state.data);
        this.setState({
          data: dataNew,
          get: true,
        })
      })
    }
  }

  render() {

    const dataSource = this.state.data;

    const columns = [
      {
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        defaultSortOrder: 'descend',
        width: '10%',
        sorter: (a, b) => a.timestamp - b.timestamp,
        // render: timestamp => new Date((timestamp + 8 * 60 * 60) * 1000).toUTCString(),
        render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '甲烷浓度(ppm)',
        dataIndex: 'data[0].CH4',
        key: 'CH4',
        width: '10%',
        render: d => typeof (d) != "undefined" ? d.toFixed(1) : 'N/A',
      },
      {
        title: '温度(℃)',
        dataIndex: 'data[0].temperature',
        key: 'temperature',
        width: '10%',
        render: d => typeof (d) != "undefined" ? d.toFixed(1) : 'N/A',
      },
      {
        title: '湿度(%)',
        dataIndex: 'data[0].humidity',
        key: 'humidity',
        width: '10%',
        render: d => typeof (d) != "undefined" ? d.toFixed(1) : 'N/A',
      },
      {
        title: '水位(cm)',
        dataIndex: 'data[0].waterlevel',
        key: 'waterlevel',
        width: '10%',
        render: d => typeof (d) != "undefined" ? d.toFixed(1) : 'N/A',
      }
    ];

    const urlNow = '/application/device/' + this.props.id + '/table';
    const url = '/application/device/' + this.props.id + '/graph';

    return (
      <div className="animated fadeIn">
        <Now id={this.state.get ? this.state.data[0] : ''}></Now>
        <Card>
          <CardHeader>
            <Link to={urlNow} replace><Button color="primary">数据表</Button></Link>
            <Link to={url} replace><Button color="light">数据图</Button></Link>
          </CardHeader>
          <CardBody>
            <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />
          </CardBody>
        </Card>
      </div >
    )
  }
}

export default DeviceTable;
