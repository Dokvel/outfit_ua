/**
 * Created by alex on 15.09.16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';

class ProductListPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}></div>
        <div className={styles.products}>
          {
            this.props.products.map(product=>(
              <div className={styles.product}>
                <ProductListItem key={product.cuid} {...product}/>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    products: getProducts(state),
  };
}

export default connect(mapStateToProps)(ProductListPage);
;
