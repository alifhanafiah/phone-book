import { css } from '@emotion/react';
import ListsOfContact from '../components/ListsOfContact';
import Nav from '../components/Nav';

const contactListCss = {
  header: css({
    paddingBlock: '10rem',
    backgroundSize: '2rem',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
  }),

  main: css({
    position: 'relative',
    zIndex: 1,
  }),
};

const ContactListPage = () => {
  return (
    <>
      <header css={contactListCss.header}>
        <h1>Contacts</h1>
      </header>
      <main css={contactListCss.main}>
        <Nav />
        <ListsOfContact />
      </main>
    </>
  );
};

export default ContactListPage;
