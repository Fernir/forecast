import React, {Fragment, PureComponent} from 'react';
import cn from 'classnames';
import {CloseButton} from './../../components/close';

import './menu.scss';

export class Menu extends PureComponent {
  state = {
    open: false
  };

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.closeMenu();
      }
    });
  }

  onChange = (val) => {
    this.closeMenu();
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  };

  openMenu = () => this.setState({open: true});
  closeMenu = () => this.setState({open: false});

  handleMenuClick = (items, index) => {
    if (items[index].onClick) {
      items[index].onClick();
      return;
    }
    this.onChange(index);
  };

  isItemExists = (items, selected) => (items[selected] && items[selected].component);

  render() {
    const {items, selected} = this.props;
    const {open} = this.state;

    return (
      <Fragment>
        <div className={cn('menu-back', {'menu-back--open': open})} onClick={this.closeMenu}>
          <div className={cn('menu', {'menu--open': open})}>
            <CloseButton onClick={this.closeMenu}/>
            {items.map((item, index) => (
              <div
                className="menu-item"
                key={item.title}
                onClick={() => this.handleMenuClick(items, index)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className={cn('menu-hamburger', {'menu-hamburger--visible': !open})} onClick={this.openMenu}>Меню</div>
        {this.isItemExists(items, selected) && (
          <div className="container">
            <h2 style={{textAlign: 'center'}}>{items[selected].title}</h2>
            {items[selected].component}
          </div>
        )}
      </Fragment>
    );
  }
}
