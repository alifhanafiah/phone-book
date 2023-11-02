import { Global, css } from '@emotion/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { colors } from './assets/styles/const';
import ContactDetailPage from './pages/ContactDetailPage';
import ContactListPage from './pages/ContactListPage';
import FormContactPage from './pages/FormContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: ContactListPage,
  },
  {
    path: '/add',
    Component: FormContactPage,
  },
  {
    path: '/contact',
    Component: ContactDetailPage,
  },
]);

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
    background-color: ${colors.primary};
    color: ${colors.secondary};
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
