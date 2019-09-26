// import React, { Component } from 'react';
// import { Col, Row } from 'reactstrap';
// import videojs from 'video.js';
// import config from '../../config';
// const videoUrl = config.videoUrl;

// class VideoJs extends Component {

//   componentDidMount() {
//     this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
//       console.log('onPlayerReady', this)
//     });
//   }

//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose()
//     }
//   }
//   render() {
//     return (
//       <div className="animated fadeIn">
//         <Row>
//           <Col xs="10" sm="10" lg="10" className="offset-md-1">
//             <div data-vjs-player>
//               <video ref={node => this.videoNode = node} className="video-js vjs-default-skin vjs-big-play-centered vjs-fluid vjs-16-9" controls object-fit="fill" preload="auto" data-setup='{"autoplay":true}'>
//                 <source id="source" src={videoUrl} type="application/x-mpegURL" />
//               </video>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }

// export default VideoJs;