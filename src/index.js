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

  save = () => {
    axios.post('/api/save/', {
      data: forecastData.data
    }).then(() => this.setState({selected: 0}));
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
              title: 'Сохранить',
              onClick: this.save
            }
          ]}
        />
      </Fragment>
    );
  }
}


render(<Main/>, document.querySelector('.js-forecast'));
