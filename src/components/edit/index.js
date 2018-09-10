import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {addRow, selectMenuItem} from './../../actions';
import {formatDate, titles} from '../../common';

import './edit.scss';

export class Edit extends PureComponent {
  onChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  };

  save = () => {
    this.props.dispatch(addRow(this.inputs.map((input) => input.value)));
    this.props.dispatch(selectMenuItem(0));
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
                    {...(index === 0 ? ({
                      defaultValue: formatDate(new Date()),
                      readOnly: true
                    }) : ({
                      defaultValue: 0
                    }))}
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

export default connect((state) => state)(Edit);
