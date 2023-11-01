import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import tileBg from './assets/images/phone-tile-bg.png';
import Nav from './components/Nav';

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

const Header = styled.header({
  paddingBlock: '10rem',
  backgroundImage: `url(${tileBg})`,
  backgroundSize: '2rem',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
});
const Main = styled.main({});

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Header>Contact</Header>
      <Nav />
      <Main>Main</Main>
    </>
  );
}

export default App;
