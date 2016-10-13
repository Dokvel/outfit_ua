/**
 * Created by alex on 14.09.16.
 */

import React, { Component, PropTypes } from 'react';
import styles from './Header.css';
import { FormattedMessage } from 'react-intl';
import CartWidget from '../../modules/Cart/components/CartWidget/CartWidget'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class Header extends Component {
  constructor(props) {
    super(props)
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
          <div onClick={this.handleClick}><FormattedMessage id="cart"/> {this.props.cartProductsCount}</div>
        </div>
        <div>
          <div className={styles['language-switcher']}>
            <ul>
              {languageNodes}
            </ul>
          </div>
        </div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <CartWidget/>
            </ModalDialog>
          </ModalContainer>
        }
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
