import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const GlobalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Fira Sans', sans-serif;
  }
`;

const Header = styled.header({});
const Main = styled.main({});

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Header>Contact</Header>
      <Main>Main</Main>
    </>
  );
}

export default App;
