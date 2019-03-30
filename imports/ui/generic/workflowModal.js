import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker';
import React from 'react'
import ReactDOM from 'react-dom'
import queryString from  'query-string';
// import {
//   Redirect
// } from 'react-router-dom'

import {ProcessEngine} from "../../api/bpmn/ProcessEngine";
import {Workflows} from "../../api/collections/Workflows";

const BpmnViewer = require('bpmn-js/lib/NavigatedViewer');
let viewer = null;


const instance=null
export default class WorkflowModal extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    //const query = queryString.parse(props.location.search);
    //const params=props.match.params;
    super(props);
    instance=this;
    instance.state={
        nextTarget:null,
        workflowDoc:null,
        processInstanceDoc:null,
        currentTarget:null,
        loadComplete:false,
        rendered:false
    }
  }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    // if (!instance.isEquivalent(nextProps, instance.props)) {
    //   debugger;
    //   const processInstanceDoc = nextProps.processInstanceDoc;
    //   instance.initialRender(processInstanceDoc);
    // }
  }
  componentWillMount(){
    if (!instance.props) {
        instance.state.set("loadComplete", false);
        return;
    }

    const processInstanceDoc = instance.props.processInstanceDoc;
      instance.TestTracker = Tracker.autorun(()=> {
    instance.initialRender(processInstanceDoc);
  });
        //console.log("modal data:" + Template.currentData());
        // if (!processInstanceDoc) {
        //     instance.state.set("loadComplete", false);
        //     return;
        // }

  }
  componentWillUnmount(){
    instance.TestTracker.stop();
  }
  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}
////////////////////////////////////// helpers
initialRender(processInstanceDoc){
  if (!processInstanceDoc) {
      instance.setState({"loadComplete": false});
      return;
  }
  const workflowDoc = Workflows.findOne(processInstanceDoc.workflowId);
  instance.setState({"workflowDoc": workflowDoc});
  instance.setState({"processInstanceDoc": processInstanceDoc});
  ProcessEngine.actions.status(processInstanceDoc, function (err, res) {
      if (res) {
          const children = ProcessEngine.helpers.getChildren(res);
          //console.log("children:", children, res);
          instance.setState({"nextTarget": null});
          let current;
          for (let child of children) {
              if (child.entered && child.waiting) {
                  current = child;
                  break;
              }
          }
          console.log("current: ", current);
          if (current) {
              ProcessEngine.actions.getNext(processInstanceDoc, current.id, function (err, res) {
                  if (err) {
                      window.notify("danger", err.reason || err.message);
                  }

                  if(res && res.element) {
                      if (res.element.$type === "bpmn:EndEvent")
                          res.element.name = "Complete Workflow";
                      instance.setState({"nextTarget": res.element});
                  }
                  instance.setState({"currentTarget": current});
                  instance.setState({"loadComplete": true});
              })
          }else{
              instance.setState({"currentTarget": current});
              instance.setState({"loadComplete": true});
          }
      }
  });
  viewer = new BpmnViewer();
}
loadComplete(){
      return instance.state.loadComplete;
  }

  currentStep() {
      const currentTarget = instance.state.currentTarget;
      //console.log("current target render:", currentTarget);
      return currentTarget;
  }

  nextStep(){
      const nextTartget= instance.state.nextTarget;
      return nextTartget;
  }

  workflowDoc(){
      return instance.state.workflowDoc;
  }

  processInstanceDoc(){
      return instance.state.processInstanceDoc;
  }

  //////// NEXT TYPES /////////

  isExclusiveGateway(){
      const nextTarget = instance.state.nextTarget;
      console.log("is exclusive gateway: ", nextTarget);
      return !!nextTarget && ProcessEngine.helpers.isExclusiveDecision(nextTarget);
  }

  renderPreview(){
      const rendered = instance.state.rendered;
      const loaded = instance.state.loadComplete;
      const workflowDoc = instance.state.workflowDoc;

      if (!rendered || !loaded || !workflowDoc) return;

      const waiting = instance.state.nextTarget;
      const currentTarget = instance.state.currentTarget;

      const xml = workflowDoc.dataModel;

      viewer.importXML(xml, function (err) {
          if (err) {
              window.notify("danger", err.reason || err.message);
          } else {
              const canvas = viewer.get('canvas');
              canvas.zoom('fit-viewport');
              if (waiting) {
                  canvas.addMarker(waiting.id, 'next-element');
              }
              if (currentTarget) {
                  canvas.addMarker(currentTarget.id, 'waiting-element');
              }
          }
      });
  }
