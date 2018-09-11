import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {titles} from '../../common';
import {Chart} from './../../components';

import {chartOpen, deleteRow, fetchData} from './../../actions';

import './table.scss';

class Table extends PureComponent {
  state = {
    showValue: null
  };

  componentWillUnmount() {
    window.addEventListener('resize', null);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        this.setState({showValue: null});
      } else if (!this.state.showValue) {
        this.setState({showValue: 1});
      }
    });

    if (window.innerWidth > 700) {
      this.setState({showValue: null});
    } else if (!this.state.showValue) {
      this.setState({showValue: 1});
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    const {data = []} = this.props;

    return (
      <Fragment>
        <div className="select">
          <label htmlFor="select">
            Отобразить
          </label>
          <select id="select" className="select-checkbox" onChange={(e) => this.setState({showValue: e.target.value})}>
            {titles
              .filter((t, tIndex) => tIndex > 0)
              .map((title, index) => (
                <option key={`select-${index}`} value={index + 1}>{title}</option>
              ))}
          </select>
        </div>
        <table className="tbl" ref={(node) => { this.table = node; }}>
          <tbody>
            <tr>
              {titles
                .filter((tr, trIndex) => !this.state.showValue || trIndex === 0 || trIndex === Number(this.state.showValue))
                .map((title, index) => (
                  <th
                    key={title}
                    onClick={() => this.props.dispatch(chartOpen(index))}
                  >
                    {title}
                  </th>
                ))}
            </tr>
            {data.map((tr, trIndex) => (
              <tr key={`tr-${trIndex + 1}`}>
                {tr
                  .filter((td, tdIndex) => !this.state.showValue || tdIndex === 0 || tdIndex === Number(this.state.showValue))
                  .map((td, tdIndex, arr) => (
                    <td key={`${trIndex}-${tdIndex}-${td}`}>
                      {tdIndex === arr.length - 1 ? (
                        <div className="tbl-last">
                          <div className="tbl-last-text">{td}</div>
                          <div className="tbl-last-button">
                            <button
                              className="input-button input-button--small"
                              onClick={() => this.props.dispatch(deleteRow(trIndex))}
                            >&times;</button>
                          </div>
                        </div>
                      ) : td}
                    </td>
                  ))}
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
