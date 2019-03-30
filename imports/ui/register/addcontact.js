import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
// import queryString from  'query-string';
import {
  Redirect
} from 'react-router-dom'


const instance=null
export default class AddContact extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    console.log("Add Contact");
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
      Session.set("waitBackURL","/addcontact");
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
                            <h2 className="card-title text-center">Add New Patient Contanct</h2>
                            <div className="row">

                                <div className="col-md-12">

                                    <form id="loginForm" onSubmit={this.onSubmit.bind(this)}>
                                        <div className="card-content">
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">face</i>
                                                </span>
                                                <input type="text" ref="name" aria-required="true" required="true" className="form-control" placeholder="Name..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">face</i>
                                                </span>
                                                <input type="text" ref="username" min="4" aria-required="true" required="true" className="form-control" placeholder="user Name..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">email</i>
                                                </span>
                                                <input type="email" email="true" ref="email" aria-required="true" required="true" className="form-control" placeholder="Email..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">lock_outline</i>
                                                </span>
                                                <input type="password" min="6" aria-required="true" required="true" ref="password" placeholder="Password..." className="form-control" />
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i class="material-icons">contact_phone</i>
                                                </span>
                                                <input type="number" number="true" aria-required="true" required="true" ref="phone" className="form-control" placeholder="Phone..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">place</i>
                                                </span>
                                                <input type="text" ref="address" className="form-control" placeholder="Address..."/>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                <i class="material-icons">contacts</i>
                                              </span>

                                                <select class="btn btn-primary btn-round" ref="relation"   title="Select Contact Relation">
                                                  <option class="bs-title-option" value="">Select Contact Relation</option>
                                                  <option value="Father">Father</option>
                                                  <option value="Mother">Mother</option>
                                                  <option value="Brother">Brother</option>
                                                  <option value="Sister">Sister</option>
                                                  <option value="Son">Son</option>
                                                  <option value="Daughter">Daughter</option>
                                                  <option value="Cousin">Cousin</option>
                                                  <option value="Cousins">Cousins</option>
                                                </select>
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

  let name = this.refs.name.value.trim();
  let username = this.refs.username.value.trim();
  let email = this.refs.email.value.trim();
  let password =this.refs.password.value.trim();
  let phone = this.refs.phone.value.trim();
  let address =this.refs.address.value.trim();
  let relation = this.refs.relation.value;
  if(relation.length<=0){
    window.notify("danger", "you have to select a relation");
    return;
  }


  const contact={
    "name": name,
    "username": username,
    "email":email,
    "password": password,
    "phone":phone,
    "address":address,
    "relation":relation
  }
  this.refs.name.value="";
  this.refs.username.value="";
  this.refs.email.value="";
  this.refs.password.value="";
  this.refs.phone.value="";
  this.refs.address.value="";
  this.refs.relation.value="";
  instance.setState({waiting:true});
  Meteor.call("createContact",contact,(err,result)=>{
    instance.setState({waiting:false});
    if(err){
      window.notify("danger", err.reason);
      return;
    }
      window.notify("success", "New Contact successfully Created");

  })
}

}
