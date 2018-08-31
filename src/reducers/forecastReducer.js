import {combineReducers} from 'redux';
import axios from 'axios';

import {FETCH_DATA, SELECT_MENU_ITEM, DELETE_ROW, ADD_ROW} from './../actions';

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.data;
    case DELETE_ROW:
      state = state.filter((itm, index) => index !== action.index);
      axios.post('/api/save/', {data: state});
      break;
    case ADD_ROW:
      state.push(action.data);
      axios.post('/api/save/', {data: state});
      break;
  }
  return state;
};

const selectedMenu = (state = 0, action) => {
  switch (action.type) {
    case SELECT_MENU_ITEM:
      return action.index;
    default:
      return state;
  }
};

export const forecastReducer = combineReducers({
  data,
  selectedMenu
});
