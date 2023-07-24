import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import "../App.css"

const HeaderSearch = ({ query }) => {
  return (
    <div className="header-container">
      <div className="searchbar-container">
        <SearchBar value={query} />
      </div>
      <div className="navbar-logo">
        <Link to="/">
          <img src="/Uaihoo.png" alt="Logo" />
        </Link>
      </div>
    </div>
  );
};

export default HeaderSearch;
