import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { colors } from '../assets/styles/const';
import Divider from '../components/Divider';

const rootCss = {
  header: css({
    position: 'relative',
    backgroundColor: colors.secondary,
    color: colors.primary,
    paddingTop: '3rem',
    paddingBottom: '5rem',
    textAlign: 'center',
  }),

  main: css({
    maxWidth: '768px',
    width: '90%',
    margin: '0 auto',
    paddingTop: '1.5rem',
  }),
};

const RootPage = () => {
  return (
    <>
      <header css={rootCss.header}>
        <h1>📖 Phonebook</h1>
        <Divider />
      </header>
      <main css={rootCss.main}>
        <Outlet />
      </main>
    </>
  );
};

export default RootPage;
