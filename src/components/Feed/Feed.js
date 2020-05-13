// @flow strict
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.slug}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.date).format('YYYY/MM/DD')}>
            {moment(edge.node.date).format('YYYY/MM/DD')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link to={edge.node.category.slug} className={styles['feed__item-meta-category-link']}>{edge.node.category.name}</Link>
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={edge.node.slug}>{edge.node.title}</Link>
        </h2>
        <p className={styles['feed__item-description']}></p>
        <Link className={styles['feed__item-readmore']} to={edge.node.slug}>Read</Link>
      </div>
    ))}
  </div>
);

export default Feed;
