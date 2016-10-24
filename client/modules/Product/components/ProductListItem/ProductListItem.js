/**
 * Created by alex on 15.09.16.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

// Import Style
import styles from './ProductListItem.css';

function ProductListItem(props) {
  return (
    <Card className={styles.container}>
      <Link to={`/products/${props.cuid}`}>
        <CardMedia
          overlay={ <CardTitle title={props.name} subtitle={`${props.price}грн`}/>}>
          <img src={`/uploads/products/art_${props.code}/${props.photos[0] ? props.photos[0].fileName : ''}`}/>
        </CardMedia>
      </Link>
    </Card>
  );
}

ProductListItem.propTypes = {};

export default ProductListItem;
