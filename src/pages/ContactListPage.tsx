import { css } from '@emotion/react';
import { colors } from '../assets/styles/const';
import Divider from '../components/Divider';
import ListsOfContact from '../components/ListsOfContact';
import Nav from '../components/Nav';

const contactListCss = {
  header: css({
    position: 'relative',
    backgroundColor: colors.secondary,
    paddingBlock: '6rem',
    textAlign: 'center',
  }),

  main: css({
    paddingTop: '1rem',
    maxWidth: '90%',
    margin: '0 auto',
  }),
};

const ContactListPage = () => {
  return (
    <>
      <header css={contactListCss.header}>
        <h1>📖 Contacts</h1>
        <Divider />
      </header>
      <main css={contactListCss.main}>
        <Nav />
        <ListsOfContact />
      </main>
    </>
  );
};

export default ContactListPage;
