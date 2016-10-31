/**
 * Created by alex on 03.10.16.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import cn from 'classnames';

import { getCategoryLink } from '../../util/productHelpers';

import styles from './CategoriesBar.css';

export default function CategoriesBar(props) {
  return (
    <div>
      <h3 className={styles.header}><FormattedMessage id="categoriesBarHeader"/></h3>
      <ul className={styles['categories-list']}>
        <li className={cn({ [styles.active]: props.params.categoryKey === undefined })}>
          <Link key='all_categories'
                to={getCategoryLink(props.params.groupKey)}><FormattedMessage id="all"/></Link>
        </li>
        {
          props.categories.map(category => (
            <li key={category.cuid} className={cn({ [styles.active]: props.params.categoryKey === category.cuid })}>
              <Link to={getCategoryLink(props.params.groupKey, category.cuid)}>{category.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
