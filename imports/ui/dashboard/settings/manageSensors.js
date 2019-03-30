import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
// import queryString from  'query-string';
import {
  Redirect
} from 'react-router-dom'

import MyModal from "../../generic/modal/modal"

import {HeartbeatSensor} from '../../../api/collections/HeartBeatSensors.js'


const instance=null
export default class ManageSensors extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    // const query = queryString.parse(props.location.search);
    // const params=props.match.params;
    super(props);
    instance=this;
    instance.state={
      heartbeatSensors:[],
    }
  }
  componentWillMount(){

    instance.TestTracker = Tracker.autorun(()=> {
      heartbeatSensor=HeartbeatSensor.find().fetch();
      instance.setState({heartbeatSensor:heartbeatSensor})
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
      Session.set("waitBackURL","/managesensors");
      return(
        <Redirect to={"/wait"}/>
      )
    }
    else{
      return (
        [<MyModal>
          <div className="card card-signup">
              <h2 className="card-title text-center">Add New Heartbeat Sensor</h2>
              <div className="row">

                  <div className="col-md-12">

                      <form id="SensorForm" onSubmit={this.onSubmit.bind(this)}>
                          <div className="card-content">
                              <div className="input-group">
                                  <span className="input-group-addon">
                                      <i className="material-icons">face</i>
                                  </span>
                                  <input type="text" ref="id" aria-required="true" required="true" className="form-control" placeholder="Sensor ID..."/>
                              </div>

                              <div className="input-group">
                                  <span className="input-group-addon">
                                  {/* <i class="material-icons">contacts</i> */}
                                </span>

                                  <select class="btn btn-primary btn-round" ref="status"   title="Select Sensor Status">
                                    <option class="bs-title-option" value="">Select Sensor Status</option>
                                    <option value="Running">Running</option>
                                    <option value="Lost">Lost</option>
                                    <option value="NotWorking">NotWorking</option>
                                    <option value="under Maintenance">under Maintenance</option>
                                    <option value="Other">Other</option>
                                  </select>
                              </div>
                              <div className="input-group">
                                  <span className="input-group-addon">
                                  {/* <i class="material-icons">contacts</i> */}
                                </span>

                                  <select class="btn btn-primary btn-round" ref="reserved"   title="Select if reserved or not">
                                    <option class="bs-title-option" value="">Select if reserved or not</option>
                                    <option value="true">Reserved</option>
                                    <option value="false">Not Reserved</option>
                                  </select>
                              </div>
                          </div>


                          <div className="footer text-center">
                            <button type="submit"  className="btn  btn-lg btn-success" >Add</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
        </MyModal>
          ,
        <div class="col-md-12">
          <div class="card">
              <div class="card-header card-header-icon" data-background-color="rose">
                  <i class="material-icons">assignment</i>
              </div>
              <div class="card-content table-full-width">
                  <h4 class="card-title">Heartbeat Sensors</h4>
                  <div className="toolbar">
                <button  className="btn btn-primary pull-right" data-toggle="modal" data-target="#MyModal">
                      Add new Sensor
                  <div className="ripple-container"></div>
                </button>

							</div>
                  <table class="table table-hover table-responsive">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Status</th>
                              <th>Reserved</th>
                          </tr>
                        </thead>
                      <tbody>
                        {instance.state.heartbeatSensor.length>0?
                        instance.state.heartbeatSensor.map((sensor)=>{
                          return(
                          <tr class={sensor.reserved?"danger":"success"}>
                              <td>{sensor.id}</td>
                              <td>{sensor.status}</td>
                              <td>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="optionsCheckboxes" checked={sensor.reserved}/>

                                    </label>
                                </div>
                              </td>
                          </tr>
                        );
                        })
                        :
                        <tr>
                          <td colSpan="3">
                            there are no sensors register at the moment
                          </td>
                        </tr>
                      }


                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    ]
      );
    }
  }
//////////////////////////////////////// end render
/////////////////////////////////////////// events
onSubmit(e){
  e.preventDefault();
debugger;
  let id = this.refs.id.value.trim();
  let status = this.refs.status.value;
  let reserved = this.refs.reserved.value.trim();
  if(status.length<=0){
    window.notify("danger", "you have to select a status");
    return;
  }


  const sensor={
    "id": id,
    "status": status,
    "reserved":(reserved === 'true')
  }
  this.refs.id.value="";
  this.refs.status.value="";
  this.refs.reserved.value="";
  const SensorId=HeartbeatSensor.insert(sensor);
  if(SensorId){
     window.notify("success", "New Sensor successfully Added");
  }
  else{
    window.notify("danger", "failed, please try again");
  }
  // instance.setState({waiting:true});
  // Meteor.call("createContact",contact,(err,result)=>{
  //   instance.setState({waiting:false});
  //   if(err){
  //     window.notify("danger", err.reason);
  //     return;
  //   }
  //     window.notify("success", "New Contact successfully Created");
  //
  // })
}
}
