import React from 'react';

var ProjectsList = (props) => {

  return (
    <div className="projects-list">
        <div className="projects">{props.project}</div>
    </div>
  );
};


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.ProjectsList = ProjectsList;
