import React from 'react';

var UserSignIn = (props) => {
  return (
    <div className="signin input">
      <h4 className='username'>Sign In:</h4>
      <form onSubmit={props.postToSignin}>
        <input type='text' id='username' placeholder = 'username' name='usernameInSignin' onChange={props.handleUsernameChange} required/>
        <input type='password' id='userpw' placeholder = 'password' name='passwordInSignin' onChange={props.handleUsernameChange} required/>
        <button className="btn">Sign In</button>
        <IncorrectLogin displayMessage={props.incorrectLogin} message={'Not a valid username and password combination'}/>
      </form>
    </div>
  );
}

UserSignIn.propTypes = {
  user: React.PropTypes.object
};

window.UserSignIn = UserSignIn;