import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Store from './store';

dotenv.config();

Store.init().then((store) => {
  // eslint-disable-next-line react/jsx-filename-extension
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
  registerServiceWorker();
});
