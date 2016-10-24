import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProductsCount } from '../Cart/CartReducer';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from '../../components/Header/Header';
import Footer from './components/Footer/Footer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import Actions
import { toggleAddPost } from './AppActions';
import { fetchCategories } from '../Category/CategoryActions';
import { restoreCartFromCache } from '../Cart/CartActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.dispatch(restoreCartFromCache());
    this.props.dispatch(fetchCategories());
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {/*this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />*/}
          <div className={styles.container}>
            <Helmet
              title="outfit_ua - catalog"
              titleTemplate="%s - outfit_ua - catalog"
              meta={[
                { charset: 'utf-8' },
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
                },
              ]}
            />
            <Header
              switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
              intl={this.props.intl}
              cartProductsCount={this.props.cartProductsCount}
            />
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.need = [() => {
  return fetchCategories();
}];

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  let cartProductsCount = getProductsCount(store)
  return {
    intl: store.intl,
    cartProductsCount
  };
}

export default connect(mapStateToProps)(App);
