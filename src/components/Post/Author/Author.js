// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        Owen Oertell writes about computer science, mathematics, machine learning, and quantitative finance. Check out his website <a className="lnk" href="https://owenoertell.com">here</a>.
      </p>
    </div >
  );
};

export default Author;
