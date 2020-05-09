import React, { useState, lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import ThemeContext from './ThemeContext';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = function App() {
  const themeHook = useState('peru');

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header id="important">
            <Link to="/">Adopt Me!</Link>
          </header>
          <Suspense fallback={<h1>LOADING ROUTE...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id"></Details>
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
