import React from 'react';
import { CirclePicker } from 'react-color';

import { ChatEvents } from '../ChatEvents';

import './styles.scss';

const ChatPage = () => {

  const getChatView = () => {
    const chatEvents = [
      {
        type: "announcement",
        text: "You joined the chat."
      },
      {
        type: "message",
        text: "idk man"
      },
      {
        type: "message",
        name: "Luigi",
        color: "#aa55bb",
        text: "Why is the chat moving upwards?"
      },
      {
        type: "message",
        text: "ikr"
      },
      {
        type: "message",
        name: "Big Chungus",
        color: "#11ddcc",
        text: "Based and redpilled"
      }
    ];

    return (
      <div className="chat-view">
        <div className="chat-section-container">
          <ChatEvents data={chatEvents} />
        </div>
        <div className="member-list-container">
        </div>
      </div>
    );
  };

  // TODO: make into own page once accounts are created
  const getSignInView = () => {
    return (
      <div className="sign-in-view">
        <div className="sign-in-form">
          <h1>Welcome to ChattyWatty</h1>
          <span className="input-label">Enter your name:</span>
          <input className="name-input" type="text" />
          <span className="input-label">Pick your color:</span>
          <div className="circle-picker-container">
            <CirclePicker width={"400px"} />
          </div>
          <div>
            <button className="chat-enter-button" type="button">Enter Chat</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-page">
      {/* {getSignInView()} */}
      {getChatView()}
    </div>
  );
};

export default ChatPage;