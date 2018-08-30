import React, {Fragment, PureComponent} from 'react';
import cn from 'classnames';
import {CloseButton} from './../../components/close';

import './menu.scss';

export class LeftMenu extends PureComponent {
  state = {
    open: false
  };

  closeMenu = () => this.setState({open: false});

  onChange = (val) => {
    this.closeMenu();
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  };

  render() {
    const {items, selected} = this.props;
    const {open} = this.state;

    return (
      <Fragment>
        <div className={cn('menu-back', {'menu-back--open': open})} onClick={this.closeMenu}>
          <div className={cn('menu', {'menu--open': open})}>
            <CloseButton onClick={this.closeMenu}>&times;</CloseButton>
            {items.map((item, index) => (
              <div
                className="menu-item"
                key={item.title}
                onClick={() => {
                  if (items[index].onClick) {
                    items[index].onClick();
                    return;
                  }
                  this.onChange(index);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className={cn('menu-hamburger', {'menu-hamburger--visible': !open})} onClick={() => this.setState({open: true})}>Меню</div>
        {items[selected].component && (
          <div className="container">
            <h2 style={{textAlign: 'center'}}>{items[selected].title}</h2>
            {items[selected].component}
          </div>
        )}
      </Fragment>
    );
  }
}
