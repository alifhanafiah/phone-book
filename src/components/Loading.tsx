import { css, keyframes } from '@emotion/react';

type LoadingProps = {
  height: string;
};

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

const Loading = ({ height }: LoadingProps) => {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height,
      }}
    >
      <div css={spinnerStyle} />
    </div>
  );
};

export default Loading;
