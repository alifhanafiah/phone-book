import { css } from '@emotion/react';
import { colors } from '../assets/styles/const';
import Divider from '../components/Divider';
import ListsOfContact from '../components/ListsOfContact';
import Nav from '../components/Nav';

const contactListCss = {
  header: css({
    position: 'relative',
    backgroundColor: colors.secondary,
    color: colors.primary,
    paddingTop: '3rem',
    paddingBottom: '5rem',
    textAlign: 'center',
  }),

  main: css({
    paddingTop: '1rem',
    maxWidth: '768px',
    width: '90%',
    margin: '0 auto',
  }),

  title: css({
    marginTop: '1.5rem',
    marginBottom: '.5rem',
  }),
};

const ContactListPage = () => {
  return (
    <>
      <header css={contactListCss.header}>
        <h1>📖 Phonebook</h1>
        <Divider />
      </header>
      <main css={contactListCss.main}>
        <Nav />
        <h2 css={contactListCss.title}>⭐ Favorites</h2>
        <ListsOfContact />
        <h2 css={contactListCss.title}>🫂 Contacts</h2>
        <ListsOfContact />
      </main>
    </>
  );
};

export default ContactListPage;
