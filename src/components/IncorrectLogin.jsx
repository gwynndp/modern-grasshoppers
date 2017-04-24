import React from 'react';

var IncorrectLogin = (props) => {
  var el = null
  if(props.displayMessage) {
    el = (
      <div>
        <p>{props.message}</p>
      </div>
    );
  }
  return el;
}

window.IncorrectLogin = IncorrectLogin;