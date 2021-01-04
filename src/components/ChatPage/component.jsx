import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

import { ChatEvents } from '../ChatEvents';
import { ChatMessageCompose } from '../ChatMessageCompose';
import { MemberList } from '../MemberList';

import './styles.scss';

/*
  TODO: WebSocket stuff
  - Load initial users
  - Load initial messages
  - Load new user
    - Don't let it be the same as self user
  - Load new message
  - Remove user
  - Sign in
  - Sign out
  - Restart (the back-end will have an in-memory data store for now; if it crashes, the user list will be lost)
    - Reset name, color, self user, other users, chat events, and sign-in errors
*/
const ChatPage = () => {

  const [name, setName] = useState(null);
  const [color, setColor] = useState(null);
  const [selfUser, setSelfUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [chatEvents, setChatEvents] = useState([]);
  const [signInErrors, setSignInErrors] = useState([]);

  /*
    Helper functions
  */

  const handleChangeName = (event) => {
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
      },
      {
        type: "message",
        name: "Big Chungus",
        color: "#11ddcc",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "message",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "message",
        name: "Big Chungus",
        color: "#11ddcc",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "message",
        name: "Big Chungus",
        color: "#11ddcc",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "message",
        name: "Big Chungus",
        color: "#11ddcc",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        type: "message",
        name: "Big Chungus",
        color: "#11ddcc",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    ];

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
            <ChatMessageCompose />
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