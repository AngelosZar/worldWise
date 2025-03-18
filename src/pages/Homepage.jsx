import React from 'react';
import { Link } from 'react-router-dom';
// import Pricing from './Pricing';
function Homepage() {
  return (
    <div>
      <h1>Worldwise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;
