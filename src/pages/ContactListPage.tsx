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
  const [allContacts, setAllContacts] = useState([]);

  const [favoriteContacts, setFavoriteContacts] = useState(() => {
    const localValue = localStorage.getItem('favoriteContacts');
    return localValue ? JSON.parse(localValue) : [];
  });

  // Save favorite contacts in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
  }, [favoriteContacts]);

  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      order_by: {
        first_name: 'asc',
      },
    },
    fetchPolicy: 'network-only',
  });

  // Save all contacts data to state
  useEffect(() => {
    if (data?.contact) {
      setAllContacts(data.contact);
    }
  }, [data]);

  if (error) return `Error! ${error.message}`;

  const nextPage = () => {
    if (offset + limit < allContacts.length) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const prevPage = () => {
    if (offset - limit >= 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };

  const displayedContacts = allContacts.slice(offset, offset + limit);

  const favoriteContactData = displayedContacts.filter((contact: Contact) =>
    favoriteContacts.includes(contact.id)
  );
  const regularContactData = displayedContacts.filter(
    (contact: Contact) => !favoriteContacts.includes(contact.id)
  );

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
      setFavoriteContacts((prevFavoriteContacts: []) => {
        return prevFavoriteContacts.filter((id) => id !== contact.id);
      });
    }
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
        disableNext={offset + limit >= allContacts.length}
        disablePrev={offset === 0}
      />
    </>
  );
};

export default ContactListPage;
