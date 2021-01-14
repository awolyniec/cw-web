const _ = require('lodash');

class WebSocketService {
  constructor() {
    this.webSocket = null;
  }

  open(
    onOpenCb = () => {},
    onMessageCb = () => {},
    onErrorCb = () => {},
    onCloseCb = () => {},
    handleConnectionUnexpectedlyNotOpen = () => {},
  ) {
    this.webSocket = new WebSocket("ws://localhost:8080"); // TODO: add prod URLs
    this.webSocket.onopen = () => {
      this.webSocket.onmessage = onMessageCb;
      this.webSocket.onerror = onErrorCb;
      this.webSocket.onclose = onCloseCb;
      this.handleConnectionUnexpectedlyNotOpen = handleConnectionUnexpectedlyNotOpen;
      onOpenCb();
    };
  }

  ensureWebSocketOpen() {
    if (_.get(this.webSocket, "readyState") !== 1) {
      this.handleConnectionUnexpectedlyNotOpen();
    }
  }

  send(message) {
    this.ensureWebSocketOpen();
    this.webSocket.send(message);
  }

  close(code = 1000) { // defaults to normal exit
    this.ensureWebSocketOpen();
    this.webSocket.close(code);
    this.webSocket = null;
  }

  getReadyState() {
    return _.get(this.webSocket, "readyState");
  }
}

const instance = new WebSocketService();
module.exports = instance;