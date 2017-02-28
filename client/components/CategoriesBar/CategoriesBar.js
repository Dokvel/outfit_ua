/**
 * Created by alex on 03.10.16.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { getCategoryLink } from '../../util/productHelpers';
import { Panel, PanelBlock, PanelHeading } from 're-bulma';

export default function CategoriesBar(props) {
  return (
    <Panel>
      <PanelHeading><FormattedMessage id="categoriesBarHeader"/></PanelHeading>
      <PanelBlock isActive={props.params.categoryKey === undefined }>
        <Link key='all_categories'
              to={getCategoryLink(props.params.groupKey)}><FormattedMessage id="all"/></Link>
      </PanelBlock>
      {
        props.categories.map(category => (
          <PanelBlock key={category.cuid} isActive={ props.params.categoryKey === category.cuid}>
            <Link to={getCategoryLink(props.params.groupKey, category.cuid)}>{category.name}</Link>
          </PanelBlock>
        ))
      }
    </Panel>
  )
}
