import React from 'react';

import './styles.scss';

const ChatMessageCompose = ({ message = "", handleChangeMessage, sendMessage = () => {} }) => {
  const handleKeypress = e => {
    if(e.which === 13 && !e.shiftKey) {        
        sendMessage();
        e.preventDefault();
    }
}

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
      >
        Send
      </button>
    </div>
  );
};

export default ChatMessageCompose;