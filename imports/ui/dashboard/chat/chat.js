import {Meteor} from 'meteor/meteor'

import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
import queryString from  'query-string';
import {
  Redirect
} from 'react-router-dom'

import './chat.css'
import {Message} from "../../../api/collections/Messages";
import {Doctor} from "../../../api/collections/Doctor";
import {Staff} from "../../../api/collections/Staff";
import {Patient} from "../../../api/collections/Patient";
import {Contact} from "../../../api/collections/Contact";
import {User} from '../../../api/collections/User';


const instance=null
export default class Chat extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    const query = queryString.parse(props.location.search);
    const params=props.match.params;
    super(props);
    instance=this;
    instance.state={
      messages:[],
      doctors:[],
      staffs:[],
      patients:[],
      contacts:[],
	  admins:[],
      user:{
        name:"",
        _id:""
      },
      userID:Meteor.userId(),
      currentUser:(!!Meteor.user())?Meteor.user():{},
      loadPatientCompleted:false
    }
  }
  componentWillMount(){

    instance.TestTracker = Tracker.autorun(()=> {
      if(!Session.get("dataReady"))
        return;
      instance.setState({loadPatientCompleted:false})
      if(instance.state.currentUser.profile.role==="doctor")
      {
        const doctors=Doctor.find({ _id: { $ne: instance.state.currentUser.profile.id } },{name:1}).fetch();
        instance.setState({doctors:doctors})
        const staffs=Staff.find({},{name:1}).fetch();
        instance.setState({staffs:staffs})
        const patients=Patient.find({},{name:1}).fetch();
        instance.setState({patients:patients})
        const contacts=Contact.find({},{name:1}).fetch();
        instance.setState({contacts:contacts})
		
		const users=User.find({"profile.role":"admin"},{"profile.name":1}).fetch();
		users=users.map((user)=>{
			temp={
				email:"",
				name:user.profile.name,
				_id:user.profile.id,
				username:user.username
			};
			user=temp;		
		  return user;
		});
        instance.setState({admins:users})
      }
	  else if(instance.state.currentUser.profile.role==="admin")
      {
        const doctors=Doctor.find({},{name:1}).fetch();
        instance.setState({doctors:doctors})
        const staffs=Staff.find({},{name:1}).fetch();
        instance.setState({staffs:staffs})
        const patients=Patient.find({},{name:1}).fetch();
        instance.setState({patients:patients})
        const contacts=Contact.find({},{name:1}).fetch();
        instance.setState({contacts:contacts})
		debugger;
		
				
		const users=User.find({"profile.role":"admin"},{"profile.name":1}).fetch();
		users=users.map((user)=>{
			temp={
				email:"",
				name:user.profile.name,
				_id:user.profile.id,
				username:user.username
			};
			user=temp;		
		  return user;
		});
        instance.setState({admins:users})
      }
      else if(instance.state.currentUser.profile.role==="staff")
      {
        const doctors=Doctor.find({},{name:1}).fetch();
        instance.setState({doctors:doctors})
        const staffs=Staff.find({ _id: { $ne: instance.state.currentUser.profile.id } },{name:1}).fetch();
        instance.setState({staffs:staffs})
        const patients=Patient.find({},{name:1}).fetch();
        instance.setState({patients:patients})
        const contacts=Contact.find({},{name:1}).fetch();
        instance.setState({contacts:contacts})
		
				
		const users=User.find({"profile.role":"admin"},{"profile.name":1}).fetch();
		users=users.map((user)=>{
			temp={
				email:"",
				name:user.profile.name,
				_id:user.profile.id,
				username:user.username
			};
			user=temp;		
		  return user;
		});
        instance.setState({admins:users})
      }
      else if(instance.state.currentUser.profile.role==="patient")
      {
        const patient=Patient.findOne({_id:instance.state.currentUser.profile.id },{primaryDoctor:1,secondaryStaff:1,contact:1});
        if(patient)
        {

        const doctors=Doctor.find({_id:patient.primaryDoctor.id},{name:1}).fetch();
        instance.setState({doctors:doctors})
        const staffs=Staff.find({_id:patient.secondaryStaff.id},{name:1}).fetch();
        instance.setState({staffs:staffs})
        const patients=[];
        instance.setState({patients:patients})
        const contacts=Contact.find({_id:patient.contact.id},{name:1}).fetch();
        instance.setState({contacts:contacts})
		
				
		const users=User.find({"profile.role":"admin"},{"profile.name":1}).fetch();
		users=users.map((user)=>{
			temp={
				email:"",
				name:user.profile.name,
				_id:user.profile.id,
				username:user.username
			};
			user=temp;		
		  return user;
		});
        instance.setState({admins:users})
        }
      }
      else if(instance.state.currentUser.profile.role==="contact")
      {
        const patient=Patient.findOne({"contact.id":instance.state.currentUser.profile.id },{primaryDoctor:1,secondaryStaff:1});
        if(patient)
        {

        const doctors=Doctor.find({_id:patient.primaryDoctor.id},{name:1}).fetch();
        instance.setState({doctors:doctors})
        const staffs=Staff.find({_id:patient.secondaryStaff.id},{name:1}).fetch();
        instance.setState({staffs:staffs})
        const patients=[patient];
        instance.setState({patients:patients})
		
				
		const users=User.find({"profile.role":"admin"},{"profile.name":1}).fetch();
		users=users.map((user)=>{
			temp={
				email:"",
				name:user.profile.name,
				_id:user.profile.id,
				username:user.username
			};
			user=temp;		
		  return user;
		});
        instance.setState({admins:users})
      }
      }


      instance.setState({loadPatientCompleted:true})

      //}
      })
    instance.runMessagesTracker();
  }
  componentWillUnmount() {
    instance.TestTracker.stop();
    instance.MessageTracker.stop();
  }

  componentDidMount(){


  }
