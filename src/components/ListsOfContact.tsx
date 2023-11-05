import { css } from '@emotion/react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import img from '../assets/images/google-contacts.png';
import { colors } from '../assets/styles/const';

type ListsOfContactProps = {
  phones: {
    contact: {
      last_name: string;
      first_name: string;
      id: number;
    };
    number: string;
  }[];

  // favorited: Record<number, boolean>;

  // toggleFavorite: (contact: Contact) => void;
};

const listsOfContact = {
  contact: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#1f2937',
    borderRadius: '5rem',
    paddingInline: '.75rem',
    paddingBlock: '.5rem',
    marginBottom: '.5rem',
  }),

  link: css({
    display: 'flex',
    gap: '1rem',
  }),

  button: css({
    border: 'none',
    color: colors.secondary,
    backgroundColor: 'inherit',
    fontSize: '1.5rem',

    ':hover': {
      cursor: 'pointer',
    },
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

const ListsOfContact = ({ phones }: ListsOfContactProps) => {
  return (
    <ul>
      {phones.map((phone) => {
        const { contact, number } = phone;
        const { id, first_name, last_name } = contact;

        return (
          <li css={listsOfContact.contact} key={id}>
            <Link to={`/contact/${id}`} css={listsOfContact.link}>
              <img src={img} css={listsOfContact.image} />
              <div>
                <h3 css={listsOfContact.name}>
                  {first_name} {last_name}
                </h3>
                <p css={listsOfContact.phone}>{number}</p>
              </div>
            </Link>
            <button
              // onClick={() => toggleFavorite(contact)}
              css={listsOfContact.button}
            >
              {/* {favorited ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />} */}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListsOfContact;
