import { useMutation } from '@apollo/client';
import { css } from '@emotion/react';
import { BiTrashAlt } from 'react-icons/bi';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { DELETE_CONTACT_BY_PK } from '../apollo/mutations';
import { GET_CONTACT_LIST } from '../apollo/queries';
import img from '../assets/images/google-contacts.png';
import { colors } from '../assets/styles/const';
import { Contact } from '../types';

type ListsOfContactProps = {
  contacts: Contact[];

  onAddFavorite: (contact: Contact) => void;

  isFavoriteList: boolean;
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

  buttonContainer: css({
    display: 'flex',
    gap: '.25rem',
  }),

  button: css({
    display: 'flex',
    border: 'none',
    color: colors.secondary,
    backgroundColor: 'inherit',
    fontSize: '1.5rem',
    transition: '200ms',

    ':hover': {
      cursor: 'pointer',
      color: 'hsl(190, 58%, 70%)',
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

const ListsOfContact = ({
  contacts,
  onAddFavorite,
  isFavoriteList,
}: ListsOfContactProps) => {
  const [deleteData] = useMutation(DELETE_CONTACT_BY_PK, {
    refetchQueries: [GET_CONTACT_LIST],
  });

  const deleteHandler = async (id: number) => {
    const isDelete = confirm('Are you sure?');

    if (isDelete) {
      await deleteData({
        variables: {
          id,
        },
      });

      // delete the data from the localstorage
      const localFavoriteContacts = localStorage.getItem('favoriteContacts');
      if (localFavoriteContacts) {
        const favoriteContacts = JSON.parse(localFavoriteContacts);

        const updatedFavoriteContacts = favoriteContacts.filter(
          (contact: Contact) => contact.id !== id
        );

        localStorage.setItem(
          'favoriteContacts',
          JSON.stringify(updatedFavoriteContacts)
        );
      }
    }
  };

  return (
    <ul>
      {contacts?.map((contact) => {
        const { id, first_name, last_name, phones } = contact;

        return (
          <li css={listsOfContact.contact} key={id}>
            <Link to={`/contact/${id}`} css={listsOfContact.link}>
              <img src={img} css={listsOfContact.image} />
              <div>
                <h3 css={listsOfContact.name}>
                  {first_name} {last_name}
                </h3>
                <p css={listsOfContact.phone}>{phones[0]?.number}</p>
              </div>
            </Link>

            <div css={listsOfContact.buttonContainer}>
              <button
                onClick={() => onAddFavorite(contact)}
                css={listsOfContact.button}
              >
                {isFavoriteList ? (
                  <MdOutlineFavorite />
                ) : (
                  <MdOutlineFavoriteBorder />
                )}
              </button>

              <button
                onClick={() => deleteHandler(id)}
                css={listsOfContact.button}
              >
                <BiTrashAlt />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListsOfContact;
