import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
// import queryString from  'query-string';
import {
  Redirect
} from 'react-router-dom'

import {Doctor} from '../../api/collections/Doctor'
import {Staff} from '../../api/collections/Staff'
import {Contact} from '../../api/collections/Contact'
import {HeartbeatSensor} from '../../api/collections/HeartBeatSensors'


const instance=null
export default class AddPatient extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    console.log("Add Patient");
    // // const query = queryString.parse(props.location.search);
    // // const params=props.match.params;
     super(props);
    instance=this;
    instance.state={
      waiting:false,
      doctors:[],
      staffs:[],
      contacts:[],
      heartbeatSensors:[]
    }
  }
  componentWillMount(){

    instance.TestTracker = Tracker.autorun(()=> {
      const doctors=Doctor.find({},{name:1}).fetch();
      const staffs=Staff.find({},{name:1}).fetch();
      const contacts=Contact.find({},{name:1}).fetch();
      const heartbeatSensors=HeartbeatSensor.find({reserved: false},{id:1}).fetch();
	  console.log("hearbeat",heartbeatSensors);
      instance.setState({doctors:doctors});
      instance.setState({staffs:staffs});
      instance.setState({contacts:contacts});
      instance.setState({heartbeatSensors:heartbeatSensors});
    });
  }
  componentWillUnmount() {
    instance.TestTracker.stop();
  }
////////////////////////////////////// helpers

////////////////////////////////////// end helpers
////////////////////////////////////// renders methods
  render(){
    if(!Session.get("dataReady"))
    {
      Session.set("waitBackURL","/addpatient");
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
                            <h2 className="card-title text-center">Add New Patient</h2>
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
                                                    <i className="material-icons">date_range</i>
                                                </span>
                                                <input type="date" number="true" aria-required="true" required="true" ref="birthDate" className="form-control" placeholder="birhtdate..."/>
                                            </div>
											<div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">notification_importants</i>
                                                </span>
                                                <input type="number" number="true" aria-required="true" required="true" ref="lowerThreshold" className="form-control" placeholder="lower..."/>
                                            </div>
											<div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="material-icons">add_alert</i>
                                                </span>
                                                <input type="number" number="true" aria-required="true" required="true" ref="upperThreshold" className="form-control" placeholder="upper..."/>
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
                                                <label> Select Primary Doctor</label>
                                              </span>

                                                <select class="btn btn-primary btn-round" ref="primaryDoctor"   title="Select Contact Relation">
                                                  <option class="bs-title-option" value="">Select Primary Doctor</option>
                                                  {instance.state.doctors.map((doctor)=>{
                                                    return (
                                                      <option value={JSON.stringify({name:doctor.name,id:doctor._id})}>{doctor.name}</option>
                                                    )
                                                  })}

                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                <i class="material-icons">contacts</i>
                                                <label> Select Secondary Staff</label>
                                              </span>

                                                <select class="btn btn-primary btn-round" ref="secondaryStaff"   title="Select Contact Relation">
                                                  <option class="bs-title-option" value="">Select Secondary Staff</option>
                                                  {instance.state.staffs.map((staff)=>{
                                                    return (
                                                      <option value={JSON.stringify({name:staff.name,id:staff._id})}>{staff.name}</option>
                                                    )
                                                  })}

                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                <i class="material-icons">contacts</i>
                                                <label> Select Contact</label>
                                              </span>

                                                <select class="btn btn-primary btn-round" ref="contact"   title="Select Contact Relation">
                                                  <option class="bs-title-option" value="">Select Contact</option>
                                                  {instance.state.contacts.map((contact)=>{
                                                    return (
                                                      <option value={JSON.stringify({name:contact.name,id:contact._id})}>{contact.name}</option>
                                                    )
                                                  })}

                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                <i class="material-icons">favorite</i>
                                                <label> Select heartbeat sensor</label>
                                              </span>

                                                <select class="btn btn-primary btn-round" ref="sensor"   title="Select heartbeat sensor">
                                                  <option class="bs-title-option" value="">Select heartbeat sensor</option>
                                                  {instance.state.heartbeatSensors.map((sensor)=>{
                                                    return (
                                                      <option value={JSON.stringify({id:sensor.id,_id:sensor._id})}>{sensor.id}</option>
                                                    )
                                                  })}

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
  let birthDate = this.refs.birthDate.value.trim();
  let lowerThreshold = this.refs.lowerThreshold.value.trim();
  let upperThreshold = this.refs.upperThreshold.value.trim();
  
  let address =this.refs.address.value.trim();
  let primaryDoctor = this.refs.primaryDoctor.value;
  let secondaryStaff = this.refs.secondaryStaff.value;
  let contact = this.refs.contact.value;
  let sensor = this.refs.sensor.value;
  if(primaryDoctor.length<=0){
    window.notify("danger", "you have to select a primary Doctor");
    return;
  }
  if(secondaryStaff.length<=0){
    window.notify("danger", "you have to select a secondary Staff");
    return;
  }
  if(contact.length<=0){
    window.notify("danger", "you have to select a Contact");
    return;
  }
  if(sensor.length<=0){
    window.notify("danger", "you have to select a sensor");
    return;
  }


  const patient={
    "name": name,
    "username": username,
    "email":email,
    "password": password,
    "phone":phone,
	"birthDate":birthDate,
	"upperThreshold":upperThreshold,
	"lowerThreshold":lowerThreshold,
    "address":address,
    "primaryDoctor":JSON.parse(primaryDoctor),
    "secondaryStaff":JSON.parse(secondaryStaff),
    "contact":JSON.parse(contact),
    "sensor":JSON.parse(sensor),
  }

  instance.setState({waiting:true});
  Meteor.call("createPatient",patient,(err,result)=>{

    instance.setState({waiting:false});
    if(err){
      window.notify("danger", err.reason);
      return;
    }
    instance.refs.name.value="";
    instance.refs.username.value="";
    instance.refs.email.value="";
    instance.refs.password.value="";
    instance.refs.phone.value="";
    instance.refs.address.value="";
    instance.refs.primaryDoctor.value="";
    instance.refs.secondaryStaff.value="";
    instance.refs.contact.value="";
    instance.refs.sensor.value="";
      window.notify("success", "New Contact successfully Created");

  })
}

}
