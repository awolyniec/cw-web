import React from 'react';
import classname from 'classnames';

import "./styles.scss";

const Message = ({ name, color, text, isSending }) => {
  return (
    <div className="message">
      {name && (
        <div>
          <div className="color-circle" style={{ "background-color": color }} />
        </div>
      )}
      <div>
        {name && (
          <div className="username secondary-text">
            <span>{name}</span>
          </div>
        )}
        <div className={classname("message-text-container",  { "other-party": name })}>
          <span className="message-text">{text}</span>
        </div>
        {isSending && (
          <div className="sending-message secondary-text">
            <span>Sending...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;