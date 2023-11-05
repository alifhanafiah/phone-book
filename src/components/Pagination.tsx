import { css } from '@emotion/react';
import { colors } from '../assets/styles/const';

type PaginationProps = {
  onNextClick: () => void;
  onPrevClick: () => void;
  disablePrev: boolean;
  disableNext: boolean;
};

const pagination = {
  container: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  }),

  button: css({
    padding: '.5rem 1rem',
    marginTop: '.5rem',
    marginBottom: '2rem',
    backgroundColor: '#2B51C2',
    color: colors.secondary,
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '5px',
    outline: 'none',
    transition: '200ms',

    '&:hover': {
      backgroundColor: '#4B74E3',
    },
  }),
};

const Pagination = ({
  onPrevClick,
  onNextClick,
  disablePrev,
  disableNext,
}: PaginationProps) => {
  return (
    <>
      {disableNext && (
        <p css={{ textAlign: 'center', marginBlock: '1rem' }}>
          There are no more contacts
        </p>
      )}

      <div css={pagination.container}>
        <button
          css={pagination.button}
          onClick={onPrevClick}
          style={
            disablePrev
              ? { backgroundColor: 'lightgray', cursor: 'not-allowed' }
              : {}
          }
        >
          Prev
        </button>

        <button
          css={pagination.button}
          onClick={onNextClick}
          style={
            disableNext
              ? { backgroundColor: 'lightgray', cursor: 'not-allowed' }
              : {}
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
