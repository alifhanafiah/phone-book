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
};

const RootPage = () => {
  return (
    <>
      <header css={rootCss.header}>
        <h1>📖 Phonebook</h1>
        <Divider />
      </header>
      <Outlet />
    </>
  );
};

export default RootPage;