////////////////////////////////////// helpers
runMessagesTracker(userID=null){
  instance.MessageTracker=Tracker.autorun(()=>{
    const fromId=instance.state.userID;
    const toId=userID?userID:instance.state.user._id;

    // if(instance.state.patient){
      const messages=Message.find(
        {
            $or:[
            { $and :[{from:toId},{to:fromId}]},
            { $and :[{from:fromId},{to:toId}]}
            ]
          }).fetch();
        //{$or:[{from:instance.state.patient._id},{to:instance.state.patient._id}]}).fetch();
      instance.setState({messages:messages})
      var scroll=document.getElementById("chatlist");
      if(!!scroll)
      scroll.scrollTop = scroll.scrollHeight;
  })
}
////////////////////////////////////// end helpers
////////////////////////////////////// renders methods
  render(){
    if(!Session.get("dataReady"))
    {
      Session.set("waitBackURL","/chat");
      return(
        <Redirect to={"/wait"}/>
      )
    }
    else{
      // let sender=true;
      return (
        <div className="row">
          <div class="col-md-3">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Users Groups</h4>
                </div>
                <div class="card-content">
                    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
                                    <h4 class="panel-title">
                                        Doctors
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style={{height: 0}}>
                                <div class="panel-body">
                                  <table className="table table-hover table-fixed">
                                      <thead className="text-success">
                                        <tr>
                                          <th>Name</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {instance.state.loadPatientCompleted?
										
                                        instance.state.doctors.map((doctor)=>{
											debugger;
                                          return(
                                            <tr onClick={instance.userSelect.bind(instance,doctor)}>
                                              <td>{doctor.name}</td>
                                            </tr>
                                          )
                                        })
                                        :
                                        <h3><i className="fa fa-spinner fa-pulse"></i> Loading doctors...</h3>
                                      }
                                      </tbody>
                                  </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingTwo">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <h4 class="panel-title">
                                        Staffs
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" aria-expanded="false">
                                <div class="panel-body">
                                  <table className="table table-hover table-fixed">
                                      <thead className="text-success">
                                        <tr>
                                          <th>Name</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {instance.state.loadPatientCompleted?
                                        instance.state.staffs.map((staff)=>{
                                          return(
                                            <tr onClick={instance.userSelect.bind(instance,staff)}>
                                              <td>{staff.name}</td>
                                            </tr>
                                          )
                                        })
                                        :
                                        <h3><i className="fa fa-spinner fa-pulse"></i> Loading staffs...</h3>
                                      }
                                      </tbody>
                                  </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingThree">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <h4 class="panel-title">
                                        Patients
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree" aria-expanded="false">
                                <div class="panel-body">
                                  <table className="table table-hover table-fixed">
                                      <thead className="text-success">
                                        <tr>
                                          <th>Name</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {instance.state.loadPatientCompleted?
                                        instance.state.patients.map((patient)=>{
                                          return(
                                            <tr onClick={instance.userSelect.bind(instance,patient)}>
                                              <td>{patient.name}</td>
                                            </tr>
                                          )
                                        })
                                        :
                                        <h3><i className="fa fa-spinner fa-pulse"></i> Loading patients...</h3>
                                      }
                                      </tbody>
                                  </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingFour">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    <h4 class="panel-title">
                                        Patients Contacts
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour" aria-expanded="false">
                                <div class="panel-body">
                                  <table className="table table-hover table-fixed">
                                      <thead className="text-success">
                                        <tr>
                                          <th>Name</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {instance.state.loadPatientCompleted?
                                        instance.state.contacts.map((contact)=>{
                                          return(
                                            <tr onClick={instance.userSelect.bind(instance,contact)}>
                                              <td>{contact.name}</td>
                                            </tr>
                                          )
                                        })
                                        :
                                        <h3><i className="fa fa-spinner fa-pulse"></i> Loading contacts...</h3>
                                      }
                                      </tbody>
                                  </table>
                                </div>
                            </div>
                        </div>
						<div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOne">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseZero" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
                                    <h4 class="panel-title">
                                        Admin
                                        <i class="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div id="collapseZero" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style={{height: 0}}>
                                <div class="panel-body">
                                  <table className="table table-hover table-fixed">
                                      <thead className="text-success">
                                        <tr>
                                          <th>Name</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {instance.state.loadPatientCompleted?
										
                                        instance.state.admins.map((admin)=>{
											debugger;
                                          return(
                                            <tr onClick={instance.userSelect.bind(instance,admin)}>
                                              <td>{admin.name}</td>
                                            </tr>
                                          )
                                        })
                                        :
                                        <h3><i className="fa fa-spinner fa-pulse"></i> Loading admins...</h3>
                                      }
                                      </tbody>
                                  </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {instance.state.user.name.length>0?
        <div className="col-lg-9">
          <h2> chat with {instance.state.user.name}</h2>
          <div className="frame">
            <ul id="chatlist" className="chat">
              {instance.state.messages.map((message)=>{
                sender=(message.from===Meteor.userId());
              if(sender)
                  return (
                  <li key={message._id} tabIndex="1" style={{width:"100%",marginTop: 25}}>
                      <div className="msj macro">
                      <div className="avatar"><img className="img-circle" style={{width:"100%"}} src="/assets/img/from.jpg" /></div>
                          <div className="text text-l">
                              <p>{message.text}</p>
                              <p><small>{message.dateTime}</small></p>
                          </div>
                      </div>
                  </li>);
              else
              return (
                  <li key={message._id} tabIndex="1" style={{width:"100%",marginTop: 25}}>
                      <div className="msj-rta macro">
                          <div className="text text-r">
                              <p>{message.text}</p>
                              <p><small>{message.dateTime}</small></p>
                          </div>
                      <div className="avatar" style={{padding:"0px 0px 0px 10px !important"}}>
                        <img className="img-circle" style={{width:"100%"}} src="/assets/img/to.jpg" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>
                <div className="msj-rta macro" style={{margin:"auto",width:"100%"}}>
                    <div className="text text-r" style={{background:"whitesmoke !important",width:"100%"}}>
                      <form id="loginForm" onSubmit={this.onSubmit.bind(this)}>
                        <input ref="messageText" className="mytext" style={{width: "100%", color:"black"}} placeholder="Type a message"/>
                        {/* <button type="submit" >send</button> */}
                      </form>
                    </div>
                </div>
            </div>
          </div>
        </div>
        :""}
      </div>
      );
    }
  }
//////////////////////////////////////// end render
/////////////////////////////////////////// events
onMessageChange(event){

}
onSubmit(e){
  e.preventDefault();

  let text = this.refs.messageText.value.trim();
  message={
    text:text,
    from:Meteor.userId(),
    to:instance.state.toID,
    dateTime:new Date().toLocaleString()
  }
  Message.insert(message);
  this.refs.messageText.value="";
}
userSelect(user){
  debugger;
  instance.setState({user:user})
  const toID=User.findOne({"profile.id":user._id},{"profile.id":1})
  instance.setState({toID:toID._id})
  instance.runMessagesTracker(toID._id);
}
}
