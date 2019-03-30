import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';

import {Patients} from "../../api/collections/Patient";
import {Requests} from "../../api/collections/Requests";
import {RiskScore} from "../../api/risk/RiskScore";
import {ProcesseInstances} from "../../api/collections/ProcessInstance";

//import '../visualizations/bodyparts/bodyparts';
import './patientList.css';
//import './patientList.html';
import {SidebarRoutes} from "../../api/routes/Routes";
import {Workflows} from "../../api/collections/Workflows";
// // TrackerReact is imported (default) with Meteor 1.3 new module system
// import TrackerReact from 'meteor/ultimatejs:tracker-react';

// Get the Collection

const sorting = {
    name:{name:1},
    dname:{name:-1},
    risk:{riskScore:1},
    drisk:{riskScore:-1},
    room:{room:1},
    droom:{room:-1},
};
// > React.Component is simply wrapped with TrackerReact
export default class PatientList extends React.Component {

	// Note: In ES6, constructor() === componentWillMount() in React ES5
	constructor(props) {
		super(props);
		this.state = {
					expand:false,
          patients:[],
					showRiskColors:false

        }
	}
  componentDidMount(){
    this.TestTracker = Tracker.autorun(()=> {
      const modifiers = {sort:sorting.name};
      const patients=Patients.find({}, modifiers).fetch();
      //console.log('new Patients',patients);
      this.setState({patients:patients});
    });
  }
	componentWillUnmount() {
		this.TestTracker.stop();
	}
	///////////////////////////////////// helpers ///////////////////////////////////
	expand(){
      return this.state.expand;
  }
	showRiskColors() {
        return this.state.showRiskColors;
    }
	rowClass(patientDoc) {
			const risk=""
      if (patientDoc.riskScore)
			 risk = RiskScore.check(patientDoc.riskScore);
      return risk.bs;
  }

  render(){
    return (
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-header card-header-icon" data-background-color="purple">
							<i className="material-icons">assignment</i>
						</div>
						<div className="card-content">
							<h4 className="card-title"></h4>
							<div className="toolbar">
								<a className="btn btn-primary pull-right" href="/form/patients"
								   target="/form/patients">
									<i className="fa fa-plus"></i> New Entry
								</a>
								<button onClick={this.toggleRiskButtonClick.bind(this)} id="toggleRiskButton"  className={this.showRiskColors()?"btn btn-primary pull-right":"btn btn-default pull-right"}>
									<i className="fa fa-bolt" title="Toggle Risk-Color"></i>
								</button>
								<div className="col-lg-2 col-md-4 col-sm-12 pull-right">
									<select id="patientListSortSelect" onChange={this.patientListSortSelectChange.bind(this)} className="form-control">
										<option value="name">By Name Ascending</option>
										<option value="dname">By Name Descending</option>
										<option value="risk">By Risk Ascending</option>
										<option value="drisk">By Risk Descending</option>
										<option value="room">By Room Ascending</option>
										<option value="droom">By Room Descending</option>
									</select>
								</div>
							</div>
							<div className={this.expand()?"material-datatables":"material-datatables collapsed-datatable"}>
								<table className="table table-responsive table-hover table-striped">
									<thead>
									<tr>
										<th>Patient</th>
										<th>Room</th>
										<th>Risk</th>
										<th>Next Action</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
									</thead>
									<tbody>
						      {this.showDocument()}
						      </tbody>
								</table>
							</div>
							<button onClick={this.showMoreDocumentsClick.bind(this)} className="btn btn-block btn-default">
								<i className={this.expand()?"fa fa-caret-up":"down"}></i>
		            {this.expand()?"Collapse":"Expand"}
							</button>
						</div>
					</div>
				</div>
			</div>

    );
  }

