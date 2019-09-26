import React, { Component, lazy } from 'react';
import { Row, Col, } from 'reactstrap';
const Widget04 = lazy(() => import('./Card'));

class Feature extends Component {
  render() {

    return (
      <Row>
        <Col sm="6" md="2">
          <Widget04 icon="fa fa-laptop" color="info" header="私有LoRa网络" value="100" invert style={{ height: '90%' }}>
            严格按照国际 LoRa-Alliance 规定的 LoRaWAN 协议进行灵活高效组网；
            支持各类MAC Command命令；
            并具备实时监控LoRa网络服务及设备的功能。
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04 icon="fa fa-cogs" color="success" header="高效数据传输" value="100" invert style={{ height: '90%' }}>
            根据物联网业务特点，可灵活选择HTTP或者MQTT传输协议进行IoT数据通信；
            整体实现架构采用轻巧、开放、简单、规范设计思想，便于进行二次开发。
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04 icon="icon-basket-loaded" color="warning" header="多样化数据存储" value="100" invert style={{ height: '90%' }}>
            提供多类型数据的存储解决方案，包括MySQL/MongoDB/Redis等；实现数据持久化存储；
            支持大数据分析； 利用高速缓存保证云平台服务实时响应。
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04 icon="icon-pie-chart" color="primary" header="安全可靠连接" value="100" invert style={{ height: '90%' }}>
            多重安全保障技术保证数据安全可靠传输；接口采用TLS加密，保障通道加密和传输安全；
             设备采用数字证书身份认证，确保唯一性及合法性；采用多级权限控制数据传输。
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04 icon="icon-speedometer" color="danger" header="高并发接入" value="100" invert style={{ height: '90%' }}>
            采用解耦化、服务化的弹性设计，有良好的水平扩展能力；能根据应用负载进行弹性扩容；
             采用非阻塞异步I/O来处理接入请求，实现大规模高并发接收、解析和分发处理。
          </Widget04>
        </Col>
        <Col sm="6" md="2">
          <Widget04 icon="icon-speech" color="info" header="完备开发接口" value="100" invert style={{ height: '90%' }}>
            为开发者提供智能硬件产品开发过程中的所需各类SDK和API，并提供开发文档；
            开发者通过使用SDK/API，可快速完成特定物联网应用的开发。
          </Widget04>
        </Col>
      </Row>
    );
  }
}

export default Feature;
