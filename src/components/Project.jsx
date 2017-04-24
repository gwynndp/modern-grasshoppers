import React from 'react';

var Project = (props) => {
  return (
    <div className="project">
    <p>{props.projectName}</p>
    </div>
    );
}
// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.Project = Project;