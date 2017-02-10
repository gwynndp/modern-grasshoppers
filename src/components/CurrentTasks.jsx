import React from 'react';
import moment from 'moment';

var CurrentTasks = (props) => {

  return (
    <div className="current-task grey lighten-5">
        <div className="task-entry-task">Task: <span>{props.task}</span></div>
        <div className="task-entry-project">Project: <span>{props.project}</span></div>
        <div className="task-entry-date">Start: <span>{moment(props.start_time).format("ddd, MMM Do YY, h:mm a")}</span></div>
    </div>
  );
};

CurrentTasks.propTypes = {
  task: React.PropTypes.object
};

window.CurrentTasks = CurrentTasks;
