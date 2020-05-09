import React, { useState } from 'react';
import { Link } from '@reach/router';
import { css, keyframes } from '@emotion/core';
import colors from './colors';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const NavBar = () => {
  return (
    <header>
      <Link to="/">Adopt Me!</Link>
      <span
        role="img"
        aria-label="logo"
        css={css`
          font-size: 60px;
          cursor: pointer;
          display: inline;
          animation: 5s ${spin} ease-in infinite;
          &:hover {
            opacity: 0.5;
          }
        `}
      >
        🐕
      </span>
    </header>
  );
};

export default NavBar;
