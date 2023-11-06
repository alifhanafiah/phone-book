import { css } from '@emotion/react';
import { useState } from 'react';
import { colors } from '../assets/styles/const';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const searchBarStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBlock: '2rem',
  padding: '.5rem',
  backgroundColor: colors.secondary,
  border: '1px solid #ccc',
  borderRadius: '1rem',

  input: {
    flex: '1',
    border: 'none',
    borderRadius: '.5rem',
    padding: '.4rem',
    outline: 'none',
  },

  button: {
    padding: '.25rem 1rem',
    backgroundColor: '#2B51C2',
    color: colors.secondary,
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '.8rem',
    outline: 'none',
    transition: '300ms',

    '&:hover': {
      backgroundColor: '#4B74E3',
    },
  },
});

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div css={searchBarStyle}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>🔍</button>
    </div>
  );
};

export default SearchBar;
