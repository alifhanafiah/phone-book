import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import img from '../assets/images/google-contacts.png';

const listsOfContactCss = {
  list: css({}),

  contact: css({
    display: 'flex',
    gap: '1rem',
    backgroundColor: '#1f2937',
    borderRadius: '5rem',
    paddingInline: '.75rem',
    paddingBlock: '.5rem',
  }),

  image: css({
    alignSelf: 'center',
    width: '2rem',
  }),

  name: css({
    fontSize: '1rem',
    marginBottom: '.125em',
  }),

  phone: css({
    fontSize: '.8rem',
    fontWeight: 'lighter',
    color: '#9ca3af',
  }),
};

const ListsOfContact = () => {
  return (
    <ul>
      <li css={listsOfContactCss.list}>
        <Link to={`/contact/1`} css={listsOfContactCss.contact}>
          <img src={img} css={listsOfContactCss.image} />
          <div>
            <h3 css={listsOfContactCss.name}>Hasyim</h3>
            <p css={listsOfContactCss.phone}>+62 851511</p>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default ListsOfContact;
