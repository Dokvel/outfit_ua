/**
 * Created by alex on 15.09.16.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { getProductPrice } from '../../ProductReducer';
import { Panel, PanelBlock, Image, Columns, Column, PanelBlockItem } from 're-bulma';

// Import Style

function ProductListItem(props) {
  return (
    <Columns>
      <Column size='is3'>
        <Link to={`/products/${props.cuid}-${props.colors[props.defaultColor].code}`}>
          <Panel>
            <p className="is-overlay">
              <Image ratio="isSquare" className={'is-overlay'}
                src={`/uploads/products/art_${props.code}/${props.colors[props.defaultColor] ? props.colors[props.defaultColor].photos[0].fileName : ''}`}/>
            </p>
            <PanelBlock>
              <Columns><Column>
                {`${ getProductPrice(props, props.defaultColor)}грн`}</Column></Columns>
            </PanelBlock>
          </Panel>
        </Link>
      </Column>
    </Columns>
  );
}

export default ProductListItem;
