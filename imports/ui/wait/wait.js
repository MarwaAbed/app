import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Redirect
} from 'react-router-dom'


//import {Staff} from "../../api/collections/Staff";
//import {Patients} from "../../api/collections/Patient";

export default class Wait extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ready:false
    }
  }
  componentWillMount(){
    this.TestTracker = Tracker.autorun(()=> {
      if ( Meteor.users.find().count() > 0)
        this.setState({ready:true})
    });

  }
  
  componentWillUnmount() {
    this.TestTracker.stop();
  }
  render(){
    if(this.state.ready)
    {
      Session.set("dataReady","ready")
      const back=Session.get("waitBackURL")?Session.get("waitBackURL"):"/";
      return(
      <Redirect to={Session.get("waitBackURL")}/>
    )
    }
    else{
    return (
      <div className="jumbotron">
        <h1><i className="fa fa-spinner fa-pulse"></i> Loading...</h1>
      </div>
    );
  }
}
}
