import React, {Fragment, PureComponent} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

import {forecastData} from './global/bigData';
import {Table} from './components/table';
import {LeftMenu} from './components/menu';
import {Edit} from './components/edit';

import './scss/index.scss';


class Main extends PureComponent {
  state = {
    selected: 0
  };

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
    return (
      <Fragment>
        <LeftMenu
          selected={this.state.selected}
          onChange={(val) => this.setState({selected: val})}
          items={[
            {
              title: 'Таблица',
              component: <Table forecastData={forecastData}/>
            },
            {
              title: 'Ввод',
              component: <Edit forecastData={forecastData} callback={() => this.setState({selected: 0})}/>
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
      </Fragment>
    );
  }
}


render(<Main/>, document.querySelector('.js-forecast'));
