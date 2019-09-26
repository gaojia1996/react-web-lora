function getVideoSrc() {
  var video = document.getElementById('hls.js');
  if (Hls.isSupported()) {
    console.log('if')
    var hls = new Hls();
    hls.loadSource(video.src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    console.log('else if')
    video.addEventListener('loadedmetadata', function () {
      video.play();
    });
  }

  if (flvjs.isSupported()) {
    var video = document.getElementById('flv.js');
    var flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: video.src,
    });
    flvPlayer.attachMediaElement(video);
    flvPlayer.load();
    flvPlayer.play();
  }
}

const VideoSrc = { getVideoSrc };
export default VideoSrc;