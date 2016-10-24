/**
 * Created by alex on 09.10.16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getCart, getOrdersAmount } from '../../CartReducer';
import { getCategory } from '../../../Category/CategoryReducer';
import { removeFromCart } from '../../CartActions';
import { getProduct } from '../../../Product/ProductReducer'
import { FormattedMessage } from 'react-intl';
import { getProductFilesPath } from '../../../../util/productHelpers';
import styles from "./CartWidget.css";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';

class CartWidget extends Component {

  removeProductFromCart = (cuid)=> {
    this.props.dispatch(removeFromCart(cuid));
  }

  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn><FormattedMessage id="photo"/></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="productCategory"/></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="productPrice"/></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="count"/></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="actions"/></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.props.products.map(product => (
              <TableRow>
                <TableRowColumn>
                  <div className={styles.photo}>
                    <img src={`${getProductFilesPath(product)}/${product.photos[0].fileName}`}/>
                  </div>
                </TableRowColumn>
                <TableRowColumn>{product.code}</TableRowColumn>
                <TableRowColumn>{product.price} грн</TableRowColumn>
                <TableRowColumn>{this.props.cart[product.cuid].count}</TableRowColumn>
                <TableRowColumn>
                  <span onClick={this.removeProductFromCart.bind(null, product.cuid)}>Удалить</span></TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <div>Сумма заказа: {this.props.ordersAmount}</div>
        </TableFooter>
      </Table>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  let cart = getCart(state);
  let ordersAmount = getOrdersAmount(state);
  let products = Object.keys(cart).map(productCuid => {
    let product = getProduct(state, productCuid);
    return { ...product };
  });
  return {
    cart,
    products,
    ordersAmount
  };
}

export default connect(mapStateToProps)(CartWidget);
