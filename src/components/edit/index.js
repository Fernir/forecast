import React, {Fragment, PureComponent} from 'react';
import {titles} from '../../global/titles';
import {formatDate} from '../../global/dateFormat';

import './edit.scss';

export class Edit extends PureComponent {
  onChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  };

  save = (callback) => {
    const {forecastData: {data} = {}} = this.props;

    data.push(this.inputs.map((input) => input.value));
    if (callback) {
      callback();
    }
  };

  inputs = [];

  render() {
    return (
      <Fragment>
        <table className="tbl">
          <tbody>
            <tr>
              {titles.map((title) => <th key={`edit-${title}`}>{title}</th>)}
            </tr>
            <tr>
              {titles.map((title, index) => (
                <td
                  className="tbl-nopad"
                  key={`edit-${index}`}
                >
                  <input
                    ref={(node) => this.inputs.push(node)}
                    className="input"
                    type="text"
                    {...(index === 0 && ({
                      value: formatDate(new Date()),
                      readOnly: true
                    }))}
                    defaultValue={0}
                    onChange={this.onChange}
                    name={index}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="input-holder">
          <button className="input-button" onClick={() => this.save(this.props.callback)}>Сохранить</button>
        </div>
      </Fragment>
    );
  }
}
