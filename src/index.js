import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import axios from 'axios';
import {FETCH_DATA} from './actions';

import App from './containers/app';
import {forecastReducer} from './reducers/forecastReducer';

import './scss/index.scss';

const store = createStore(
  forecastReducer,
  applyMiddleware(thunk)
);

store.dispatch((
  () => (dispatch) => axios.get('/api/read/').then(({data = {}}) => dispatch({type: FETCH_DATA, data}))
)());

render(<Provider store={store}>
  <App/>
</Provider>, document.querySelector('.js-forecast'));
