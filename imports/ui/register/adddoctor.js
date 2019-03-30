import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
// import queryString from  'query-string';
import {
  Redirect
} from 'react-router-dom'


const instance=null
export default class AddDoctor extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    console.log("Add Doctor");
    // // const query = queryString.parse(props.location.search);
    // // const params=props.match.params;
     super(props);
    instance=this;
    instance.state={
      waiting:false,
    }
  }
  componentWillMount(){

    // instance.TestTracker = Tracker.autorun(()=> {
    // });
  }
  componentWillUnmount() {
    // instance.TestTracker.stop();
  }
////////////////////////////////////// helpers

////////////////////////////////////// end helpers
////////////////////////////////////// renders methods
  render(){
    if(!Session.get("dataReady"))
    {
      Session.set("waitBackURL","/adddoctor");
      return(
        <Redirect to={"/wait"}/>
      )
    }
    else{
      return (

        <div className="row">
                    <div className="col-md-6">
                      {instance.state.waiting?
                      <h3><i className="fa fa-spinner fa-pulse"></i> please wait...</h3>
                    :
                        <div className="card card-signup">
                            <h2 className="card-title text-center">Add New Doctor</h2>
                            <div className="row">

                                <div className="col-md-12">

                                    <form id="loginForm" onSubmit={this.onSubmit.bind(this)}>
                                        <div className="card-content">
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">face</i>
                                                </span>
                                                <input type="text" ref="name" className="form-control" placeholder="Name..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">face</i>
                                                </span>
                                                <input type="text" ref="username" className="form-control" placeholder="user Name..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">email</i>
                                                </span>
                                                <input type="text" ref="email" className="form-control" placeholder="Email..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">lock_outline</i>
                                                </span>
                                                <input type="password" ref="password" placeholder="Password..." className="form-control" />
                                            </div>
                                        </div>
                                        <div className="footer text-center">
                                          <button type="submit" id="registerFormSubmitButton" className="btn  btn-lg btn-success" >Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>

      );
    }
  }
//////////////////////////////////////// end render
/////////////////////////////////////////// events
onSubmit(e){
  e.preventDefault();
  instance.setState({waiting:true});
  let name = this.refs.name.value.trim();
  let username = this.refs.username.value.trim();
  let email = this.refs.email.value.trim();
  let password =this.refs.password.value.trim();


  const doctor={
    "name": name,
    "username": username,
    "email":email,
    "password": password,
  }
  this.refs.name.value="";
  this.refs.username.value="";
  this.refs.email.value="";
  this.refs.password.value="";

  Meteor.call("createDoctor",doctor,(err,result)=>{
    instance.setState({waiting:false});
    if(err){
      window.notify("danger", err.reason);
      return;
    }
      window.notify("success", "New doctor successfully Created");

  })
}

}
