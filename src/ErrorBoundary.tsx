//https://reactjs.org/docs/error-boundaries.html

import React, { Component, ErrorInfo } from 'react';
import { Link, navigate } from '@reach/router';

class ErrorBoundary extends Component {
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Boundary caught an error', error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => navigate('/'), 5000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing.
          <br />
          <Link to="/">Click here to the home page</Link>
          <br />
          Or Wait 5s
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
