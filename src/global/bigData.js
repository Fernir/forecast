import {observable} from 'mobx';
import axios from 'axios';

class BigData {
  @observable data = [];

  constructor() {
    axios.get('/api/read/').then(({data = {}}) => {
      if (data && data.length) {
        this.data = data;
      }
    });
  }

  update = () => this.constructor();
}

const forecastData = new BigData();

module.exports = {
  forecastData
};
