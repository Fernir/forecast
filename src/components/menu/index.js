import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import {Hamburger} from './../../components';

import {menuClose, menuOpen, selectMenuItem} from './../../actions';

import './menu.scss';

class Menu extends PureComponent {
  handleMenuClick = (items, index) => {
    if (items[index].onClick) {
      this.props.dispatch(items[index].onClick);
      this.props.dispatch(menuClose());
      return;
    }

    this.props.dispatch(menuClose());
    this.props.dispatch(selectMenuItem(index));
  };

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.props.dispatch(menuClose());
      }
    });
  }

  isItemExists = (items, selected) => (items[selected] && items[selected].component);

  render() {
    const {items, selectedMenu: selected = 0, menuIsOpen} = this.props;

    return (
      <Fragment>
        <div
          className={cn('menu-back', {'menu-back--open': menuIsOpen})}
          onClick={() => this.props.dispatch(menuClose())}
        />
        <Hamburger
          onClick={() => this.props.dispatch(menuIsOpen ? menuClose() : menuOpen())}
          open={menuIsOpen}
        />
        <div className={cn('menu', {'menu--open': menuIsOpen})}>
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

export default connect(({menuIsOpen, selectedMenu}) => ({menuIsOpen, selectedMenu}))(Menu);
