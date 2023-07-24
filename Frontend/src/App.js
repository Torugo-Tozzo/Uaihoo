import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import SearchResults from './components/Search/SearchResults';
import NotFound from './components/NotFound/NotFound';

function App() {
  const [searchHistory, setSearchHistory] = useState([]);

  const updateSearchHistory = (searchQuery) => {
    const updatedHistory = [searchQuery, ...searchHistory.slice(0, 4)];
    setSearchHistory(updatedHistory);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element= {<Home query={searchHistory[0]} />}
        />
        <Route
          path="/search"
          element={<SearchResults query={searchHistory[0]} updateSearchHistory={updateSearchHistory} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
