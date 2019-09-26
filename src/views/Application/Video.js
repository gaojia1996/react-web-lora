import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import VideoJs from './VedioJs';

class Video extends Component {


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardHeader className="h3 bg-teal">
                <i className="icon-control-play"></i>视频数据
              </CardHeader>
              <CardBody height="600px">
                <VideoJs />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Video;