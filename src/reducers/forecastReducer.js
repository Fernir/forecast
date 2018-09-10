import {combineReducers} from 'redux';
import axios from 'axios';

import {ADD_ROW, CHART_CLOSE, CHART_OPEN, DELETE_ROW, FETCH_DATA, SELECT_MENU_ITEM} from './../actions';

const selectedMenu = (state = 0, action) => {
  switch (action.type) {
    case SELECT_MENU_ITEM:
      return action.index;
    default:
      return state;
  }
};

const chartState = (state = null, action) => {
  switch (action.type) {
    case CHART_CLOSE:
      return null;
    case CHART_OPEN:
      return action.index;
    default:
      return state;
  }
};

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
    default:
      return state || [];
  }

  return state;
};

export const forecastReducer = combineReducers({
  data,
  selectedMenu,
  chartState
});
