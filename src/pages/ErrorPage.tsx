import { css } from '@emotion/react';

const CSS = {
  pageContainerStyles: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }),

  headingStyles: css({
    fontSize: '2rem',
    marginBottom: '20px',
  }),

  paragraphStyles: css({
    fontSize: '1rem',
  }),
};

const ErrorPage = () => {
  return (
    <div css={CSS.pageContainerStyles}>
      <h1 css={CSS.headingStyles}>404 - Not Found</h1>
      <p css={CSS.paragraphStyles}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default ErrorPage;
