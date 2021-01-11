import React from 'react';

import './styles.scss';

const ChatMessageCompose = ({
  message = "", handleChangeMessage, sendMessage = () => {}, sendButtonDisabled
 }) => {
  const handleKeypress = e => {
    if(e.which === 13 && !e.shiftKey) {        
        sendMessage();
        e.preventDefault();
    }
}

  // TODO: remove trailing whitespace from messages
  return (
    <div className="chat-message-compose">
      <textarea
        value={message}
        rows={4}
        onKeyPress={handleKeypress}
        onChange={handleChangeMessage}
      />
      <button
        className="send-button"
        type="button"
        onClick={sendMessage}
        disabled={sendButtonDisabled}
      >
        Send
      </button>
    </div>
  );
};

export default ChatMessageCompose;