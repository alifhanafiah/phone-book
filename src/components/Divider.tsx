import { css } from '@emotion/react';

const customShapeStyle = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)',

  svg: {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '70px',
  },

  '.shape-fill': {
    fill: '#000000',
  },

  '@media (max-width: 767px)': {
    svg: {
      width: 'calc(100% + 1.3px)',
      height: '50px',
    },
  },
});

const Divider = () => {
  return (
    <div css={customShapeStyle}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
};

export default Divider;
