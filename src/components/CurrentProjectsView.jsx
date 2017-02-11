import React from 'react';

var CurrentTasksView = (props) => {
  return (
    <div className="task list entry">
    <h4>Current Tasks:</h4>
    {props.tasks.map((task) =>
      <div className="list-body card">
        <CurrentTasks
          key={task._id}
          task={task.task}
          project={task.project}
          start_time = {task.start_time}
          secondsElapsed={task.secondsElapsed}
        />
        <StopButton onStopButtonClick = {props.onStopButtonClick.bind(this, task)}/>
        <StartButton onStartButtonClick = {props.onStartButtonClick.bind(this, task)}/>
      </div>
    )}
    </div>
  );
}

CurrentTasksView.propTypes = {
  tasks: React.PropTypes.array
};

window.CurrentTasksView = CurrentTasksView;