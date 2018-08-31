import React, {Fragment, PureComponent} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

import {CloseButton} from './../../components/close';
import {titles} from '../../common';

import './chart.scss';

export default class Chart extends PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.onClose) {
        this.props.onClose();
      }
    });
  }

  getCellValue = (cell) => (cell.match(/\//) ? (new Date(cell)).getTime() : parseFloat(cell));

  graphData = (data = []) => data.slice().map((row) => {
    const newRow = {};
    titles.forEach((title, index) => Object.assign(newRow, {[`${title}`]: title === 'Дата' ? row[index].replace(/\//gi, '.') : this.getCellValue(row[index])}));
    return newRow;
  });

  render() {
    const {data, tableElement, chart, onClose} = this.props;

    return (
      <Fragment>
        {chart && (
          <div className="chart" onClick={onClose}>
            <div className="chart-container" onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={onClose}/>
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
                <Line type="linear" dot={false} dataKey={titles[chart || 0]} stroke="#00aad8"/>
                <Tooltip/>
              </LineChart>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
