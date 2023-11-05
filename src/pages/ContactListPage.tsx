import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useState } from 'react';
import { GET_CONTACT_LIST } from '../apollo/queries';
import ListsOfContact from '../components/ListsOfContact';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import Pagination from '../components/Pagination';

const contactListPage = {
  title: css({
    marginTop: '1.5rem',
    marginBottom: '.5rem',
  }),
};

const ContactListPage = () => {
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

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
      {/* <ListsOfContact contacts={data.contact} /> */}
      <h2 css={contactListPage.title}>🫂 Contacts</h2>
      {loading ? (
        <Loading height="10vh" />
      ) : (
        <ListsOfContact contacts={data?.contact} />
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
