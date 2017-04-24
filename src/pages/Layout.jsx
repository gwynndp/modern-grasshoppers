import React from 'react';

var TasksLayout = (props) => (
      <div className='container content'>

        <div>
          <UserSignout
            signout={props.signout}
          />
        </div>

        <div className='container projects'>
          <ProjectMenu
            projectArray = {props.projectArray}
          />
        </div>

        <div className='container form'>
          <TaskEntry
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
          />
        </div>

        <div className="container tasks">
          <CurrentTasksView
            tasks={props.currentTaskArray}
            onStartButtonClick={props.onStartButtonClick}
            onStopButtonClick={props.onStopButtonClick}
          />
        </div>

        <div className='container tasks'>
          <CompletedTaskList
            tasks={props.tasks}
            onDeleteButtonClick={props.onDeleteButtonClick}
          />
        </div>
      </div>
)
export default TasksLayout;