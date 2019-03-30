import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
import queryString from  'query-string';
import {
  Redirect
} from 'react-router-dom'

import {EmergencyList} from '../../../api/collections/EmergencyList'
import {UserRoles} from '../../../api/collections/Constants';
import MyModal from '../../generic/modal/modal'

import './emergencylist.css'


const instance=null
export default class EmergencyListComponent extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    debugger;
    const query = queryString.parse(props.location.search);
    const params=props.match.params;
    super(props);
    instance=this;
    instance.state={
      emergencylist:[],
      tempEmergencyList:[],
	  currentUser:(!!Meteor.user())?Meteor.user():{}
    }
  }
  componentWillMount(){

    instance.TestTracker = Tracker.autorun(()=> {
      const emergencylist=EmergencyList.find().fetch();
      instance.setState({emergencylist:emergencylist});
	  const currentUser=(!!Meteor.user())?Meteor.user():{}
      //console.log('current user :',currentUser);
      this.setState({currentUser:currentUser});
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
      Session.set("waitBackURL","/emergencylist");
      return(
        <Redirect to={"/wait"}/>
      )
    }
    else{
		const currentUser = this.state.currentUser;
		if (!currentUser || ! currentUser.profile) return false;
    userCanModelAddUser=(currentUser.profile.role === UserRoles.admin.value)
	  staffCanAddUser=(currentUser.profile.role === UserRoles.staff.value)
  	doctorCanAddUser=(currentUser.profile.role === UserRoles.doctor.value)
	let addEmergency=<span></span>
	if(userCanModelAddUser || staffCanAddUser || doctorCanAddUser)
	{
		addEmergency=(<button  className="btn btn-primary pull-right" data-toggle="modal" data-target="#MyModal">
							Add new Emergency List
						<div className="ripple-container"></div>
					  </button>)
	}
      return (
        [
          <MyModal>
            <div className="body">
              <div id="myDIV" class="header">
                <h2 style={{margin:5}}>Emergency List</h2>
                  <input type="text" ref="title"  placeholder="Title..."/>
                  <input type="text" ref="description"  placeholder="description..."/>
                  <input type="text" ref="listItem" placeholder="list item..."/>

                  <span onClick={instance.addTempEmergency.bind(this)} class="addBtn">Add</span>
              </div>
              <ul id="myUL">
                {instance.state.tempEmergencyList.map((temp)=>{
                  return (
                    <li>{temp}<span class="close" onClick={instance.removeTemp.bind(instance,temp)}>×</span></li>
                  )
                })}

              </ul>
              <button onClick={instance.saveEmergencyList.bind(instance)} className="btn btn-primary"> save</button>
            </div>
          </MyModal>
          ,
          addEmergency
          ,

          <div className="col-md-8 col-md-offset-2">
            <h3 className="title text-center">Emergency List</h3>
            <br/>
            <div className="nav-center">
                <ul className="nav nav-pills nav-pills-success nav-pills-icons" role="tablist">
                  {instance.state.emergencylist.map((emergency,index)=>{
                    return (
                      <li key={emergency._id} className={index===0?"active":""}>
                          <a href={"#"+emergency._id} role="tab" data-toggle="tab" aria-expanded="false">
                              <i className="material-icons">info</i> {emergency.title}
                          </a>
                      </li>
                    );
                  })}
                </ul>
            </div>
            <div className="tab-content">
              {instance.state.emergencylist.map((emergency,index)=>{
                return (
                  <div className={index===0?"tab-pane active":"tab-pane"} id={emergency._id}>
                      <div className="card">
                          <div className="card-header">
                              <h4 className="card-title">{emergency.title}</h4>
                              <p className="category">
                                  {emergency.description}
                              </p>
                          </div>
                          <div className="card-content">
                            <ul>
                              {emergency.list.map((item,index)=>{
                                return(
                                  <li key={index}>
                                    {item}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                      </div>
                  </div>
                )
              })}


            </div>
        </div>
      ]
      );
    }
  }
//////////////////////////////////////// end render
/////////////////////////////////////////// events
addTempEmergency(event){
  const listTemp=instance.refs.listItem.value.trim();
  const tempEmergencyList=instance.state.tempEmergencyList;
  tempEmergencyList.push(listTemp);
  instance.setState({tempEmergencyList:tempEmergencyList})
}
removeTemp(temp){
  const tempEmergencyList=instance.state.tempEmergencyList;
  tempEmergencyList=tempEmergencyList.filter(function(item) {
      return item !== temp
  });
  instance.setState({tempEmergencyList:tempEmergencyList})
}
saveEmergencyList(event){
  event.preventDefault();

  let title = instance.refs.title.value.trim();
  let description = instance.refs.description.value.trim();
  let list = instance.state.tempEmergencyList;
  if(title.length<=0 || description.length<=0 || list.length<=0){
    window.notify("danger", "you have fill all fields");
    return;
  }
  EmergencyList.insert({
    title:title,
    description:description,
    list:list
  });
  instance.refs.title.value="";
  instance.refs.description.value="";
  instance.setState({tempEmergencyList:[]});
  window.notify("success","Emergency List inserted ")
}
}
