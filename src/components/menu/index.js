import React, {Fragment, PureComponent} from 'react';
import cn from 'classnames';
import {Hamburger} from './../../components';

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
      this.closeMenu();
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
        <div className={cn('menu-back', {'menu-back--open': open})} onClick={this.closeMenu}/>
        <Hamburger onClick={open ? this.closeMenu : this.openMenu} open={open}/>
        <div className={cn('menu', {'menu--open': open})}>
          {items.map((item, index) => (
            <div
              className="menu-item"
              key={`menu-item-${index}`}
              onClick={() => this.handleMenuClick(items, index)}
              {...(item.title.icon && ({title: item.title.label}))}
            >
              {item.title.icon || item.title}
            </div>
          ))}
        </div>
        {this.isItemExists(items, selected) && (
          <div className="container">
            {typeof items[selected].title === 'string' ? (
              <h2 style={{textAlign: 'center'}}>{items[selected].title}</h2>
            ) : (
              <Fragment>
                <h2 style={{textAlign: 'center'}}>{items[selected].title.label}</h2>
              </Fragment>
            )}
            {items[selected].component}
          </div>
        )}
      </Fragment>
    );
  }
}
