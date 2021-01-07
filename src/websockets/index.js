const _ = require('lodash');

// TODO: not yet tested
class WebSocketService {
  open(
    onOpenCb = () => {},
    onMessageCb = () => {},
    onErrorCb = () => {},
    onCloseCb = () => {},
  ) {
    this.webSocket = new WebSocket("ws://localhost:8080"); // TODO: add prod URLs
    this.webSocket.onopen = function() {
      this.webSocket.onmessage = onMessageCb; // TODO: this should be a large helper function inside ChatPage
      this.webSocket.onerror = onErrorCb;
      this.webSocket.onClose = onCloseCb;
      onOpenCb();
    };
  }

  ensureWebSocketOpen() {
    if (_.get(this.webSocket, "readyState") !== 1) {
      throw new Error("WebSocket not open.");
    }
  }

  send(message) {
    this.ensureWebSocketOpen();
    this.webSocket.send(message);
  }

  close(code = 1000) { // defaults to normal exit
    this.ensureWebSocketOpen();
    this.webSocket.close(code);
  }
}

const instance = new WebSocketService();
Object.freeze(instance);
module.exports = instance;