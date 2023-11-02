import { css } from '@emotion/react';
import { AiOutlinePlus } from 'react-icons/ai';
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
    transition: '250ms',

    ':hover': {
      backgroundColor: colors.secondary,
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
          <a href="#" css={navCss.icon}>
            <AiOutlinePlus css={navCss.iconSvg} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
