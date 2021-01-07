import { Provider } from 'react-redux';

import { ChatPage } from './components/ChatPage';
import store from './redux/store';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ChatPage />
      </Provider>
    </div>
  );
}

export default App;
