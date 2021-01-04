import React from 'react';
import classname from 'classnames';

import "./styles.scss";

const Message = ({ name, color, text }) => {
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
      </div>
    </div>
  );
};

export default Message;