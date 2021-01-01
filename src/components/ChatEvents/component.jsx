import React from 'react';

import { Message } from '../Message';

const ChatEvents = ({ data = [] }) => {
  const dataPoint = {
    type: "message",
    name: "Luigi",
    color: "#aa55bb",
    text: "Why is the chat moving upwards?"
  };

  return (
    <div className="chat-events">
      <Message
        {...dataPoint}
      />
    </div>
  );
};

export default ChatEvents;