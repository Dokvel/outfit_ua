/**
 * Created by alex on 09.10.16.
 */
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {getCart, getOrdersAmount, parseProductPath, generateProductPath} from '../../CartReducer';
import {getCategory} from '../../../Category/CategoryReducer';
import {removeFromCart} from '../../CartActions';
import {getProducts} from '../../../Product/ProductReducer'
import {FormattedMessage} from 'react-intl';
import {getProductFilesPath, getColorUuid} from '../../../../util/productHelpers';
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

  removeProductFromCart = (cuid, colorCode, size) => {
    this.props.dispatch(removeFromCart(cuid, colorCode, size));
  };

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
            this.props.cartProducts.map(params => {
              let product = this.props.products.filter(product => params.productCuid === product.cuid)[0];
              let colorUUID = getColorUuid(product, params.colorCode);
              return (
                <TableRow>
                  <TableRowColumn>
                    <div className={styles.photo}>
                      <img src={`${getProductFilesPath(product)}/${product.colors[colorUUID].photos[0].fileName}`}/>
                    </div>
                  </TableRowColumn>
                  <TableRowColumn>{`${product.cuid} ${params.colorCode} ${params.sizeKey}`}</TableRowColumn>
                  <TableRowColumn>{product.price} грн</TableRowColumn>
                  <TableRowColumn>{this.props.cart[generateProductPath(params)].count}</TableRowColumn>
                  <TableRowColumn>
                    <span
                      onClick={this.removeProductFromCart.bind(null, product.cuid, params.colorCode, params.sizeKey)}>
                      Удалить
                    </span>
                  </TableRowColumn>
                </TableRow>
              )
            })
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
  let cartProducts = Object.keys(cart).map(productPath => {
    return parseProductPath(productPath);
  });
  return {
    cart,
    cartProducts,
    products: getProducts(state),
    ordersAmount
  };
}

export default connect(mapStateToProps)(CartWidget);
