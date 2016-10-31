import React, { Component, PropTypes } from 'react';

import { injectIntl, FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Dropzone from 'react-dropzone';
import styles from './ProductColorForm.css';
import { getProductFilesPath } from '../../../../util/productHelpers';

class ProductColorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.colorData,
      filesPhotos: []
    };
  }

  handleTextChange = (e) => {
    this.onColorChange({ [e.target.name]: e.target.value });
  };

  handleCheckboxChange = (event, value) => {
    this.onColorChange({ [event.target.name]: value });
  };

  onPhotosDrop = (acceptedFiles) => {
    this.onColorChange({ filesPhotos: acceptedFiles });
  };

  onColorChange = (changes) => {
    this.setState(changes);
    this.props.onChange({ ...this.state, ...changes })
  };

  render() {
    return (
      <div>
        <TextField
          fullWidth={true}
          floatingLabelText={this.props.intl.messages.productCode}
          defaultValue={this.state.code}
          onChange={this.handleTextChange} name="code"/><br />
        <TextField
          fullWidth={true}
          floatingLabelText={this.props.intl.messages.productSourceLink}
          defaultValue={this.state.sourceProductLink}
          onChange={this.handleTextChange} name="sourceProductLink"/><br />
        <Checkbox
          onCheck={this.handleCheckboxChange}
          name="inactive"
          checked={this.state.inactive}
          label={this.props.intl.messages.productInactive}
        /><br />
        <Checkbox
          onCheck={this.handleCheckboxChange}
          name="isSale"
          checked={this.state.isSale}
          label={this.props.intl.messages.productSale}
        /><br />
        <div className={styles.photos}>
          <Dropzone onDrop={this.onPhotosDrop} accept="image/*" multiple={true}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          {this.state.filesPhotos && this.state.filesPhotos.length > 0 &&
          this.state.filesPhotos.map((file) => (
            <div className={styles.picture}><img src={file.preview}/></div>
          ))
          }
          {this.state.photos && this.state.photos.length > 0 &&
          this.state.photos.map((photo) => (
            <div className={styles.picture}><img src={`${getProductFilesPath(this.props.product)}/${photo.fileName}`}/></div>
          ))
          }
        </div >
      </div>
    );
  }
}

ProductColorForm.propTypes = {
  colorData: PropTypes.shape({
    inactive: PropTypes.bool.isRequired,
    isSale: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    sourceProductLink: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

ProductColorForm.defaultProps = {
  colorData: {
    inactive: false,
    isSale: false,
    code: '',
    sourceProductLink: ''
  }
};

export
default

injectIntl(ProductColorForm);
