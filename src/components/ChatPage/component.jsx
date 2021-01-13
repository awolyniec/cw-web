import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CirclePicker } from 'react-color';

import * as chatEventActions from '../../redux/chatevents/actions';
import * as websocketActions from '../../redux/websockets/actions';
import * as userActions from '../../redux/users/actions';
import * as signInActions from '../../redux/signin/actions';
import * as userSelectors from '../../redux/users/selectors';
import * as chatEventSelectors from '../../redux/chatevents/selectors';
import * as signInSelectors from '../../redux/signin/selectors';
import { ChatEvents } from '../ChatEvents';
import { ChatMessageCompose } from '../ChatMessageCompose';
import { MemberList } from '../MemberList';

import './styles.scss';

const ChatPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [color, setColor] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [signInClientErrors, setSignInClientErrors] = useState([]);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const requestedSelfUser = useSelector(userSelectors.selectRequestedSelfUser);
  const selfUser = useSelector(userSelectors.selectSelfUser);
  const otherUsers = useSelector(userSelectors.selectOtherUsers);
  const chatEvents = useSelector(chatEventSelectors.selectAllEvents);
  const messagesStillSending = useSelector(chatEventSelectors.selectMessagesStillSending);
  const userToColor = useSelector(userSelectors.selectUserToColor);
  const signInServerError = useSelector(signInSelectors.selectSignInError);

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
    setName(name.trim());
    const { validity, errors } = validateSignInInfo();
    if (!validity) {
      setSignInClientErrors(errors);
      return;
    }
    setSignInClientErrors([]);

    const user = { name, color };
    dispatch(userActions.setRequestedSelfUser(user));
    dispatch(websocketActions.connectAndEnterChat(user));
    dispatch(signInActions.setSignInError(null));
    // TODO: remove name/color?
  };

  const sendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) {
      return;
    }

    setSendButtonDisabled(true);
    const message = {
      type: 'message',
      data: {
        user: selfUser.name,
        text: trimmedMessage,
        sentAt: new Date()
      }
    };
    dispatch(chatEventActions.addMessageStillSending(message));
    dispatch(websocketActions.sendMessage(JSON.stringify(message)));
    setNewMessage("");
    setSendButtonDisabled(false);
  };

  const getFormattedChatEvent = (chatEvent, isStillSending) => {
    const { type, data } = chatEvent;
    switch (type) {
      case 'userEnterChat':
        const { name } = data;
        return {
          type: 'announcement',
          text: `${name === selfUser.name ? 'You' : name} entered the chat.`,
        };
      case 'message':
        const { user, text } = data;
        return {
          type: 'message',
          name: user === selfUser.name ? "" : user,
          text,
          color: userToColor[user],
          isSending: isStillSending
        };
      default:
        return chatEvent;
    }
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

    const formattedChatEvents = chatEvents
      .map((chatEvent) => {
        return getFormattedChatEvent(chatEvent);
      })
      .concat(messagesStillSending.map((message) => {
        return getFormattedChatEvent(message, true);
      }));

    const memberOrMembersText = chatMembers.length === 1 ? '' : 's';

    return (
      <div className="chat-view">
        <div className="chat-section-container">
          <div className="flex-container">
            <h1>Chat - {chatMembers.length} member{memberOrMembersText}</h1>
            <ChatEvents data={formattedChatEvents} />
            <ChatMessageCompose
              message={newMessage}
              sendMessage={sendMessage}
              handleChangeMessage={handleChangeNewMessage}
              sendButtonDisabled={sendButtonDisabled}
            />
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
            <div className="chat-enter-button-sibling" />
          </div>
          {signInClientErrors.length ? (
            signInClientErrors.map((errorMessage, index) => {
              return (
                <div key={`error-${index}`}>
                  <span style={{ color: "red" }}>{errorMessage}</span>
                </div>
              );
            })
          ) : (<></>)}
        </div>
        {signInServerError && (
          <div className="error-div">
            {signInServerError}
          </div>
        )}
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