import React from 'react';
import IconSearch from './Icons/Search';
import IconClose from './Icons/Close';

const SearchInput = ({ search, setSearch }) => (
  <div className="input-search">
    <input
      className="input-search__text"
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search"
    />

    {search.length ?
      <div role="presentation" className="input-search__icon input-search__icon_close" onClick={() => setSearch('')}><IconClose /></div> :
      <div className="input-search__icon"><IconSearch /></div>
    }
  </div>
);
export default SearchInput;
