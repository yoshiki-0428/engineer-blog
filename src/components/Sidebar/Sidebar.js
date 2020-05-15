// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import {useCategoriesList, useSiteMetadata, useTagsList} from '../../hooks';
import Tags from "../Tags";
import Category from "../Category";

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const tags = useTagsList();
  const categories = useCategoriesList();

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
        <h2>Category</h2>
        <Category category={categories} selectedCategory={""}/>
        <h2>Tags</h2>
        <Tags tags={tags} selectedTag={""}/>
      </div>
    </div>
  );
};

export default Sidebar;
