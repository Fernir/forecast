import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {titles} from '../../common';
import {Chart} from './../../components';

import {chartOpen, deleteRow, fetchData} from './../../actions';

import './table.scss';

class Table extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    const {data = []} = this.props;

    return (
      <Fragment>
        <table className="tbl" ref={(node) => { this.table = node; }}>
          <tbody>
            <tr>
              {titles.map((title, index) => (
                <th
                  key={title}
                  onClick={() => this.props.dispatch(chartOpen(index))}
                  {...(index === titles.length - 1 && ({colSpan: 2}))}
                >
                  {title}
                </th>
              ))}
            </tr>
            {data.map((tr, trIndex) => (
              <tr key={`tr-${trIndex + 1}`}>
                {tr.map((td, tdIndex) => (
                  <td key={`${trIndex}-${tdIndex}-${td}`}>
                    {td}
                  </td>
                ))}
                <td style={{width: '1%', padding: 5}}>
                  <button
                    className="input-button input-button--small"
                    onClick={() => this.props.dispatch(deleteRow(trIndex))}
                  >&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Chart tableElement={this.table}/>
      </Fragment>
    );
  }
}

export default connect(({data}) => ({data}))(Table);
