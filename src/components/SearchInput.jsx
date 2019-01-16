import React, { createRef } from 'react';
import IconSearch from './Icons/Search';
import IconClose from './Icons/Close';

const debounce = (fn, time) => {
  let timeout;

  return function temp(...args) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = createRef();
    this.debouncedSetSearch = debounce(this.props.setSearch, 500);
  }

  componentDidMount() {
    const { search } = this.props;
    if (this.searchInput.current) {
      if (search !== this.searchInput.current.value) {
        this.searchInput.current.value = search;
      }
    }
  }

  render() {
    const { search } = this.props;
    return (
      <div className="input-search">
        <input
          className="input-search__text"
          type="text"
          ref={this.searchInput}
          onChange={e => this.debouncedSetSearch(e.target.value)}
          placeholder="Search"
        />

        {search.length || (this.searchInput.current && this.searchInput.current.value.length) ?
          <div
            role="presentation"
            className="input-search__icon input-search__icon_close"
            onClick={() => {
              this.searchInput.current.value = '';
              this.props.setSearch('');
            }}
          >
            <IconClose />
          </div> :
          <div className="input-search__icon"><IconSearch /></div>
        }
      </div>
    );
  }
}

export default SearchInput;
