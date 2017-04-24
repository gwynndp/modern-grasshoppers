import React from 'react';
import Payment from '../components/Payment.jsx';


var TaskEntry = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input id='enterTask' type='text' placeholder = 'What do you need to do?' onChange={props.handleChange} value={props.activeTask} required/>
        <div className='buttons'>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

TaskEntry.propTypes = {
  task: React.PropTypes.string
};

window.TaskEntry = TaskEntry;
