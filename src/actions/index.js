import axios from 'axios';

export const MENU_OPEN = 'MENU_OPEN';
export const MENU_CLOSE = 'MENU_CLOSE';
export const CHART_CLOSE = 'CHART_CLOSE';
export const CHART_OPEN = 'CHART_OPEN';
export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';
export const FETCH_DATA = 'FETCH_DATA';
export const DELETE_ROW = 'DELETE_ROW';
export const ADD_ROW = 'ADD_ROW';

export const menuOpen = () => ({type: MENU_OPEN});
export const menuClose = () => ({type: MENU_CLOSE});
export const chartOpen = (index) => ({type: CHART_OPEN, index});
export const chartClose = () => ({type: CHART_CLOSE});
export const selectMenuItem = (index) => ({type: SELECT_MENU_ITEM, index});
export const deleteRow = (index) => ({type: DELETE_ROW, index});
export const addRow = (data) => ({type: ADD_ROW, data});
export const fetchData = () => (dispatch) => axios.get('/api/read/').then(({data = {}}) => dispatch({type: FETCH_DATA, data}));

