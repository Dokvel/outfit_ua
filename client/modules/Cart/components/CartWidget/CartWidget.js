/**
 * Created by alex on 09.10.16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getCart, getOrdersAmount, parseProductPath, generateProductPath } from '../../CartReducer';
import { getCategory } from '../../../Category/CategoryReducer';
import { removeFromCart, sendCart } from '../../CartActions';
import { getProducts, getProductPrice } from '../../../Product/ProductReducer'
import { FormattedMessage } from 'react-intl';
import { getProductFilesPath, getColorUuid } from '../../../../util/productHelpers';
import styles from "./CartWidget.css";

import { Table, Container, Thead, Th, Tr, Td, Tbody, Title, Input, Button, Addons } from 're-bulma';
class CartWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: '' };
  }

  removeProductFromCart = (cuid, colorCode, size) => {
    this.props.dispatch(removeFromCart(cuid, colorCode, size));
  };

  sendOrder = () => {
    if (this.state.phone) {
      this.props.dispatch(sendCart(this.state.phone, this.props.cart));
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Table>
          <Thead>
          <Tr>
            <Th><FormattedMessage id="photo"/></Th>
            <Th><FormattedMessage id="productCategory"/></Th>
            <Th><FormattedMessage id="productPrice"/></Th>
            <Th><FormattedMessage id="count"/></Th>
            <Th><FormattedMessage id="actions"/></Th>
          </Tr>
          </Thead>
          <Tbody>
          {
            this.props.cartProducts.map(params => {
              let product = this.props.products.filter(product => params.productCuid === product.cuid)[0];
              let colorUUID = getColorUuid(product, params.colorCode);
              return (
                <Tr key={`${product.cuid}_${params.colorCode}_${params.sizeKey}`}>
                  <Td>
                    <div className={styles.photo}>
                      <img src={`${getProductFilesPath(product)}/${product.colors[colorUUID].photos[0].fileName}`}/>
                    </div>
                  </Td>
                  <Td>{`${product.cuid} ${params.colorCode} ${params.sizeKey}`}</Td>
                  <Td>{getProductPrice(product, colorUUID)} грн</Td>
                  <Td>{this.props.cart[generateProductPath(params)].count}</Td>
                  <Td>
                    <span
                      onClick={this.removeProductFromCart.bind(null, product.cuid, params.colorCode, params.sizeKey)}>
                      Удалить
                    </span>
                  </Td>
                </Tr>
              )
            })
          }
          </Tbody>
        </Table>
          <Addons color="isInfo" hasAddonsRight>
            <Title size="is3"> Сумма {this.props.ordersAmount} грн |</Title>
            <Input
              type="text"
              placeholder="Номер телефона"
              defaultValue={this.state.phone}
              onChange={this.onChange}/>
            <Button onClick={this.sendOrder}>
              <FormattedMessage id="order"/>
            </Button>
          </Addons>
      </Container>
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
