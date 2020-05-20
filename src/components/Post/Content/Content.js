// @flow strict
import React from 'react';
import styles from './Content.module.scss';

type Props = {
  body: string,
  toc: string,
  title: string
};

const Content = ({ body, toc, title }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__inner']}>
      <div className={styles['content__inner__body']} dangerouslySetInnerHTML={{ __html: body }} />
      <div className={styles['content__inner__toc']} dangerouslySetInnerHTML={{ __html: toc }} />
    </div>
  </div>
);

export default Content;
