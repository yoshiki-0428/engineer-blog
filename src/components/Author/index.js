import React from 'react';
import Contacts from '../Contacts';
import Menu from '../Menu';
import { useSiteMetadata } from '../../hooks';
import { CENTER_PHOTO, SPACER_MINI, TEXT_BASE } from '../Tailwind';

const Author = () => {
  const { author, menu } = useSiteMetadata();

  return (
      <SPACER_MINI>
        <CENTER_PHOTO photo={author.photo} name={author.name} />
        <SPACER_MINI>
          <TEXT_BASE>{author.bio}</TEXT_BASE>
        </SPACER_MINI>
        <Contacts contacts={author.contacts} />
        {menu.length < 0 && menu[0].label !== '' && (
          <Menu items={menu}/>
        )}
      </SPACER_MINI>
  );
};

export default Author;
