import React, {Component, Fragment} from 'react';
import {titles} from '../../common';
import {Chart} from './../../components';


import './table.scss';

export class Table extends Component {
  state = {
    chart: false
  };

  chart = (index) => this.setState({chart: index || null});

  render() {
    const {data} = this.props;

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
                  <button className="input-button input-button--small" onClick={() => this.props.onDeleteRow(trIndex)}>&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Chart
          tableElement={this.table}
          data={data}
          chart={this.state.chart}
          onClose={() => this.setState({chart: null})}
        />
      </Fragment>
    );
  }
}
