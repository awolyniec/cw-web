import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

import { ChatEvents } from '../ChatEvents';
import { ChatMessageCompose } from '../ChatMessageCompose';
import { MemberList } from '../MemberList';

import './styles.scss';

const ChatPage = () => {

  const [name, setName] = useState(null);
  const [color, setColor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selfUser, setSelfUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [chatEvents, setChatEvents] = useState([]);
  const [signInErrors, setSignInErrors] = useState([]);

  /*
    Helper functions
  */

  const handleChangeNewMessage = event => {
    event.preventDefault();
    event.stopPropagation();
    setNewMessage(event.target.value);
  };

  const handleChangeName = event => {
    event.preventDefault();
    event.stopPropagation();
    setName(event.target.value);
  };

  const handleChangeColor = (color, event) => {
    event.preventDefault();
    event.stopPropagation();
    setColor(color.hex);
  };

  const validateSignInInfo = () => {
    const errors = [];
    if (!name) {
      errors.push("Please select a name.");
    }
    const otherUserNames = otherUsers.map(({ name }) => name);
    if (otherUserNames.indexOf(name) > -1) {
      errors.push("Name already taken.");
    }
    if (!color) {
      errors.push("Please select a color.");
    }

    return { validity: !errors.length, errors };
  };

  const signIn = () => {
    const { validity, errors } = validateSignInInfo();
    if (!validity) {
      setSignInErrors(errors);
      return;
    }
    setSignInErrors([]);

    // TODO: publish new user event
    // TODO: only set self user once user created on server
    setSelfUser({ name, color });
  };

  /*
    Renderers
  */

  const getChatView = () => {
    const chatMembers = Array.from(otherUsers);
    if (selfUser) {
      chatMembers.push({
        ...selfUser,
        isSelf: true
      });
    }

    const memberOrMembersText = chatMembers.length === 1 ? '' : 's';

    return (
      <div className="chat-view">
        <div className="chat-section-container">
          <div className="flex-container">
            <h1>Chat - {chatMembers.length} member{memberOrMembersText}</h1>
            <ChatEvents data={chatEvents} />
            <ChatMessageCompose message={newMessage} handleChangeMessage={handleChangeNewMessage} />
          </div>
        </div>
        <div className="member-list-container">
          <MemberList data={chatMembers} />
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
          <input
            className="name-input"
            type="text"
            onChange={handleChangeName}
          />
          <span className="input-label">Pick your color:</span>
          <div className="circle-picker-container">
            <CirclePicker
              width={"400px"}
              onChangeComplete={handleChangeColor}
            />
          </div>
          <div>
            <button
              className="chat-enter-button"
              type="button"
              onClick={signIn}
            >
              Enter Chat
            </button>
          </div>
          {signInErrors.length ? (
            signInErrors.map((errorMessage, index) => {
              return (
                <div key={`error-${index}`}>
                  <span style={{ color: "red" }}>{errorMessage}</span>
                </div>
              );
            })
          ) : (<></>)}
        </div>
      </div>
    );
  };

  return (
    <div className="chat-page">
      {selfUser ? getChatView() : getSignInView()}
    </div>
  );
};

export default ChatPage;