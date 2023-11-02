import { css } from '@emotion/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { colors } from '../assets/styles/const';

const navCss = {
  list: css({
    display: 'flex',
    justifyContent: 'center',
  }),

  icon: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
    fontSize: '1.5rem',
    border: `1px solid ${colors.secondary}`,
    borderRadius: '50%',
    padding: '0.5rem',
    color: colors.secondary,
    transition: '250ms',

    ':hover': {
      backgroundColor: colors.secondary,
      color: colors.primary,
    },
  }),

  iconSvg: css({
    backgroundColor: 'transparent',
  }),
};

const Nav = () => {
  return (
    <nav>
      <ul css={navCss.list}>
        <li>
          <Link to="/add" css={navCss.icon}>
            <AiOutlinePlus css={navCss.iconSvg} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
