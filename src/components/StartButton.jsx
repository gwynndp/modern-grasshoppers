import React from 'react';

var StartButton = (props) => {
  return (
    <div className="start timer">
      <button className = "btn waves-effect waves-light" onClick={(e) => {
        props.onStartButtonClick(e)
      }} > START </button>
    </div>
  );
}

window.StartButton = StartButton;