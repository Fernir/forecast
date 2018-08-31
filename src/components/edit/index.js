import React, {Fragment, PureComponent} from 'react';
import {formatDate, titles} from '../../common';

import './edit.scss';

export class Edit extends PureComponent {
  onChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  };

  save = () => {
    if (this.props.onChange) {
      this.props.onChange(
        this.inputs.map((input) => input.value),
      );
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
          <button className="input-button" onClick={this.save}>Сохранить</button>
        </div>
      </Fragment>
    );
  }
}
