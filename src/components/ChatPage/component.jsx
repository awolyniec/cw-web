import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CirclePicker } from 'react-color';

import * as websocketActions from '../../redux/websockets/actions';
import * as userActions from '../../redux/users/actions';
import * as userSelectors from '../../redux/users/selectors';
import { ChatEvents } from '../ChatEvents';
import { ChatMessageCompose } from '../ChatMessageCompose';
import { MemberList } from '../MemberList';

import './styles.scss';

const ChatPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [color, setColor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selfUser, setSelfUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [chatEvents, setChatEvents] = useState([]);
  const [signInErrors, setSignInErrors] = useState([]);
  const requestedSelfUser = useSelector(userSelectors.selectRequestedSelfUser);

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

    const user = { name, color };
    dispatch(userActions.setRequestedSelfUser(user));
    dispatch(websocketActions.connectAndEnterChat(user));
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
              disabled={requestedSelfUser}
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