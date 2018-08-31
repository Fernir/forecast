export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';
export const FETCH_DATA = 'FETCH_DATA';
export const DELETE_ROW = 'DELETE_ROW';
export const ADD_ROW = 'ADD_ROW';

export const selectMenuItem = (index) => ({type: SELECT_MENU_ITEM, index});
export const deleteRow = (index) => ({type: DELETE_ROW, index});
export const addRow = (data) => ({type: ADD_ROW, data});
