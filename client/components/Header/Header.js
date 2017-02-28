/**
 * Created by alex on 14.09.16.
 */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import CartWidget from '../../modules/Cart/components/CartWidget/CartWidget';
import { Link } from 'react-router';
import groups from '../../../common/data/groups';

import { Nav, Container, NavItem, NavGroup, Button, NavToggle, Modal } from 're-bulma';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingModal: false }
  }

  handleClick = () => this.setState({ isShowingModal: true });

  handleClose = () => this.setState({ isShowingModal: false });

  render() {
    const languageNodes = this.props.intl.enabledLanguages.map(
      lang => <NavItem key={lang} onClick={() => this.props.switchLanguage(lang)}
                       isActive={lang === this.props.intl.locale}>{lang}</NavItem>);

    return (
      <Nav hasShadow={true}>
        <Container>
          <NavGroup align="left">
            <NavItem>
              <img src="logo.png" alt="Logo"/>
            </NavItem>
          </NavGroup>
          <NavToggle />
          <NavGroup align="center">
            { languageNodes }
          </NavGroup>
          <NavGroup align="right" isMenu>
            <NavItem key="add_products">
              <Link to="/products/new"><Button>Новый продукт</Button></Link>
            </NavItem>
            <NavItem key="all_products">
              <Link to={`/products`}><FormattedMessage id={`groups.all`}/></Link >
            </NavItem>
            {
              groups.map(group => (
                <NavItem key={ group.key}>
                  <Link to={`/products/group/${group.key}`}>
                    <FormattedMessage id={`groups.${group.key}`}/>
                  </Link>
                </NavItem>
              ))
            }
            <NavItem key="sale">
              <Link to={`/products/group/sale`}><FormattedMessage id={`groups.sale`}/></Link>
            </NavItem>
            <NavItem key="cart">
              <Button icon="fa fa-shopping-cart" color="isPrimary" onClick={ this.handleClick }>
                {`${this.props.intl.messages.cart} ${this.props.cartProductsCount}`}
              </Button>
            </NavItem>
          </NavGroup>
        </Container>
        <Modal
          type="card"
          headerContent={this.props.intl.messages.cart}
          isActive={ this.state.isShowingModal}
          onCloseRequest={this.handleClose}>
          <CartWidget/>
        </Modal>
      </Nav>
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
