import React, { useEffect, useRef } from 'react';
import classname from 'classnames';

import { Message } from '../Message';

import './styles.scss';

// TODO: test overflow
const ChatEvents = ({ data = [] }) => {
  const scrollDummyRef = useRef();

  // TODO: won't this scroll to bottom on every render, unless we add current/some flag as a dependency?
  useEffect(() => {
    if (scrollDummyRef.current) {
      scrollDummyRef.current.scrollIntoView();
    }
  });

  const getAnnouncementView = ({ text }) => {
    return (
      <div className="announcement-container secondary-text">
        {text}
      </div>
    );
  };

  const getMessageView = ({ name, ...rest }) => {
    return (
      <>
        <div className={classname("chat-event-container chat-message", {
          "self-message": !name,
          "other-message": name
        })}>
          <Message { ...{ name, ...rest }} />
        </div>
        <div class="spacer" style={{ clear: "both" }} />
      </>
    );
  };

  return (
    <div className="chat-events">
      {data.map(({ type, ...rest }, index) => {
        return (
          <div className="row" key={`message-${index}`}>
            {type === "message" ? getMessageView(rest) : getAnnouncementView(rest)}
          </div>
        );
      })}
      <div className="scroll-dummy" ref={scrollDummyRef} />
    </div>
  );
};

export default ChatEvents;