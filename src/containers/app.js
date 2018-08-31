import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {selectMenuItem, deleteRow, addRow} from './../actions';

import Table from './../components/table';
import {Menu} from './../components/menu';
import {Edit} from './../components/edit';

import './../scss/index.scss';

class App extends PureComponent {
  save = () => window.open('/api/export/');

  open = () => {
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
          }).then(() => forecastData.update());
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
            title: 'Таблица',
            component: (
              <Table data={data} onDeleteRow={(index) => dispatch(deleteRow(index))}/>
            )
          },
          {
            title: 'Ввод',
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
            title: 'Импорт',
            onClick: this.open
          },
          {
            title: 'Экспорт',
            onClick: this.save
          }
        ]}
      />
    );
  }
}

export default connect((state) => state)(App);