////////////////////////////////////// end helpers
////////////////////////////////////// renders methods
  render(){
    // if(!Session.get("dataReady"))
    // {
    //   Session.set("waitBackURL","/workflow/"+instance.state.params.workflowId+"?patientId="+instance.state.query.patientId);
    //   return(
    //     <Redirect to={"/wait"}/>
    //   )
    // }
    // else{
      return (
        [
          	<div id="workflowModal" className="modal fade" tabindex="-1" role="dialog">
          		<div className="modal-dialog" role="document">
          			<div className="modal-content">

          				<div className="modal-header">
          					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
          							aria-hidden="true">&times;</span></button>
          					{instance.loadComplete()?
          						<h4 className="modal-title">{instance.workflowDoc().name}</h4>
          					:
          						<h4 className="modal-title">Loading workflow data</h4>
          					}
                  </div>
          				<div id="workflow-modal-panel" className="modal-body">
          					{/* {{#unless loadComplete}}
          						{{> loading title="workflow data and preview"}}
          					{{/unless}} */}
          					<div id="workflow-preview-canvas" className="workflow-preview"></div>
          					{instance.loadComplete()?
          					<div className="instruction">
          							<div className="row">
          									<b>Next Step: </b> {instance.nextStep().name}
          									{instance.isExclusiveGateway()?
          										<div className="input-group" id="x-select-input-group">
          											<span className="input-group-addon"><i className="fa fa-random fa-fw"></i></span>
          											<select id="selectGatewayDecision" onChange={instance.selectGatewayDecisionChange.bind(this)} className="form-control">
          												<option value="">Select One</option>
          												<option value="1">Yes</option>
          												<option value="0">No</option>
          											</select>
          										</div>
          									:""}
          						</div>
          					</div>
          								:""}
          								<div id="workflow-alert-target" className="alert alert-danger" hidden></div>

          				</div>
          				<div className="modal-footer">
          					<p className="pull-left"><i className="fa fa-info"></i> The current data has been saved.</p>
          					{/* {{#if loadComplete}} */}
          						<button id="workflow-modal-complete-step-button" onClick={instance.workflowModalCompleteStepButtonClick.bind(this)} type="button"
          								className="btn pull-right btn-info" data-dismiss="modal"><i className="fa fa-check"></i>
          							Complete Step<div className="ripple-container"><div className="ripple ripple-on ripple-out" style={{left: 64.1563, top: 20.75, backgroundColor: "rgb(255, 255, 255)", transform: "scale(14.6621)"}}></div></div>
          						</button>
          					{/* {{/if}} */}
          					<button type="button" className="btn btn-danger btn-round" data-dismiss="modal">Cancel<div className="ripple-container"><div className="ripple ripple-on ripple-out" style={{left: 64.1563, top: 20.75, backgroundColor: "rgb(255, 255, 255)", transform: "scale(14.6621)"}}></div></div></button>

          				</div>
          			</div>
          		</div>
          	</div>
            ,
          	<button className="btn btn-primary pull-right clearfix" onClick={instance.showModalButtonclick.bind(this)} id="show-modal-button">Complete Step</button>
          ]
      );
    // }
  }
//////////////////////////////////////// end render
/////////////////////////////////////////// events

    // 'shown.bs.modal #workflowModalRef'(event, instance) {
    //     const workflowDoc = instance.state.workflowDoc;
    //     if (!workflowDoc) return;
    //
    //     const currentTarget = instance.state.currentTarget;
    //     const nextTarget = instance.state.nextTarget;
    //     const xml = workflowDoc.dataModel;
    //
    //     const wfContainer = $('#workflow-preview-canvas');
    //
    //     viewer.importXML(xml, function (err, res) {
    //         if (err) {
    //             window.notify("danger", err.reason || err.message);
    //         } else {
    //             viewer.attachTo('#workflow-preview-canvas');
    //
    //             const canvas = viewer.get('canvas');
    //             canvas.zoom('fit-viewport');
    //             if (currentTarget) {
    //                 canvas.addMarker(currentTarget.id, 'waiting-element');
    //             }
    //             if (nextTarget) {
    //                 canvas.addMarker(nextTarget.id, 'next-element');
    //             }
    //         }
    //     });
    // }

selectGatewayDecisionChange(event){
  const value = $(event.target).val();
  if (value) {
      $("#x-select-input-group").removeClass("has-error").addClass("has-success");
  }

  //console.log("select gaetway value:" , value);
  const processInstanceDoc = instance.state.processInstanceDoc;
  ProcessEngine.actions.setVariable(processInstanceDoc, {key:"select", value:value === "1"}, function (err, res) {
      console.log(err, res)
  });
}
    // 'change #selectGatewayDecision'(event, instance) {
    //
    // },
workflowModalCompleteStepButtonClick(event){
  event.preventDefault();
  const nextTarget = instance.state.nextTarget;
  //console.log("WF NEXT TARGET: ", nextTarget);
  if (!!nextTarget && ProcessEngine.helpers.isExclusiveDecision(nextTarget) && !$('#selectGatewayDecision').val()) {
      window.notify("danger", "Please make a decision to continue by selecting an option.");
      $("#x-select-input-group").addClass("has-error");
      return;
  }

  const processInstanceDoc = instance.state.processInstanceDoc;
  ProcessEngine.actions.next(processInstanceDoc, function(err, res){
      if (err || !res) {
          window.notify("danger", err ? (err.reason || err.message) : "Could not complete workflow");
          console.log(err, res); // TODO handle
          return;
      }
      $("#workflowModal").modal('hide');
      ProcessEngine.actions.continue(processInstanceDoc);
  });
}
   // 'click #workflow-modal-complete-step-button'(event, instance) {
   //
   // },
showModalButtonclick(evnet){
  $("#workflowModal").modal('show');
}
   // 'click #show-modal-button'(event, instance){
   //
   // }
}
