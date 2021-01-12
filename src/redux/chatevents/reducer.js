import types from './types';

const INITIAL_STATE = {
  allEvents: [],
  messagesStillSending: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CHAT_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      };
    case types.ADD_CHAT_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.concat([action.payload])
      };
    case types.ADD_MESSAGE_STILL_SENDING:
      return {
        ...state,
        messagesStillSending: state.messagesStillSending.concat([action.payload])
      };
    case types.REMOVE_MESSAGE_STILL_SENDING:
      const messageToRemoveIndex = state.messagesStillSending.findIndex(
        ({ data: { sentAt } }) => sentAt.valueOf() === action.payload.valueOf()
      );
      if (messageToRemoveIndex < 0) {
        return state;
      }
      const newMessagesStillSending = Array.from(state.messagesStillSending);
      newMessagesStillSending.splice(messageToRemoveIndex, 1);
      return {
        ...state,
        messagesStillSending: newMessagesStillSending
      };
    default:
      return state;
  }
};

export default reducer;
