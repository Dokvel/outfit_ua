import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import groups from '../../../../../common/data/groups';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

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
    form.append('product[group]', this.state.group);
    form.append('product[isSale]', this.state.isSale);

    for (let i = 0, file; file = this.refs.photos.files[i]; i++) {
      form.append('product[photos]', file, file.name);
    }

    this.props.dispatch(!this.props.product ? addProductRequest(form) : updateProductRequest(this.props.product.cuid, form))
  };

  handleSelectChange = (paramName, event, index, value) => {
    return this.setState({ [paramName]: value });
  };

  handleCheckboxChange = (event, value) => {
    return this.setState({ [event.target.name]: value });
  };

  onFileLoad = (e)=> {
    console.log(e.target.files);
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <SelectField
            floatingLabelText={this.props.intl.messages.productCategory}
            value={this.state.category}
            onChange={this.handleSelectChange.bind(null, 'category')}>
            {
              this.props.categories.map((category)=> {
                return (<MenuItem key={category.cuid} value={category.cuid} primaryText={category.name}/>)
              })
            }
          </SelectField><br />
          <SelectField
            floatingLabelText={this.props.intl.messages.productGroup}
            value={this.state.group}
            onChange={this.handleSelectChange.bind(null, 'group')}>
            {
              groups.map(group => {
                  return (
                    <MenuItem key={group.key} value={group.key}
                              primaryText={this.props.intl.messages[`groups.${group.key}`]}/>
                  )
                }
              )
            }
          </SelectField><br />
          <TextField
            fullWidth={true}
            floatingLabelText={this.props.intl.messages.productName}
            defaultValue={this.state.name}
            onChange={this.onChange} name="name"/><br />
          <TextField
            fullWidth={true}
            floatingLabelText={this.props.intl.messages.productCode}
            defaultValue={this.state.code}
            onChange={this.onChange} name="code"/><br />
          <TextField
            type="number"
            fullWidth={true}
            floatingLabelText={this.props.intl.messages.productPrice}
            defaultValue={this.state.price}
            onChange={this.onChange} name="price"/><br />
          <Checkbox
            onCheck={this.handleCheckboxChange}
            name="isSale"
            checked={this.state.isSale}
            label={this.props.intl.messages.productSale}
          /><br />
          <TextField
            multiLine={true}
            fullWidth={true}
            rows={3}
            floatingLabelText={this.props.intl.messages.productDescription}
            defaultValue={this.state.description}
            onChange={this.onChange} name="description"/><br />
          <input ref="photos" type="file" onChange={this.onFileLoad} multiple="multiple"/>
          <div className={styles.photos}>
            {
              this.state.photos && this.state.photos.map(photo =>(
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
