import React from 'react';
import Payment from './Payment.jsx';

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>MY ACCOUNT PAGE</h1>
        <Payment />
      </div>
    );
  }
}

export default Account;