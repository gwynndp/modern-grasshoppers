import React from 'react';

var UserSignUp = (props) => {
  return (
    <div className="signup input">
      <h4 className='username'>Sign Up:</h4>
      <form onSubmit={props.postToSignup}>
        <input type='text' id='username' placeholder = 'username' name='usernameInSignup' onChange={props.handleUsernameChange} required/>
        <input type='password' id='userpw' placeholder = 'password' name='passwordInSignup' onChange={props.handleUsernameChange} required/>
        <button className="btn">Create Account</button>
        <IncorrectLogin displayMessage={props.usernameTaken} message={'Username is taken'}/>
      </form>
    </div>
  );
}

UserSignUp.propTypes = {
  user: React.PropTypes.object
};

window.UserSignUp = UserSignUp;
