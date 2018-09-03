import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import App from './containers/app';
import {forecastReducer} from './reducers/forecastReducer';

import './scss/index.scss';

const store = createStore(
  forecastReducer,
  applyMiddleware(thunk)
);

render(<Provider store={store}>
  <App/>
</Provider>, document.querySelector('.js-forecast'));
