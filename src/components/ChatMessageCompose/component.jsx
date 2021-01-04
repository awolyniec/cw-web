import React from 'react';

import './styles.scss';

const ChatMessageCompose = () => {
  
  return (
    <div className="chat-message-compose">
      <textarea rows={4} />
      <button className="send-button" type="button">Send</button>
    </div>
  );
};

export default ChatMessageCompose;