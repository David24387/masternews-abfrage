(function () {
  'use strict';
  var SCRIPT_URL = 'https://david24387.github.io/masternews-abfrage/';
  var script = document.currentScript;
  var host = document.createElement('div');
  host.style.cssText = 'width:100%;min-height:780px;position:relative;';
  var frame = document.createElement('iframe');
  frame.src = SCRIPT_URL;
  frame.title = 'Masternews-Umfrage';
  frame.loading = 'lazy';
  frame.setAttribute('allow', 'clipboard-write');
  frame.style.cssText = 'display:block;width:100%;height:850px;border:0;background:transparent;';
  host.appendChild(frame);
  if (script && script.parentNode) script.parentNode.insertBefore(host, script.nextSibling);
  else document.body.appendChild(host);
  window.addEventListener('message', function (event) {
    if (event.origin === 'https://david24387.github.io' &&
        event.source === frame.contentWindow &&
        event.data && event.data.type === 'masternews-survey-close') {
      host.style.display = 'none';
    }
  });
})();
