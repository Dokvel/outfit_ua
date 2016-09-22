/**
 * Created by alex on 14.09.16.
 */

import React, { Component, PropTypes } from 'react';
import styles from './Header.css';

class Header extends Component {

  render() {
    const languageNodes = this.props.intl.enabledLanguages.map(
      lang => <li key={lang} onClick={() => this.props.switchLanguage(lang)}
                  className={lang === this.props.intl.locale ? styles.selected : ''}>{lang}</li>
    );

    return (
      <div>
        <div>

        </div>
        <div>
          <div className={styles['language-switcher']}>
            <ul>
              {languageNodes}
            </ul>
          </div>
        </div>
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
