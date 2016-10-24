/**
 * Created by alex on 14.09.16.
 */

import React, { Component, PropTypes } from 'react';
import styles from './Header.css';
import { FormattedMessage } from 'react-intl';
import CartWidget from '../../modules/Cart/components/CartWidget/CartWidget';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import groups from '../../../common/data/groups';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingModal: false }
  }

  handleClick = () => this.setState({ isShowingModal: true });

  handleClose = () => this.setState({ isShowingModal: false });

  render() {
    const languageNodes = this.props.intl.enabledLanguages.map(
      lang => <li key={lang} onClick={() => this.props.switchLanguage(lang)}
                  className={lang === this.props.intl.locale ? styles.selected : ''}>{lang}</li>
    );

    return (
      <div>
        <div>
          <FlatButton
            label={`${this.props.intl.messages.cart} ${this.props.cartProductsCount}`}
            onClick={this.handleClick} primary={true}
            icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
          />
          <Link to="/products/new">Новый продукт</Link>
          <div className={styles['language-switcher']}>
            <ul>
              {languageNodes}
            </ul>
          </div>
        </div>
        <div className={styles.groups}>
          {
            groups.map(group => (
              <Link to={`/products/group/${group.key}`}><FormattedMessage id={`groups.${group.key}`}/></Link>
            ))
          }
          <Link to={`/products/sale`}><FormattedMessage id={`groups.sale`}/></Link>
        </div>
        <Dialog
          title={this.props.intl.messages.cart}
          actions={[]}
          modal={false}
          open={this.state.isShowingModal}
          onRequestClose={this.handleClose}>
          <CartWidget/>
        </Dialog>
      </div>
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
