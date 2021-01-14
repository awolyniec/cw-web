import store from './store';
import * as userActions from './users/actions';
import * as chatEventActions from './chatevents/actions'; 

export function resetChat() {
  store.dispatch(userActions.setOtherUsers([]));
  store.dispatch(userActions.setRequestedSelfUser(null));
  store.dispatch(userActions.setSelfUser(null));
  store.dispatch(chatEventActions.setChatEvents([]));
  store.dispatch(userActions.setUserToColor({}));
}