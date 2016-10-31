import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import groups from '../../../../../common/data/groups';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import ProductColorForm from '../../components/ProductColorForm/ProductColorForm';
import { Tabs, Tab } from 'material-ui/Tabs';

import cuid from 'cuid';

// Import Style
import styles from './ProductFormPage.css';

import { addProductRequest, updateProductRequest }from '../../ProductActions';
import { getCategories } from '../../../Category/CategoryReducer';
import { getProduct } from '../../ProductReducer';

export class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = props.product || {
        colors: [{ cuid: cuid(), code: 'c01' }]
      }
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
    form.append('product[isSale]', this.state.isSale || false);
    form.append('product[inactive]', this.state.inactive || false);
    form.append('product[defaultColor]', this.state.defaultColor);

    this.state.colors.forEach(color => {
      for (let colorDataKey in color) {
        if ('filesPhotos' === colorDataKey) {
          color.filesPhotos.forEach(file => {
            form.append(`product[colors][${color.cuid}][filesPhotos]`, file, file.name);
          });
        } else {
          form.append(`product[colors][${color.cuid}][${colorDataKey}]`, color[colorDataKey]);
        }
      }
    });

    this.props.dispatch(!this.props.product ? addProductRequest(form) : updateProductRequest(this.props.product.cuid, form))
  };

  handleSelectChange = (paramName, event, index, value) => {
    return this.setState({ [paramName]: value });
  };

  handleCheckboxChange = (event, value) => {
    return this.setState({ [event.target.name]: value });
  };

  onAddColor = ()=> {
    let { colors } = this.state;
    colors.push({ code: 'new-color', cuid: cuid() });
    this.setState({ colors });
  };

  onColorChanged = (colorKey, colorData)=> {
    let { colors } = this.state;
    const colorIndex = colors.map(o => o.cuid).indexOf(colorKey);
    if (colorIndex > -1) {
      colors[colorIndex] = colorData;
      this.setState({ colors });
    }
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <Tabs>
            <Tab label="Shared">
              <SelectField
                floatingLabelText={this.props.intl.messages.productCategory}
                value={this.state.category}
                onChange={this.handleSelectChange.bind(null, 'category')}>
                {
                  this.props.categories.map((category)=> {
                    return (<MenuItem key={category.cuid} value={category.cuid} primaryText={category.name}/>)
                  })
                }
              </SelectField>
              <br/>
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
              </SelectField>
              <br/>
              <SelectField
                floatingLabelText={this.props.intl.messages.productDefaultColor}
                value={this.state.defaultColor}
                onChange={this.handleSelectChange.bind(null, 'defaultColor')}>
                {
                  Object.keys(this.state.colors).map((colorKey)=> {
                    return (<MenuItem key={colorKey} value={colorKey} primaryText={this.state.colors[colorKey].code}/>)
                  })
                }
              </SelectField>
              <TextField
                fullWidth={true}
                floatingLabelText={this.props.intl.messages.productName}
                defaultValue={this.state.name}
                onChange={this.onChange} name="name"/><br />
              <TextField
                fullWidth={true}
                floatingLabelText={this.props.intl.messages.productCode}
                defaultValue={this.state.code}
                disabled={this.state.cuid !== undefined}
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
              <Checkbox
                onCheck={this.handleCheckboxChange}
                name="inactive"
                checked={this.state.inactive}
                label={this.props.intl.messages.productInactive}
              /><br />
              <TextField
                multiLine={true}
                fullWidth={true}
                rowsMax={3}
                rows={3}
                floatingLabelText={this.props.intl.messages.productDescription}
                defaultValue={this.state.description}
                onChange={this.onChange} name="description"/><br />
              <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}>
                <FormattedMessage id="submit"/>
              </a>
            </Tab>
            {
              this.state.colors.map(color => (
                <Tab label={color.code || 'New Color'}>
                  <ProductColorForm onChange={this.onColorChanged.bind(null, color.cuid)} colorData={color}
                                    product={this.state}/>
                </Tab>
              ))
            }
            <Tab label={'Add New Color'} onActive={this.onAddColor.bind(this)}/>
          </Tabs>
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
