import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { GET_CONTACT_LIST } from '../apollo/queries';
import ListsOfContact from '../components/ListsOfContact';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { Contact } from '../types';

const contactListPage = {
  title: css({
    marginTop: '1.5rem',
    marginBottom: '.5rem',
  }),
};

const ContactListPage = () => {
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>(() => {
    const localValue = localStorage.getItem('favoriteContacts');
    return localValue ? JSON.parse(localValue) : [];
  });

  // Save favorite contacts in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
  }, [favoriteContacts]);

  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      // search for contacts that match the searchQuery in either the first_name or last_name fields.
      where: {
        _or: [
          { first_name: { _like: `%${searchQuery}%` } },
          { last_name: { _like: `%${searchQuery}%` } },
        ],
      },
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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

  const favoriteContactData = allContacts.filter((contact: Contact) =>
    favoriteContacts
      .map((favContact: Contact) => favContact.id)
      .includes(contact.id)
  );

  const regularContactData = allContacts.filter(
    (contact: Contact) =>
      !favoriteContacts.some((favContact) => favContact.id === contact.id)
  );

  const regularContactDataDisplay = regularContactData.slice(
    offset,
    offset + limit
  );

  const addFavorite = (contact: Contact) => {
    // Check if the contact is already in the favorite list
    if (!favoriteContacts.some((favContact) => favContact.id === contact.id)) {
      setFavoriteContacts((prevFavoriteContacts) => [
        ...prevFavoriteContacts,
        contact,
      ]);
    }
  };

  const removeFavorite = (contact: Contact) => {
    // Check if the contact is in the favorite list
    if (favoriteContacts.some((favContact) => favContact.id === contact.id)) {
      setFavoriteContacts((prevFavoriteContacts) =>
        prevFavoriteContacts.filter(
          (favContact) => favContact.id !== contact.id
        )
      );
    }
  };

  return (
    <>
      <Nav />

      <SearchBar onSearch={handleSearch} />

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
          contacts={regularContactDataDisplay}
          onAddFavorite={addFavorite}
          isFavoriteList={false}
        />
      )}

      <Pagination
        onPrevClick={prevPage}
        onNextClick={nextPage}
        disablePrev={offset === 0}
        disableNext={offset + limit >= regularContactData.length}
      />
    </>
  );
};

export default ContactListPage;
