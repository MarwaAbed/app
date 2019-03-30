import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import {
  Redirect
} from 'react-router-dom'

export default class NavTop extends React.Component{
  constructor(props){
    super(props);

      this.state={
        currentUser:(!!Meteor.user())?Meteor.user():{},
        login:true

      }
  }

  componentDidMount(){
    this.NavTopTracker = Tracker.autorun(()=> {
      const currentUser=(!!Meteor.user())?Meteor.user():{}
      //console.log('current user :',currentUser);
      this.setState({currentUser:currentUser});
    });
  }
	componentWillUnmount() {
		//this.state.subscription.tasks.stop();
		this.NavTopTracker.stop();
	}
  conditionRender(){

      if (!!Meteor.userId()){
      return (  <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <p><i className="material-icons">person</i> {this.state.currentUser.username} <span className="caret"></span></p>
          </a>
          <div className="dropdown-menu">
            <ul className="nav">
              <li><a href="#" onClick={this.logoutClicked.bind(this)} id="logout"><i className="fa fa-lock"></i> Logout</a></li>
            </ul>
          </div>
        </li>
        );
      }
      else{
      return ;
    }

  }
  render(){
    // if (!this.state.currentUser) {
    //   return (
    //     <Redirect to={"/login"}/>
    //   )
    // }
    // else{
    return (
      <nav className="navbar navbar-transparent navbar-absolute">
        <div className="container-fluid">
          <div className="navbar-minimize">
            <button id="minimizeSidebar" className="btn btn-round btn-white btn-fill btn-just-icon">
              <i className="material-icons visible-on-sidebar-regular">more_vert</i>
              <i className="material-icons visible-on-sidebar-mini">view_list</i>
            </button>
          </div>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand"  > {this.title()} </a>
          </div>



          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                      <i className="material-icons">notifications</i>
                      <span className="notification">3</span>
                      <p className="hidden-lg hidden-md">
                          Notifications
                          <b className="caret"></b>
                      </p>
                  </a>
                  <ul className="dropdown-menu">
                      <li>
                          <a href="#">Patient1 Heartbeat is over threshold</a>
                      </li>
                      <li>
                          <a href="#">Patient2 Heartbeat return to normal</a>
                      </li>
                      <li>
                          <a href="#">patient3 Heartbeat is not stable</a>
                      </li>

                  </ul>
              </li>
              {this.conditionRender()}

            </ul>
            <form className="navbar-form navbar-right" role="search">
                  <div className="form-group form-search is-empty">
                      <input type="text" className="form-control" placeholder="Search"/>
                      <span className="material-input"></span>
                      <span className="material-input"></span>
                  </div>
                  <button type="submit" className="btn btn-white btn-round btn-just-icon">
                      <i className="material-icons">search</i>
                      <div className="ripple-container"></div>
                  </button>
              </form>
          </div>

        </div>
      </nav>

    );
  // }
  }
  title()
  {
    return Session.get("viewtitle") || "Smart Health Care";
  }
  logoutClicked(event){
    event.preventDefault();
        Meteor.logout((err)=> {
            if (err) alert(err.message)
            //this.props.history.push("/login");
            this.setState({login:false})
            window.location.href="/login"
        });
  }
}
