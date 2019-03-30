import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Redirect,Link
} from 'react-router-dom'

export default class LoginComponent extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      login:false
    }
  }
  onSubmit(e){
    e.preventDefault();

    let username = this.refs.username.value.trim();
    let password =this.refs.password.value.trim();
    console.log("login with", username, password);
    Meteor.loginWithPassword(username, password, (err)=> {
        if (err)
            window.notify("danger", "Login failed: " +(err.reason || err.message));
        else
        {
            console.log("success login");
            //this.props.history.push("/");
            this.setState({"login":true});
            window.location.href="/dashboard"
          }
            //FlowRouter.go("/")
    });

  }
  render(){
    // if (this.state.login) {
    //   return (
    //     <Redirect to={"/dashboard"}/>
    //   )
    // }
    // else{
    return (
        <div className="row">
        <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
              <form id="loginForm" onSubmit={this.onSubmit.bind(this)}>
                <div className="card card-login">
                    <div className="card-header text-center" data-background-color="white">
                      <a href="/" className="simple-text logo-normal">
                        <img alt="Brand" src="/logo.png" height="18"/>

                      </a>

                    </div>
                    <p className="category text-center">

                    </p>
                    <div className="card-content">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="material-icons">face</i>
                            </span>
                            <div className="form-group label-floating">
                                <label className="control-label">User Name</label>
                                <input type="text" ref="username" id="usernameInput" className="form-control"/>
                            </div>
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="material-icons">lock_outline</i>
                            </span>
                            <div className="form-group label-floating">
                                <label className="control-label">Password</label>
                                <input type="password" ref="password" id="passwordInput" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="footer text-center">
                        <button type="submit" id="loginFormSubmitButton" className="btn btn-simple btn-wd btn-lg" styles={{color:"green"}}>Login</button>
                        <br/>
                        <Link to="/register">
                           create account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
  // }
  }
}
