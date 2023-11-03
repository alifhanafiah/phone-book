import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import img from '../assets/images/google-contacts.png';

const listsOfContactCss = {
  list: css({
    marginBottom: '.5rem',
  }),

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

type ListsOfContactProps = {
  contacts: {
    created_at: string;
    first_name: string;
    id: number;
    last_name: string;
    phones: { number: string }[];
  }[];
};

const ListsOfContact = ({ contacts }: ListsOfContactProps) => {
  console.log(contacts);

  return (
    <ul>
      {contacts.map(({ id, first_name, last_name, phones }) => {
        return (
          <li css={listsOfContactCss.list}>
            <Link to={`/contact/${id}`} css={listsOfContactCss.contact}>
              <img src={img} css={listsOfContactCss.image} />
              <div>
                <h3 css={listsOfContactCss.name}>
                  {last_name}, {first_name}
                </h3>
                <p css={listsOfContactCss.phone}>{phones[0].number}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ListsOfContact;
