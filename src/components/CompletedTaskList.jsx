import React from 'react';

var CompletedTaskList = (props) => {
  return (
    <div className="task list">
    <h4>Completed Tasks:</h4>
    {props.tasks.map((task) =>
      <div>
        <CompletedTaskListItems
          task={task.task}
          time={task.total_time}
          project = {task.project}
          start_time = {task.start_time}
          end_time = {task.end_time}
          key={task._id}
          onDeleteButtonClick = {props.onDeleteButtonClick}
        />
      </div>
    )}
    </div>
  );
}

CompletedTaskList.propTypes = {
  tasks: React.PropTypes.array
};


window.CompletedTaskList = CompletedTaskList;
