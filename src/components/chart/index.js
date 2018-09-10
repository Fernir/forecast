import React, {PureComponent} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {connect} from 'react-redux';
import cn from 'classnames';

import {chartClose} from './../../actions';

import {CloseButton} from './../../components';
import {titles} from '../../common';

import './chart.scss';

class Chart extends PureComponent {
  close = () => this.props.dispatch(chartClose());

  getCellValue = (cell) => (cell.match(/\//) ? (new Date(cell)).getTime() : parseFloat(cell));

  graphData = (data = []) => data.slice().map((row) => {
    const newRow = {};
    titles.forEach((title, index) => Object.assign(newRow, {[`${title}`]: title === 'Дата' ? row[index].replace(/\//gi, '.') : this.getCellValue(row[index])}));
    return newRow;
  });

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.props.dispatch(chartClose());
      }
    });
  }

  render() {
    const {data, tableElement, chartState} = this.props;

    return (
      <div className={cn('chart', {'chart--visible': chartState})} onClick={this.close}>
        <div className="chart-container" onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={this.close}/>
          <LineChart
            animationDuration={0}
            width={tableElement ? tableElement.offsetWidth - 46 : 500}
            height={300}
            data={this.graphData(data)}
          >
            <Legend verticalAlign="top" height={36}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="Дата"/>
            <YAxis/>
            <Line type="linear" dot={false} dataKey={titles[chartState || 0]} stroke="#00aad8"/>
            <Tooltip/>
          </LineChart>
        </div>
      </div>
    );
  }
}

export default connect((state) => state)(Chart);
