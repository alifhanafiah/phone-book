import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { GET_CONTACT_LIST } from '../apollo/queries';
import ListsOfContact from '../components/ListsOfContact';
import Loading from '../components/Loading';
import Nav from '../components/Nav';

const contactListPage = {
  title: css({
    marginTop: '1.5rem',
    marginBottom: '.5rem',
  }),
};

const ContactListPage = () => {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    // variables: {
    //   limit: 10,
    // },
    fetchPolicy: 'network-only',
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Nav />
      <h2 css={contactListPage.title}>⭐ Favorite</h2>
      <ListsOfContact contacts={data.contact} />
      <h2 css={contactListPage.title}>🫂 Contacts</h2>
      <ListsOfContact contacts={data.contact} />
    </>
  );
};

export default ContactListPage;
