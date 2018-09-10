import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import {Hamburger} from './../../components';

import {selectMenuItem} from './../../actions';

import './menu.scss';

class Menu extends PureComponent {
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

  openMenu = () => this.setState({open: true});
  closeMenu = () => this.setState({open: false});

  handleMenuClick = (items, index) => {
    if (items[index].onClick) {
      items[index].onClick();
      this.closeMenu();
      return;
    }

    this.closeMenu();
    this.props.dispatch(selectMenuItem(index));
  };

  isItemExists = (items, selected) => (items[selected] && items[selected].component);

  render() {
    const {items, selectedMenu: selected = 0} = this.props;
    const {open} = this.state;

    return (
      <Fragment>
        <div className={cn('menu-back', {'menu-back--open': open})} onClick={this.closeMenu}/>
        <Hamburger
          onClick={open ? this.closeMenu : this.openMenu}
          open={open}
        />
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

export default connect((state) => state)(Menu);
