import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Import Style
import styles from './ProductFormPage.css';

import { addProductRequest, updateProductRequest }from '../../ProductActions';
import { getCategories } from '../../../Category/CategoryReducer';
import { getProduct } from '../../ProductReducer';

export class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = props.product || {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addProduct = ()=> {

    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[category]', this.state.category);

    for (let i = 0, file; file = this.refs.photos.files[i]; i++) {
      form.append('product[photos]', file, file.name);
    }

    this.props.dispatch(!this.props.product ? addProductRequest(form) : updateProductRequest(this.props.product.cuid, form))
  };

  onFileLoad = (e)=> {
    console.log(e.target.files);
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <select value={this.state.category} onChange={this.onChange} name="category">{
            this.props.categories.map((category)=> {
              return (<option value={category.cuid}>{category.name}</option>)
            })
          }
          </select>
          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} name="code" disabled={!!this.props.product}/>
          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <input ref="photos" type="file" onChange={this.onFileLoad} multiple="multiple"/>
          <div className={styles.photos}>
            {
              this.state.photos.map(photo =>(
                <div key={photo.fileName} className={styles.picture}>
                  <img src={`/uploads/products/art_${this.props.product.code}/${photo.fileName}`}/>
                </div>
              ))
            }
          </div>
          <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}><FormattedMessage id="submit"/></a>
        </div>
      </div>
    );
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid),
    categories: getCategories(state)
  };
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
