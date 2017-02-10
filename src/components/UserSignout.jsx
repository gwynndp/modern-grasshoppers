import React from 'react';

var UserSignout = (props) => {
  return (
    <div className="signout input center-align">
      <h5> Are you sure you want to Sign Out? </h5>
      <form onSubmit={props.signout}>
        <button className="waves-effect waves-light btn">Sign Out</button>
      </form>
    </div>
  );
}

UserSignout.propTypes = {
  user: React.PropTypes.object
};

window.UserSignout = UserSignout;
export default UserSignout;