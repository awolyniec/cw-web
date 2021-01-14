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
    this.handleConnectionUnexpectedlyNotOpen = handleConnectionUnexpectedlyNotOpen;
    this.webSocket.addEventListener('open', () => {
      this.webSocket.onmessage = onMessageCb;
      this.webSocket.onerror = onErrorCb;
      this.webSocket.addEventListener('close', onCloseCb);
      this.webSocket.addEventListener('close', function clear() {
        clearTimeout(this.pingTimeout);
      });
      onOpenCb();
    })
    this.webSocket.addEventListener('open', this.heartbeat.bind(this));
  }

  // run cb if websocket open; handle unexpected non-connection otherwise
  ensureWebSocketOpen(ifOpenCb) {
    if (_.get(this.webSocket, "readyState") === 1) {
      ifOpenCb();
    } else {
      this.handleConnectionUnexpectedlyNotOpen();
    }
  }

  send(message) {
    this.ensureWebSocketOpen(() => {
      this.webSocket.send(message);
    });
  }

  close(code = 1000) { // defaults to normal exit
    this.ensureWebSocketOpen(() => {
      this.webSocket.close(code);
      this.webSocket = null;
    });
  }

  getReadyState() {
    return _.get(this.webSocket, "readyState");
  }

  heartbeat() {
    clearTimeout(this.pingTimeout);
  
    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      this.close(); // TODO: get proper exit code
    }, 30000 + 1000);
  }
}

const instance = new WebSocketService();
module.exports = instance;