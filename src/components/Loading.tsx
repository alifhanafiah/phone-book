import { css, keyframes } from '@emotion/react';

const loaderStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
});

const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const spinnerStyle = css({
  border: '4px solid rgba(0, 0, 0, 0.3)',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: `${spin} 2s linear infinite`,
});

const Loading = () => {
  return (
    <div css={loaderStyle}>
      <div css={spinnerStyle} />
    </div>
  );
};

export default Loading;
