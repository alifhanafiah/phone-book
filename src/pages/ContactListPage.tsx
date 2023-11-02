import { css } from '@emotion/react';
import Nav from '../components/Nav';

const contactListCss = {
  header: css({
    paddingBlock: '4rem',
    backgroundSize: '2rem',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
  }),
};

const ContactListPage = () => {
  return (
    <>
      <header css={contactListCss.header}>Contacts</header>
      <Nav />
      ContactListPage
    </>
  );
};

export default ContactListPage;
