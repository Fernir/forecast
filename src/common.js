import axios from 'axios';
import {fetchData, selectMenuItem} from './actions';

export const titles = ['Дата', 'Выручка', 'серебро, руб.', 'Индекс ММВБ Last'];

export const formatDate = (date) => `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${(date.getFullYear() % 100) < 10 ? `0${date.getFullYear() % 100}` : date.getFullYear() % 100}`;

export const importFile = () => (dispatch) => {
  const inputFile = document.createElement('input');

  Object.assign(inputFile, {
    type: 'file',
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd'
  });

  inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && window.FileReader) {
      const fr = new window.FileReader();
      if (fr) {
        fr.onload = (ev) => {
          axios.post('/api/import/', {
            data: ev.target.result
          }).then(() => {
            dispatch(selectMenuItem(0));
            dispatch(fetchData());
          });
        };
        fr.readAsText(file);
      }
    }
  });

  inputFile.click();
};
