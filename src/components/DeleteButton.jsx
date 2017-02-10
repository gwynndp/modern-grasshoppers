import React from 'react';

var DeleteButton = (props) => {
	return (
		<div classname="delete btn">
		  <button className="btn btn-default" onClick={(e) => {
		  	props.onDeleteButtonClick(e)
		  }} > DELETE </button>
		</div>
	);

}