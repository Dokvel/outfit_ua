/**
 * Created by alex on 03.10.16.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import { getCategoryLink } from '../../util/productHelpers';

import styles from './CategoriesBar.css';

export default function CategoriesBar(props) {
  return (
    <div>
      <h3 className={styles.header}><FormattedMessage id="categoriesBarHeader"/></h3>
      <ul className={styles['categories-list']}>
        {
          props.categories.map(category => (
            <li key={category.cuid}><Link
              to={getCategoryLink(props.params.groupKey, category.cuid)}>{category.name}</Link></li>
          ))
        }
      </ul>
    </div>
  )
}
