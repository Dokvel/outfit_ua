import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Lightbox from 'react-images';
import {Link} from 'react-router';
import styles from './ProductDetailPage.css';
import {addToCart} from '../../../Cart/CartActions';
import {isAdmin} from '../../../../util/apiCaller';
import {getProductFilesPath, getColorUuid} from '../../../../util/productHelpers';
// Import Selectors
import {getProduct} from '../../ProductReducer';

export class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowingModal: false, lightboxIsOpen: false, photos: [], currentImage: 0, currentBigImage: 0}
  }

  handleClick = () => this.setState({isShowingModal: true});

  handleClose = () => this.setState({isShowingModal: false});

  addProductToCart = () => {
    if (this.state.selectedSize !== undefined) {
      this.props.dispatch(addToCart(this.props.product.cuid, this.props.params.colorCode, this.state.selectedSize))
    }
  };

  getPhotosSrc = (product, colorCode) => {
    let colorCUID = colorCode ? getColorUuid(product, colorCode) : product.defaultColor;
    return product ? product.colors[colorCUID].photos.map(photo => {
      return {src: `${getProductFilesPath(product)}/${photo.fileName}`}
    }) : [];
  };

  componentDidMount() {
    this.setState({
      photos: this.getPhotosSrc(this.props.product, this.props.params.colorCode),
      selectedSize: undefined
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({photos: this.getPhotosSrc(nextProps.product, nextProps.params.colorCode), selectedSize: undefined});
  };

  openPhoto = (currentImage) => {
    this.setState({currentImage: currentImage || 0, lightboxIsOpen: true})
  };

  closeLightbox = (e) => {
    this.setState({lightboxIsOpen: false})
  };

  gotoNextLightboxImage = () => {
    let currentImage = this.state.currentImage + 1;
    if (currentImage > this.state.photos.length)
      currentImage = 0;
    this.setState({currentImage});
  };

  gotoPrevLightboxImage = () => {
    let currentImage = this.state.currentImage - 1;
    if (currentImage < 0) {
      currentImage = this.state.photos.length;
    }
    this.setState({currentImage});
  };

  onHoverPicture = (index, e) => {
    this.setState({currentBigImage: index || 0})
  };

  handleSizeSelect = (sizeKey, e) => {
    this.setState({selectedSize: sizeKey})
  };

  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['product']}>
          <div className={styles.photos}>
            <div onClick={this.openPhoto.bind(null, this.state.currentBigImage)} className={styles['big-picture']}>
              <img
                src={this.state.photos[this.state.currentBigImage] && this.state.photos[this.state.currentBigImage].src}/>
            </div>
            <div className={styles['previews']}>
              {
                this.state.photos.map((photo, index) => (
                    <div key={`photo_${index}`} onClick={this.openPhoto.bind(null, index)} className={styles.picture}
                         onMouseOver={this.onHoverPicture.bind(null, index)}>
                      <img src={photo.src}/>
                    </div>
                  )
                )
              }
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{(this.props.product.price * 0.95) + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            {isAdmin() && <Link to={`/products/${this.props.product.cuid}/edit`}><FormattedMessage id="edit"/></Link>}
            {
              Object.keys(this.props.product.colors).map(colorCUID => (
                <Link key={`color_${colorCUID}`}
                      to={`/products/${this.props.product.cuid}-${this.props.product.colors[colorCUID].code}`}>
                  {this.props.product.colors[colorCUID].code}
                </Link>
              ))
            }
            {
              this.props.product.colors[getColorUuid(this.props.product, this.props.params.colorCode)].sizes.map(sizeKey => (
                <div key={`size_${sizeKey}`} className={''}
                     onClick={this.handleSizeSelect.bind(null, sizeKey)}>{sizeKey}</div>
              ))
            }
            <div onClick={this.addProductToCart}>
              <FormattedMessage id="order"/>
            </div>
          </div>
        </div>
        <div className={styles['useful-info']}>
        </div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>Dialog Content</h1>
              <p>More Content. Anything goes here</p>
            </ModalDialog>
          </ModalContainer>
        }
        <Lightbox
          images={this.state.photos}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClickImage={this.closeLightbox.bind(this)}
          currentImage={this.state.currentImage}
          onClose={this.closeLightbox.bind(this)}
          imageCountSeparator={this.props.intl.messages.imageCountSeparator}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    intl: state.intl,
    product: getProduct(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
