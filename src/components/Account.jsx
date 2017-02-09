import React from 'react';
import Payment from './Payment.jsx';

class Account extends React.Component {
  constructor(props) { // Constructor
    super(props);
  }

  render() {
    return(
      <h1>MY ACCOUNT PAGE</h1> // Render home page
      <div>
        <h1>MY ACCOUNT PAGE</h1>
        <Payment />
      </div>
    );
  }
}

export default Account;