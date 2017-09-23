/**
 * Created by linxins on 17-9-23.
 * node sdk人脸识别
 * 1.前端页面
 *    1.js调用本地摄像头，获取视频流  video
 *       getUserMedia
 *    2.视频流解码，用video展示出来 file  blob
 *       window.URL.createObjectURL(buffer)
 *    3.canvas截取video视频流生成图片
 *       创建canvas对象，绘制截取图片
 *    4.图片生成base64编码
 *       cxt.drawImage    canvas.toDataURL
 *    5.base64传输到后台
 *    6.反馈信息交互
 */

var Util = {
  _$: function (id) {
    return document.getElementById(id);
  },
  ajax: function (options) {
    if (!options || !options.url) {
      throw new Error('request url not empty');
    }
    options.method || 'GET';
    // 创建请求xhr对象url, success
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          // 成功回调
          typeof options.success === 'function' && options.success(JSON.parse(this.responseText))
        } else {
          typeof options.error === 'function' && options.error(this.responseText)
        }
      }
    }
    // 打开连接 true: 异步
    xhr.open(options.method, options.url, true);
    // 开始发送
    xhr.send(options.data);
  }
}

var video = document.querySelector('video'); // 视频组件
var buffer; // 视频流缓冲区

/**
 * 基于 querySelectorAll的事件绑定，从 Array.prototype中剽窃了 forEach 方法来完成遍历
 * 按钮监听，设置事件代理
 */
Array.prototype.forEach.call(document.querySelectorAll('.control-btn'), function (el) {
  el.addEventListener('click', function (e) {
    e = e || window.event;
    var id = e.target.id;
    switch (id) {
      case 'open': // 开启摄像头
        openCamera();
        break;
      case 'close': // 关闭摄像头
        closeCamera();
        break;
      case 'scanface': // 人脸识别
        scanFace();
        break;
      default:
        break;
    }
  })
})

/**
 * 开启摄像头
 * 相应h5 API 查看地址
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
 */
function openCamera() {
  console.log(`开启摄像头`)
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: true, video: { width: 300, height: 300 } },
      function(stream) {
        buffer = stream;
        video.muted = true; // 设置视频静音
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      },
      function(err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
}

function scanFace() {
  console.log('开始人脸识别');
  if (!buffer) {
    console.log('没有视频流');
    return
  }
  var oCanvas = document.createElement('canvas');
  var cxt = oCanvas.getContext();
  cxt.arc()
  // 视频流解码，用video展示出来 file  blob
  oCanvas.src = window.URL && window.URL.createObjectURL(buffer);

  console.log(oCanvas);
}

/**
 * 将视频流传入，将其关闭
 */
function closeCamera() {
  console.log('关闭摄像头')
  buffer && buffer.getVideoTracks()[0].stop();
  // video.pause(); // 暂停当前播放的音频/视频
}