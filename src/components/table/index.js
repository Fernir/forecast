import React, {Component, Fragment} from 'react';
import {observer} from 'mobx-react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import axios from 'axios';

import {CloseButton} from './../../components/close';
import {titles} from '../../global/titles';


import './table.scss';

@observer
export class Table extends Component {
  state = {
    chart: false
  };

  getCellValue = (cell) => (cell.match(/\//) ? (new Date(cell)).getTime() : parseFloat(cell));

  chart = (index) => this.setState({chart: index || null});

  save = () => {
    const {forecastData: {data} = {}} = this.props;

    axios.post('/api/save/', {
      data
    });
  };

  render() {
    const {forecastData: {data} = {}} = this.props;

    const toGraph = data.slice().map((row) => {
      const newRow = {};
      titles.forEach((title, index) => {
        Object.assign(newRow, {[`${title}`]: title === 'Дата' ? row[index].replace(/\//gi, '.') : this.getCellValue(row[index])});
      });
      return newRow;
    });

    return (
      <Fragment>
        <table className="tbl" ref={(node) => { this.table = node; }}>
          <tbody>
            <tr>
              {titles.map((title, index) => (
                <th
                  key={title}
                  onClick={() => this.chart(index)}
                  {...(index === titles.length - 1 && ({colSpan: 2}))}
                >
                  {title}
                </th>
              ))}
            </tr>
            {data.map((tr, trIndex) => (
              <tr
                key={`tr-${trIndex}`}
              >
                {tr.map((td) => (
                  <td
                    key={td}
                  >
                    {td}
                  </td>
                ))}
                <td style={{width: '1%', padding: 5}}>
                  <button className="input-button input-button--small" onClick={() => { data.splice(trIndex, 1); this.save(); }}>&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.chart && (
          <div className="chart" onClick={() => this.setState({chart: null})}>
            <div className="chart-container" onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={() => this.setState({chart: null})}>&times;</CloseButton>
              <LineChart
                animationDuration={0}
                width={this.table ? this.table.offsetWidth - 46 : 500}
                height={300}
                data={toGraph}
              >
                <Legend verticalAlign="top" height={36}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="Дата"/>
                <YAxis/>
                <Line type="linear" dot={false} dataKey={titles[this.state.chart]} stroke="#00aad8"/>
                <Tooltip/>
              </LineChart>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
