import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {selectMenuItem, deleteRow, addRow, fetchData} from './../actions';

import Table from './../components/table';
import {Menu} from './../components/menu';
import {Edit} from './../components/edit';

import './../scss/index.scss';

class App extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  save = () => window.open('/api/export/');

  importFile = () => {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd';
    inp.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && window.FileReader) {
        const fr = new window.FileReader();
        fr.onload = (ev) => {
          axios.post('/api/import/', {
            data: ev.target.result
          }).then(() => {
            this.props.dispatch(selectMenuItem(0));
            this.props.dispatch(fetchData());
          });
        };
        fr.readAsText(file);
      }
    });
    inp.click();
  };

  render() {
    const {dispatch, data, selectedMenu} = this.props;

    return (
      <Menu
        selected={selectedMenu}
        onChange={(val) => dispatch(selectMenuItem(val))}
        items={[
          {
            title: {
              label: 'Таблица',
              icon: (
                <svg viewBox="0 0 1000 1000">
                  <path d="M988.9,98.7c-2.6-31.5-28.1-58.1-60.1-58.1H71.2c-32,0-57.5,26.5-60.2,58.1h-1v799.4c0,33.8,27.4,61.2,61.2,61.2h857.5c33.8,0,61.2-27.4,61.2-61.2V98.7H988.9z M316.2,898.1h-245V714.4h245V898.1z M316.2,658.2h-245V469.4h245V658.2z M316.2,408.1h-245V224.4h245V408.1z M622.5,898.1h-245V714.4h245V898.1z M622.5,658.2h-245V469.4h245V658.2z M622.5,408.1h-245V224.4h245V408.1z M928.8,898.1h-245V714.4h245V898.1z M928.8,658.2h-245V469.4h245V658.2z M928.8,408.1h-245V224.4h245V408.1z"/>
                </svg>
              )},
            component: (
              <Table data={data} onDeleteRow={(index) => dispatch(deleteRow(index))}/>
            )
          },
          {
            title: {label: 'Ввод',
              icon: (
                <svg viewBox="0 0 1000 1000">
                  <path d="M836.9,429.1c-17.6,0-30.6,14.3-30.6,31.9v390.8c0,42-32.5,77.7-74.4,77.7H162c-41.9,0-90.7-35.7-90.7-77.7V280c0-42.1,48.8-86.9,90.7-86.9h325.7c17.6,0,31.9-13.1,31.9-30.7c0-17.7-14.2-30.7-31.9-30.7H162c-83.8,0-152,64.1-152,148.2v571.8c0,84.1,68.2,139.1,152,139.1h569.9c83.8,0,135.7-55,135.7-139.1V461.1C867.5,443.4,854.5,429.1,836.9,429.1L836.9,429.1z M962.4,82.6l-46.7-46.8c-35.5-35.6-97.9-35.6-133.4,0l-88.2,103.8L224.4,590.2v11l-0.4,1.9l-59.1,200.7l43.4,38.8l189.6-67l2.4,0.5h9.3l449.3-471.3l103.5-84.7C999.2,183.3,999.2,119.5,962.4,82.6L962.4,82.6z M248.4,759.7l27.6-88.1l55.1,55.3L248.4,759.7L248.4,759.7z M387.2,694L306,612.6l420-418.7l78.6,78.8L387.2,694L387.2,694z M918,171.8l-62.6,62.7l-91.1-91.4l62.6-62.7c5.9-5.9,13.8-9.2,22.2-9.2c8.4,0,16.3,3.3,22.2,9.2l46.6,46.8C930.2,139.5,930.2,159.5,918,171.8z"/>
                </svg>
              )},
            component: (
              <Edit
                {...this.props}
                onChange={(val) => {
                  dispatch(addRow(val));
                  dispatch(selectMenuItem(0));
                }}
              />
            )
          },
          {
            title: {
              label: 'Импорт',
              icon: (
                <svg viewBox="0 0 1000 1000">
                  <path d="M332.6,410.2H172l243,243l243-243H500.8C509.6,71.7,202,34,10,211.6C140.3,139.6,339.2,127.5,332.6,410.2z"/>
                  <path d="M925.2,73.8H401c26.9,13.9,51.2,31.9,72.4,53.7C501.2,156,532,200,550.6,264.9h368.2v584.2H128.3V264.9h105.5c-1.7-2.2-3.5-4.2-5.4-6.1c-15.7-16.1-37.4-23.9-66.2-23.9c-31.4,0-69,9.9-105.2,27.5v598.9c0,35.8,29,64.8,64.8,64.8h803.3c35.8,0,64.8-29,64.8-64.8V138.6C990,102.8,961,73.8,925.2,73.8z"/>
                </svg>
              )},
            onClick: this.importFile
          },
          {
            title: {
              label: 'Экспорт',
              icon: (
                <svg viewBox="0 0 1000 1000">
                  <path d="M849,639v139.3H151V639H10v280.2h25.9H151H849h49.4H990l0-280.2H849L849,639z M362.4,716.2h276.9l0-355.8h141.5L501.1,80.7L221.3,360.4h141.1L362.4,716.2L362.4,716.2z"/>
                </svg>
              )},
            onClick: this.save
          }
        ]}
      />
    );
  }
}

export default connect((state) => state)(App);
