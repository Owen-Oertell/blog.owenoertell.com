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
        I am head of engineering at <a href="https://ystemandchess.com">YSC</a> and do research at the Dickson lab at <a href="https://www.gatech.edu/">GaTech</a>.
        Check out my <a href={getContactHref('github', author.contacts.github)}>github</a> or drop me an <a href={getContactHref('email', author.contacts.email)}>email</a>!</p>
    </div>
  );
};

export default Author;
