import { Global, css } from '@emotion/react';
import { colors } from './assets/styles/const';
import ContactListPage from './pages/ContactListPage';

const GlobalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Fira Sans', sans-serif;
    background-color: black;
    color: ${colors.primary};
  }

  li {
    list-style: none;
  }
`;

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <ContactListPage />
    </>
  );
}

export default App;
