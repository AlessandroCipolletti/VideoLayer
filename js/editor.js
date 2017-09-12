/*
  Documentations:

*/
(function (app) {
  "use strict";
  // Dependencies
  var MATH = Math;
  var Param = {};
  var Utils = {};
  var Main = {};
  var Messages = {};
  var Tools = {};

  var _polyfills = [];
  var _config = {};

  var _container = {};
  var _data = {
    fileName: "1.mp4",
    layers: {
      1: {
        type: "video",
        fileName: "2.mp4",
        startTime: 7,
        endTime: 15,
        dom: {},
        started: false,
        ended: false
      },
      2: {
        type: "text",
        text: "Hello everybody!! I'm a really gooooood and looooong text, i'm here only for a cool test",
        startTime: 11,
        endTime: 20,
        dom: {},
        started: false,
        ended: false
      },
      3: {
        type: "text",
        text: "CIAO CIAO CIAO CIAO CIAO CIAO CIAO",
        startTime: 3,
        endTime: 10,
        dom: {},
        started: false,
        ended: false
      },
      4: {
        type: "image",
        fileName: "4.jpg",
        startTime: 21,
        endTime: 31,
        dom: {},
        started: false,
        ended: false
      }
    }
  }

  function _updateLayers () {

    var time = _container.preview.video.currentTime;
    if (time < _container.preview.video.duration) {
      for (var i = Object.keys(_data.layers).length; i > 0 ; i--) {
        if (_data.layers[i].started === false && _data.layers[i].startTime < time) {
          _data.layers[i].started = true;
          _data.layers[i].dom.style.opacity = 1;
          if (_data.layers[i].type === "video") {
            _data.layers[i].dom.querySelector("video").play();
          }
        } else if (_data.layers[i].ended === false && _data.layers[i].endTime < time) {
          _data.layers[i].ended = true;
          _data.layers[i].dom.style.opacity = 0;
        }
      }
      requestAnimationFrame(_updateLayers);
    }

  }

  function _play () {

    _container.preview.video.play()
    requestAnimationFrame(_updateLayers);

  }

  function _newLayerDom (index) {

    var layer = document.createElement("div");
    layer.classList.add("editor__preview-layer");
    layer.index = index;
    layer.style.zIndex = (index + 1) * 10;
    _container.preview.appendChild(layer);
    _data.layers[index].dom = layer;
    return layer;

  }

  function _loadVideoLayer (index) {

    return new Promise (function (resolve, reject) {

      var video = document.createElement("video");
      var layer = _newLayerDom(index);
      video.muted = true;
      video.controls = false;
      layer.appendChild(video);
      video.addEventListener("loadeddata", resolve);
      video.src = "media/" + _data.layers[index].fileName;

    });

  }

  function _loadTextLayer (index) {

    var text = document.createElement("p");
    var layer = _newLayerDom(index);
    text.innerHTML = _data.layers[index].text;
    layer.appendChild(text);
    return true;

  }

  function _loadImageLayer (index) {

    return new Promise (function (resolve, reject) {

      var img = new Image();
      var layer = _newLayerDom(index);
      img.onload = resolve;
      layer.appendChild(img);
      img.src = "media/" + _data.layers[index].fileName;

    });

  }

  function _loadLayers () {

    var promises = [];
    var type;
    for (var i = 1, l = Object.keys(_data.layers).length; i <= l; i++) {
      type = _data.layers[i].type;
      if (type === "video") {
        promises.push(_loadVideoLayer(i));
      } else if (type === "text") {
        promises.push(_loadTextLayer(i));
      } else if (type === "image") {
        promises.push(_loadImageLayer(i));
      }
    }
    return Promise.all(promises);

  }

  function _loadVideo () {

    return new Promise (function (resolve, reject) {
      var video = document.createElement("video");
      video.controls = false;
      _container.preview.appendChild(video);
      _container.preview.video = video;
      video.addEventListener("loadeddata", resolve);
      video.src = "media/" + _data.fileName;
    });

  }

  // function _onRotate (e) {
  //   // do some stuff
  // }

  function _initDom () {

    Main.loadTemplate("editor", {
      marginTop: Param.headerSize,
      fromLabel: "From: ",
      toLabel: "To: "
    }, Param.container, function (templateDom) {

      _container = templateDom;
      _container.preview = templateDom.querySelector(".editor__preview");
      _container.play = templateDom.querySelector(".editor__preview-gotofullscreen");
      _container.play.addEventListener(Param.eventStart, _play);
      _loadVideo().then(_loadLayers);//.then(_play);
      // Main.addRotationHandler(_onRotate);

    });

  }

  function init (params) {

    Param = app.Param;
    Utils = app.Utils;
    Main = app.Main;
    Messages = app.Messages;
    Tools = app.Tools;
    _config = Utils.setConfig(params, _config);
    Utils.initWithPolyfills(_polyfills, _initDom);

  }

  app.module("Editor", {
    init
  });

})(APP);
