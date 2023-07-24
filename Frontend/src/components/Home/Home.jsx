import React from 'react';
import Greeting from './Greeting';
import SearchBar from '../SearchBar';
import Footer from './Footer';
import Navbar from './Navbar';
import WarningBox from './WarningBox';

const Home = ({ query }) => {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Greeting />
      </header>
      <SearchBar value={query} />
      <WarningBox />
      <Footer />
    </div>
  );
};

export default Home;