	///////////////////////// events /////////////////////////////////
	patientListSortSelectChange(event){
		//console.log("in change evnet");
	const value = $("#patientListSortSelect").val();
		if (value) {
				const modifiers = {sort:sorting[value]};
				//console.log(Patients.find({}, modifiers).fetch());
				this.setState({patients:Patients.find({}, modifiers).fetch()});
				//this.setState({"sort":sorting[value]});
		}else {
			const modifiers = {sort:sorting.name};
			//console.log(Patients.find({}, modifiers).fetch());
			this.setState({patients:Patients.find({}, modifiers).fetch()});
				//instance.setState({"sort":sorting.name});
		}

		////console.log("sort changed to ",this.state.sort);
	}
	showMoreDocumentsClick(event){
		const expand = this.state.expand;
		this.setState({"expand":!expand});
	}
	toggleRiskButtonClick(event){
    event.preventDefault();
    const showRiskColors = this.state.showRiskColors;
    //console.log("show risk colors", showRiskColors);
    this.setState({"showRiskColors":!showRiskColors});
  }
  patientRowExpand(patientDoc){

    const riskScore=this.toRisk(patientDoc.riskScore);
    const hasRiskScoreHistory=this.hasRiskScoreHistory(patientDoc.riskScoreHistory);
    const risk = RiskScore.check(patientDoc.riskScore);

    const riskChange=0;
    if(hasRiskScoreHistory)
    {
      riskChange=this.riskChange(patientDoc.riskScoreHistory,patientDoc.riskScore)
    }
    let segmentsAtRisk=[]
    if(patientDoc.pressure)
    {
      segmentsAtRisk=this.segmentsAtRisk(patientDoc.pressure)
    }
    renderRoom="";
    if(patientDoc.room)
    renderRoom=(
      <span>
        {'Room:'+patientDoc.room}
        <br/>
        {'Bed:'+patientDoc.bed}
      </span>
    );
    renderRiskChange="";
    if(hasRiskScoreHistory)
    {
      renderRiskChange=(
        <span>
          {'% change :'+riskChange+'% '}
          <br/>
        </span>
      )
    }
    return (
    <tr  key={patientDoc._id+"1"} classname="accordian-body collapse" id={patientDoc._id} aria-expanded="false" className="collapse" style={{height: "0px"}}>
      <td>
        {patientDoc.name}<br/><span className="text-muted">{patientDoc.id}</span>
        <br/>
        {renderRoom}

      </td>

      <td  colSpan="2">
    Category: <i className={"fa fa-"+risk.icon}></i> {riskScore}<br/>
    Total Score: {patientDoc.riskScore}
    <br/>
    {renderRiskChange}
    {patientDoc.pressure?"Segments At Risk":''}
    {patientDoc.pressure?segmentsAtRisk.map((segment,index)=>{
       return <li key={index}>{segment.segment} </li>
    }):''}

      </td>
      <td colSpan="2">
        Turn Patient
        <select id="turnPatient" className="form-control">
          <option value="covered">Covered</option>
          <option value="uncovered">Uncovered</option>
        </select>
        <br/>
        Risk Assessment
        <select id="riskAssessment" className="form-control">
          <option value="covered">Covered</option>
          <option value="uncovered">Uncovered</option>
        </select>
        <br/>
        Skin assessment
        <select id="patientListSortSelect"  className="form-control">
          <option value="covered">Covered</option>
          <option value="uncovered">Uncovered</option>
        </select>
      </td>
      <td >
        <button data-target={patientDoc._id} className="btn btn-sm btn-danger notifications">
          <i className="fa fa-bell-o fa-fw"></i> Notifications</button>
          <br/>
        <span className="dropdown">
          <button className="btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-code-fork fa-fw"> </i>Workflows
          </button>
          <ul className="dropdown-menu">
            {this.workflows().map((workflow)=>{
               return (
                 <li>
                   <a href={'/workflow/'+workflow._id+'?patientId='+patientDoc._id}>
                     <i className="fa fa-fw fa-code-fork"></i> {workflow.name}
                   </a>
                 </li>
               )
            })}

          </ul>
        </span>
        <br/>
        <button data-target={patientDoc._id} className="btn btn-sm btn-success bodymap"><i
            className="fa fa-eye fa-fw"></i> Body Map</button>
        <br/>
        <button data-toggle="collapse"  classname="accordion-toggle" className="collapsed" aria-expanded="false" data-target={'#'+patientDoc._id} className="btn btn-sm btn-primary show-more" ><i className="material-icons">keyboard_arrow_up</i>Collapse</button>
      </td>
    </tr>
  );
  }
  patientRow(patientDoc){
    //console.log("first",patientDoc)
  // const patienId = this.state.showMore;
  // const patientDoc= Patients.findOne(patienId);
  const showRiskColors = this.state.showRiskColors;
  const rowClass="";
  if (!showRiskColors || !patientDoc.riskScore)
   rowClass="";
  const risk = RiskScore.check(patientDoc.riskScore);
  rowClass=risk.bs;
  const riskScore=this.toRisk(patientDoc.riskScore);
  const nextActionDoc=this.nextAction(patientDoc._id)

  const renderNextAction="";
  const renderNextActionStatus="";
  if(this.hasWorkflow(nextActionDoc))
  {
    //console.log("2",patientDoc)
    nextActionDocTime=this.toDate(nextActionDoc.time);
    const toUrlLink=this.toUrl(nextActionDoc);
    coveredAction="";
    if(this.covered(nextActionDoc))
    {
      //console.log("3",patientDoc)
      coveredAction=(<span className="label label-success">Covered <i
          className="fa fa-check"></i></span>);
    }
    else{
      //console.log("4",patientDoc)
      coveredAction=(<span className="label label-default">Not Covered</span>);
    }

    renderNextAction=(
        <td  style={{cursor: "pointer"}} className={this.state.showRiskColors?risk.bs:""}>
          <a className="btn btn-sm btn-info" href={toUrlLink}>
            {nextActionDoc.remarks}<br/>{nextActionDocTime}
          </a>
        </td>

    );
    renderNextActionStatus=(
      <td className={this.state.showRiskColors?risk.bs:""} style={{cursor: "pointer"}}>
        {coveredAction}
      </td>
    )
  }
    else{
      //console.log("5",patientDoc)
    renderNextAction=(
        <td data-target={patientDoc._id} className={this.state.showRiskColors?risk.bs:""} style={{cursor: "pointer"}}> None</td>

    );
    renderNextActionStatus=(
      <td className={this.state.showRiskColors?risk.bs:""}>
        <select id="patientStatus" className="form-control">
          <option value="covered" selected="selected">UnKnown</option>
          <option value="covered" >Convered</option>
          <option value="uncovered" >Not Convered</option>
        </select>
      </td>
    )
    }

    renderRoom="";
    if(patientDoc.room)
    renderRoom=(
      <span>
        {'Room:'+patientDoc.room}
        <br/>
        {'Bed:'+patientDoc.bed}
      </span>
    );
////console.log("6",patientDoc)
  return(
    <tr key={patientDoc._id}>
      <td data-target={patientDoc._id} className={this.state.showRiskColors?risk.bs:""} style={{cursor: "pointer"}}>{patientDoc.name}<br/><span className="text-muted">{patientDoc.id}</span></td>
      <td data-target={patientDoc._id} className={this.state.showRiskColors?risk.bs:""} style={{cursor: "pointer"}}>
        {renderRoom}
      </td>
      <td data-target={patientDoc._id} className={this.state.showRiskColors?risk.bs:""} style={{cursor: "pointer"}}>
         <i className={"fa fa-"+risk.icon}></i> {riskScore}<br/>
        - {patientDoc.riskScore}
      </td>
      {renderNextAction}
      {renderNextActionStatus}
      <td>
        <button data-target={patientDoc._id} className="btn btn-sm btn-danger notifications">
          <i className="fa fa-bell-o fa-fw"></i></button>
        <span className="dropdown">
          <button className="btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-code-fork fa-fw"></i>
          </button>
          <ul className="dropdown-menu">
            {this.workflows().map((workflow)=>{
               return (
                 <li>
                   <a href={'/workflow/'+workflow._id+'?patientId='+patientDoc._id}>
                     <i className="fa fa-fw fa-code-fork"></i> {workflow.name}
                   </a>
                 </li>
               )
            })}
          </ul>
        </span>
        <button data-target={patientDoc._id} className="btn btn-sm btn-success bodymap"><i
            className="fa fa-eye fa-fw"></i></button>
            <button data-toggle="collapse"  classname="accordion-toggle" className="collapsed" aria-expanded="false" data-target={'#'+patientDoc._id} className="btn btn-sm btn-primary show-more" ><i className="material-icons">keyboard_arrow_down</i></button>
      </td>
    </tr>)
  }
  ////////////////////////////////////////////////////////////
  showDocument(){
    const patients=this.state.patients;

    const render =patients.map((patientDoc)=>{
      const patientRow=this.patientRow(patientDoc);
      const patientRowExpand=this.patientRowExpand(patientDoc);

      return(
        [
          patientRow
          ,
          patientRowExpand
        ]
    );
  });
  //console.log(render);
  return render;
}
///////////////////////////////////expand only function ////////////////////
hasRiskScoreHistory(riskScoreHistory){

  return (riskScoreHistory &&riskScoreHistory.length>0);

}
segmentsAtRisk(pressure){
  const segmentsAtRisk=[]
  //console.log("here");
  if(RiskScore.check(pressure.location1)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Head"})
  }
   if(RiskScore.check(pressure.location2)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Shoulder Left"})
  }
   if(RiskScore.check(pressure.location3)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Shoulder Right"})
  }
   if(RiskScore.check(pressure.location4)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Left Arm"})
  }
   if(RiskScore.check(pressure.location5)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Right Arm"})
  }
   if(RiskScore.check(pressure.location6)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Lumbar"})
  }
   if(RiskScore.check(pressure.location7)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Gluteal"})
  }
   if(RiskScore.check(pressure.location8)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Left Femoral"})
  }
   if(RiskScore.check(pressure.location9)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Right Femoral"})
  }
   if(RiskScore.check(pressure.location10)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Left Leg"})
  }
  if(RiskScore.check(pressure.location11)==RiskScore.HIGH)
  {
    segmentsAtRisk.push({segment:"Right Leg"})
  }
  //console.log("Segments",segmentsAtRisk);
  return segmentsAtRisk;
}
riskChange(riskScoreOld,riskScoreNew){

  const riskChange=((riskScoreNew-riskScoreOld[0].score)/riskScoreNew)*100;
  //console.log(riskChange);
  return riskChange.toFixed(2);

}
////////////////////////////////////// patient list row function ////////////
nextAction(patientId) {
    return Requests.findOne({"relations.patient": patientId}, {sort: {time: 1}});
}
hasWorkflow(requestDoc) {
    return requestDoc && requestDoc.relations && requestDoc.relations.workflow;
}
covered(requestDoc) {
    return !!ProcesseInstances.findOne({workflowId:requestDoc.relations.workflow, patientId: requestDoc.relations.patient});
}
toUrl(requestDoc) {
    return "/workflow/" + requestDoc.relations.workflow + "?patientId=" + requestDoc.relations.patient;
}
toDate(time) {
    return new Date(time).toLocaleString();
}
toRisk(riskScore) {
    const score = RiskScore.check(riskScore);
    return score.label;
}
riskIcon(riskScore) {
    const score = RiskScore.check(riskScore);
    return score.icon;
}

workflows(){
    return Workflows.find().fetch();
}
sortBy(){
    return this.state.sortBy?this.state.sortBy:"";
}

showMore(id) {
    return  this.state.showMore === id;
}
}
