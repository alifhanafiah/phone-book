import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { GET_CONTACT_LIST } from '../apollo/queries';
import ListsOfContact from '../components/ListsOfContact';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import Pagination from '../components/Pagination';

type Contact = {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: { number: string }[];
};

const contactListPage = {
  title: css({
    marginTop: '1.5rem',
    marginBottom: '.5rem',
  }),
};

const ContactListPage = () => {
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [favoriteContacts, setFavoriteContacts] = useState(() => {
    const localValue = localStorage.getItem('favoriteContacts');
    return localValue ? JSON.parse(localValue) : [];
  });

  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit,
      offset,
      order_by: {
        first_name: 'asc',
      },
    },
    fetchPolicy: 'network-only',
  });

  const favoriteContactData = data?.contact.filter((contact: Contact) =>
    favoriteContacts.includes(contact.id)
  );
  const regularContactData = data?.contact.filter(
    (contact: Contact) => !favoriteContacts.includes(contact.id)
  );

  // Save favorite contacts in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
  }, [favoriteContacts]);

  const addFavorite = (contact: Contact) => {
    // Check if the contact is already in the favorite list
    if (!favoriteContacts.includes(contact.id)) {
      setFavoriteContacts((prevFavoriteContacts: []) => [
        ...prevFavoriteContacts,
        contact.id,
      ]);
    }
  };

  const removeFavorite = (contact: Contact) => {
    // Check if the contact is in the favorite list
    if (favoriteContacts.includes(contact.id)) {
      setFavoriteContacts((prevFavoriteContacts: []) =>
        prevFavoriteContacts.filter((id) => id !== contact.id)
      );
    }
  };

  if (error) return `Error! ${error.message}`;

  const nextPage = () => {
    setOffset((prevOffset) => {
      return prevOffset + limit;
    });
  };

  const prevPage = () => {
    setOffset((prevOffset) => {
      // Make sure offset is not negative
      if (prevOffset - limit >= 0) {
        return prevOffset - limit;
      } else {
        return 0;
      }
    });
  };

  return (
    <>
      <Nav />

      <h2 css={contactListPage.title}>⭐ Favorite</h2>
      {loading ? (
        <Loading height="10vh" />
      ) : (
        <ListsOfContact
          contacts={favoriteContactData}
          onAddFavorite={removeFavorite}
          isFavoriteList={true}
        />
      )}

      <h2 css={contactListPage.title}>🫂 Contacts</h2>
      {loading ? (
        <Loading height="10vh" />
      ) : (
        <ListsOfContact
          contacts={regularContactData}
          onAddFavorite={addFavorite}
          isFavoriteList={false}
        />
      )}
      <Pagination
        onNextClick={nextPage}
        onPrevClick={prevPage}
        disableNext={data?.contact.length === 0}
      />
    </>
  );
};

export default ContactListPage;
