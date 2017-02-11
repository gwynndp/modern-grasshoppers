import React from 'react';
import $ from 'jquery';

class CheckLoggedIn extends React.Component {

  componentDidMount() {
    //useful to double check user auth
    var isAuth = this.props.loadDataFromServer(); //sets state on App so data is accessible

    if (!isAuth && !this.props.isLoggedIn) {
      this.props.router.replace('/signin');
    } else {
      this.props.router.replace('/tasks');
    }
  }

  render() {
    return (
      this.props.children && React.cloneElement(this.props.children, {
        postDataToServer:   this.props.postDataToServer,
        onStartButtonClick: this.props.onStartButtonClick,
        onPauseButtonClick: this.props.onPauseButtonClick,
        onStopButtonClick:  this.props.onStopButtonClick,
        onDeleteButtonClick: this.props.onDeleteButtonClick,
        handleChange:       this.props.handleChange,
        handleSubmit:       this.props.handleSubmit,
        handleUsernameChange: this.props.handleUsernameChange,
        postToSignin:       this.props.postToSignin,
        postToSignup:       this.props.postToSignup,
        signout:            this.props.signout,
        loadDataFromServer: this.props.loadDataFromServer,
        tasks:              this.props.tasks,
        activeTask:         this.props.activeTask,
        currentTask:        this.props.currentTask,
        currentTaskArray:   this.props.currentTaskArray,
        start_time:         this.props.start_time,
        end_time:           this.props.end_time,
        started:            this.props.started,
        secondsElapsed:     this.props.secondsElapsed,
        lastIncrement:      this.props.lastIncrement,
        project:            this.props.project,
        projectArray:       this.props.projectArray,
        incorrectLogin:     this.props.incorrectLogin,
        usernameTaken:      this.props.usernameTaken,
        passwordInSignin:   this.props.passwordInSignin,
        usernameInSignin:   this.props.usernameInSignin,
        usernameInSignup:   this.props.usernameInSignup,
        passwordInSignup:   this.props.passwordInSignup,
        currentUser:        this.props.currentuser,
        isLoggedIn:         this.props.isLoggedIn,
        formatTime:         this.props.formatTime,
        tick:               this.props.tick
      })
    );
  }
}

export default CheckLoggedIn