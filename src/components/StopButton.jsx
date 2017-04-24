import React from 'react';

var StopButton = (props) => {
  return (
    <div className="stop timer">
      <button className="btn waves-effect waves-light right" onClick = {(e) => {
        props.onStopButtonClick(e)
      }}> STOP</button>
    </div>
  );
}

window.StopButton = StopButton;