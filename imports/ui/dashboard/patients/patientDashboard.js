// import {Meteor} from 'meteor/meteor'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import {
//   Redirect
// } from 'react-router-dom'
//
// import DonutChart from  '../../generic/donutchart/donutchart';
// import Slider from  '../../generic/slider/slider';
// import DateRangePicker from  '../../generic/dateRangePicker/dateRangePicker';
//
// import {RiskScore} from "../../../api/risk/RiskScore";
// import {Patients, PatientsDef} from "../../../api/collections/Patient";
//
// import BodyParts from '../../visualizations/bodyparts/bodyparts.js'
// import BarChart from '../../visualizations/riskscores/riskscores.js'
// import RadarChart1 from '../../visualizations/radarchart/radarchart.js'
// import LineChart from '../../visualizations/linechart/linechart.js'
// import LineChartThreshold from '../../visualizations/linechartthreshold/linechartthreshold.js'
// import GaugeChart from '../../visualizations/gaugechart/gaugechart.js'
// import Streaming from '../../streaming/streaming.js'
// import StreamingSegments from '../../streaming/streamingSegments.js'
// import StreamingHistory from '../../streamingHistory/streamingHistory.js'
// import StreamingHistory2 from '../../streamingHistory/streamingHistory2.js'
// import RiskHistory from '../../riskHistory/riskHistory.js'
// import List from  '../../list/list';
//
// import {PlotlyUtils} from "../../../api/plotly/PlotlyUtils";
// import {BodyPartsDef, BodyPartsStatus} from '../../../api/collections/BodyParts';
//
// import SimpleSchema from 'simpl-schema';
// const pressureSchema = new SimpleSchema(PatientsDef.assessment.injury.schema, {tracker: Tracker});
//
// const rand=function(max) {
//     return Math.floor(Math.random() * max);
// }
// const streamTypes = {
//     graph:"graphData",
//     squab:"squabData",
// };
//
// const riskSocreText=function(score){
//   if(score>=17 && score<=24)
//   {
//     return "(low - green)";
//   }
//   else if(score>14 && score<=16)
//   {
//     return "(medium - blue)";
//   }
//   else if(score>12 && score<=14)
//   {
//     return "(High - yellow)";
//   }
//   else if(score>=0 && score<=12)
//   {
//     return "(Very High - orange )";
//   }
// };
// export default class PatientDashboard extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={
//       patientId:null,
//       patientDoc:null,
//       bodyParts:true,
//       graphData:null,
//       squabData:false,
//       history:false,
//       bodyTarget:null,
//       callbackId:null
//     }
//
//     Session.set("viewtitle","Patient Management")
//   }
//   componentDidMount(){
//     this.TestTracker = Tracker.autorun(()=> {
//
//
//
//     });
//       this.setState({ready:true});
//   }
// //////////////////////////////////////////helpers
// riskLevels() {
//         return RiskScore.types();
//     }
// selected(id) {
//         const patientId = this.state.patientId;
//         if (!patientId && !id) return true;
//         return patientId === id;
//     }
// patients(riskScore) {
//     const sort = {sort: {name: 1}};
//     if (riskScore.value === RiskScore.UNKNOWN.value)
//         return Patients.find({riskScore: {$exists: false}}, sort)
//
//     const query = {
//         riskScore: {$gte: riskScore.min, $lte: riskScore.max},
//     }
//
//     return Patients.find(query, sort);
// }
// patientSelected() {
//     return !!this.state.patientId ||  !!this.state.patientDoc;
// }
// patientDoc() {
//     return this.state.patientDoc
// }
// bodyParts() {
//     return this.state.bodyParts;
// }
//
// //////////Test
// bodySigments() {
//     const patientDoc = this.state.patientDoc;
//     const segmentsAtRisk=[];
//     const segmentsAtRiskvalues=[];
//     const segmentsColors=[];
//     let allBodyPartsStatusDocs=[];
//     const latest = BodyPartsStatus.findOne({patientId: patientDoc._id}, {sort: {timeStamp: -1}});
//     console.log("latest on body parts:" + latest)
//     if (!latest) {
//         allBodyPartsStatusDocs = [];
//     } else {
//
//         allBodyPartsStatusDocs = new Array(11);
//         const allLatest = BodyPartsStatus.find({
//             patientId: patientDoc._id,
//             timeStamp: latest.timeStamp
//         }, {sort: {index: 1}}).fetch();
//         console.log("all latest: ", allLatest);
//         for (let i = 0; i < allBodyPartsStatusDocs.length; i++) {
//             const found = allLatest.find(function (element) {
//                 return element.location === i;
//             });
//             if (found) allBodyPartsStatusDocs[i] = found;
//         }
//     }
//
//     BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location10.index)
//       console.log(patientDoc)
//       if (allBodyPartsStatusDocs.length>0){
//       //segmentsAtRisk.push("Head");
//       segmentsAtRisk.push(BodyPartsDef.mapping.location1.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location1.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location1);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location1.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location1.index));
//
//
//       //segmentsAtRisk.push("Shoulder Left");
//       segmentsAtRisk.push(BodyPartsDef.mapping.location2.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location2.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location2);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location2.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location2.index));
//
//       //segmentsAtRisk.push("Shoulder Right");
//       segmentsAtRisk.push(BodyPartsDef.mapping.location3.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location3.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location3);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location3.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location3.index));
//
//       //segmentsAtRisk.push("Left Arm");
//       segmentsAtRisk.push(BodyPartsDef.mapping.location4.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location4.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location4);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location4.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location4.index));
//
//       //segmentsAtRisk.push("Right Arm");
//       segmentsAtRisk.push(BodyPartsDef.mapping.location5.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location5.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location5);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location5.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location5.index));
//
//       //segmentsAtRisk.push("Lumbar")
//       segmentsAtRisk.push(BodyPartsDef.mapping.location6.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location6.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location6);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location6.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location6.index));
//
//       //segmentsAtRisk.push("Gluteal")
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location7);
//       segmentsAtRisk.push(BodyPartsDef.mapping.location7.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location7.index)));
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location7.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location7.index));
//
//       //segmentsAtRisk.push("Left Femoral")
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location8);
//       segmentsAtRisk.push(BodyPartsDef.mapping.location8.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location8.index)));
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location8.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location8.index));
//
//       //segmentsAtRisk.push("Right Femoral")
//       segmentsAtRisk.push(BodyPartsDef.mapping.location9.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location9.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location9);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location9.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location9.index));
//
//       //segmentsAtRisk.push("Left Leg")
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location10);
//       segmentsAtRisk.push(BodyPartsDef.mapping.location10.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location10.index)));
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location10.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location10.index));
//
//       //segmentsAtRisk.push("Right Leg")
//       segmentsAtRisk.push(BodyPartsDef.mapping.location11.label+" "+riskSocreText(BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location11.index)));
//       //segmentsAtRiskvalues.push(patientDoc.pressure.location11);
//       segmentsAtRiskvalues.push(24-BodyPartsDef.getTotalScore(allBodyPartsStatusDocs, BodyPartsDef.mapping.location11.index));
//       segmentsColors.push(BodyPartsDef.getTotalColor(allBodyPartsStatusDocs, BodyPartsDef.mapping.location11.index));
//     }
//     else
//         return {
//             x: [100],
//             y: ["Unknown"],
//             order:0,
//             central_title:"Unknown",
//             title: "Total Score"
//
//         };
//     const bodySigmentsData = {
//         x: segmentsAtRiskvalues,
//         y: segmentsAtRisk,
//         order:0,
//         colors: segmentsColors,
//         central_title: ""+patientDoc.pressureScore,
//         title:"Total Score"
//     };
//     return bodySigmentsData;
// }
// getStreamingTypeColor() {
//     const mode = this.state.graphData.mode
//     if (mode === PlotlyUtils.modes.pressure) return "green"
//     if (mode === PlotlyUtils.modes.humidity) return "blue"
//     if (mode === PlotlyUtils.modes.temperature) return "red"
// }
// totalRiskData() {
//     const patientDoc = this.state.patientDoc;
//     if (!patientDoc.riskScore)
//         return null;
//     const values = Object.values(patientDoc.riskFactors);
//     console.log(values)
//     let count = 1;
//     const riskData = {
//         series: [
//             {
//                 x: Array.apply(null, Array(values.length)).map((val, idx) => idx),
//                 y: values,
//                 type: "scatter",
//             }
//         ],
//         title: "Total Score Live Chart",
//         order:0
//     };
//     console.log("Total Score Live Chart"+riskData);
//     return riskData;
// }
// bodyTarget(){
//         return this.state.bodyTarget;
// }
// bodyTarget(){
//     return this.state.bodyTarget;
// }
// humidityOverTime() {
//     const patientDoc = this.state.patientDoc
//     if(patientDoc.id==110)
//     {
//       return {
//         series: [
//             {
//                 x: [12,11,10,9,8,7,6,5,4,3,2,1],
//                 y: [62,60,58,54,52,51,48,46,44,42,41,40],
//                 type: "scatter"
//
//             }
//         ],
//         title: "Humidity over last 12 hours",
//         threshold:50,
//         order:1
//       }
//     }
//     values=[];
//     labels=[];
//     for(i=12;i>-1;i--)
//     {
//       labels.push(i);
//       values.push(rand(100));
//     }
//     const pressureData = {
//         series: [
//             {
//                 x: labels,
//                 y: values,
//                 type: "scatter",
//             }
//         ],
//         title: "Humidiy over last 12 hours",
//         threshold:50,
//         order:1
//     }
//     //console.log(riskData);
//     return pressureData;
// }
// pressureOverTime() {
//     const patientDoc = this.state.patientDoc
//     if(patientDoc.id==110)
//     {
//       return {
//         series: [
//             {
//                 x: [12,11,10,9,8,7,6,5,4,3,2,1,0],
//                 y: [36,35,35,33,30,30,29,28,27,25,22,20],
//                 type: "scatter"
//
//             }
//         ],
//         title: "Pressure over last 12 hours",
//         threshold:32,
//         order:0
//       }
//     }
//     values=[];
//     labels=[];
//     for(i=12;i>-1;i--)
//     {
//       labels.push(i);
//       values.push(rand(55));
//     }
//     const pressureData = {
//         series: [
//             {
//                 x: labels,
//                 y: values,
//                 type: "scatter",
//             }
//         ],
//         title: "Pressure over last 12 hours",
//         threshold:32,
//         order:0
//     }
//     //console.log(riskData);
//     return pressureData;
// }
// riskData() {
//     const patientDoc = this.state.patientDoc
//     if (!patientDoc.riskScore)
//         return {
//             values: [0,0,0,0,0,0],
//             labels: ["Sensory","Moisture","Activity","Mobility","Nutrition","Friction ans Shear"],
//             title: "Unkown Risk",
//         };
//         console.log("risk factor "+Object.values(patientDoc.riskFactors))
//     const riskData = {
//         values: Object.values(patientDoc.riskFactors),
//         labels: ["Sensory","Moisture","Activity","Mobility","Nutrition","Friction ans Shear"],
//         title: "Risk Score: "+String(patientDoc.riskScore) + " Score",
//     };
//     return riskData;
// }
// gaugeData(){
//   let value=rand(10);
//   const patientDoc = this.state.patientDoc
//   if(patientDoc.id==110)
//     value=5;
//   console.log("insdie gauge")
//       return {
//      meter:value,
//      title: "Percentage of turns completed",
//      order: 0
//    };
// }
// ////////////////////////////////////////////////////////
// //  REQUESTS
// ////////////////////////////////////////////////////////,
// requestFilter() {
//     const patientDoc = this.state.patientDoc
//     return {"relations.patient": patientDoc ? patientDoc._id : "foobarbaz",}
// }
// requestSort(){
//     return {time:1};
// }
// requestData(){
//   return {
//     collection:"request",
//     hideNewEntryButton:true,
//     title:"Next Actions",
//     filter:this.requestFilter(),
//     sort:this.requestSort()
//   }
// }
// ////////////////////////////////////////////////////////
// //  STREAMING
// ////////////////////////////////////////////////////////,
//
// graphData(){
//     return this.state.graphData;
// }
// squabData(){
//     return this.state.squabData;
// }
// history() {
//     return this.state.history;
// }
// //////////////////////////////////////////end helpers
//
// ////////////////////////////////////////// render methods
// renderRequestList(){
//   return (
//     <div class="row">
//       <div class="card">
//         <div class="card-header card-header-icon" data-background-color="purple">
//           <i class="fa fa-fw fa-fw fa-exchange"></i>
//         </div>
//         <div class="card-content">
//           <h4 class="card-title">Next Actions</h4>
//           <div class="material-datatables" style={{paddingLeft: 60,    paddingRight: 60}}>
//             <table class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%"
//                  >
//
//               <thead>
//               <tr>
//
//                   <th>Time</th>
//                   <th>Urgency</th>
//                   <th>Name</th>
//                   <th>Role</th>
//
//
//                 <th class="col-action">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//             </tbody>
//           </table>
//         </div>
//       <div class="col-lg-12" style={{height: 400,	width: "100%",	overflowY: "scroll"}}>
//         <List fromPatientDashboard={true} data={this.requestData()}/>
//       </div>
//     </div>
//     </div>
//
//     </div>
//   )
// }
// renderBottomCharts(){
//   return(
//     [
//       <div class="row">
// 				<div class="col-lg-6">
// 					<LineChartThreshold data={this.humidityOverTime()}/>
// 				</div>
// 				<div class="col-lg-6">
//
// 					<RadarChart1 data={this.riskData()}/>
// 				</div>
//
//
// 			</div>
//       ,
// 			<div class="row">
// 				<div class="col-lg-6">
// 					<LineChartThreshold data={this.pressureOverTime()}/>
// 				</div>
//
// 				<div class="col-lg-6">
// 					<GaugeChart data={this.gaugeData()}/>
// 				</div>
// 			</div>
//     ]
//   )
// }
//   renderDateSliderAndAssisment(){
//     renderAssisment="";
//     console.log("Slider");
//
//     if(this.bodyParts() && this.bodyTarget())
//     {
//       console.log("Slider");
//       renderAssisment=(
//         <div class="col-lg-6 col-xs-12">
//           <div class="card">
//             <div class="card-header card-header-icon" data-background-color="red">
//               <i class="material-icons">pie_chart</i>
//             </div>
//             <div class="card-content">
//               <h4 class="card-title">Injury Assessment Data
//                            on {this.bodyTarget().name}</h4>
//                            <form id="pressureForm" validate="submitThenBlur" onSubmit={this.onPressureFormSubmit.bind(this)} novalidate="novalidate">
//                                <div class="form-group" data-required="true">
//                                <label for="fspbgdPqFw9Bxg8QR" class="control-label">Grade of Pressure Injury Severity</label>
//                                <div class="af-radio-group" data-schema-key="pressure">
//                                <div class="radio">
//                                  <label>
//                                    <input type="radio" value="1" name="pressure"  required=""/><span class="circle"></span><span class="check"></span>
//                                    Grade I
//                                  </label>
//                                </div>
//
//                                <div class="radio">
//                                  <label>
//                                    <input type="radio" value="2" name="pressure"  required=""/><span class="circle"></span><span class="check"></span>
//                                    Grade II
//                                  </label>
//                                </div>
//
//                                <div class="radio">
//                                  <label>
//                                    <input type="radio" value="3" name="pressure"  required=""/><span class="circle"></span><span class="check"></span>
//                                    Grade III
//                                  </label>
//                                </div>
//
//                                <div class="radio">
//                                  <label>
//                                    <input type="radio" value="4" name="pressure"  required=""/><span class="circle"></span><span class="check"></span>
//                                    Grade IV
//                                  </label>
//                                </div>
//                              </div>
//                                <span class="help-block"></span>
//                              </div>
//                                  <div class="form-group">
//                                    <button type="submit" class="btn btn-primary">
//                                      Submit
//                                    <div class="ripple-container"></div></button>
//                                  </div>
//                              </form>
//             </div>
//           </div>
//         </div>
//       )
//     }
//     return(
//       <div class="row">
// 					{/* <div class="col-lg-6" >
// 						<div class="row">
// 							<div class="col-lg-12">
// 								<Slider callback={this.sliderCallback}/>
// 							</div>
// 						</div>
// 						<div class="row">
//               <div class="col-lg-2">
//                 <select id="dataDisplay" class="form-control">
//                         <option value="1" selected="">In Time</option>
//                         <option value="2" selected="selected">Average</option>
//                         <option value="3" selected="">Sum</option>
//                 </select>
//               </div>
//               <div class="col-lg-6">
//                 <DateRangePicker callback={this.dateRangePickerCallback}/>
//               </div>
//               <div class="col-lg-2">
//                 <button id="resetDates" class="btn btn-primary btn-round">Reset<div class="ripple-container"></div></button>
//               </div>
//
//             </div>
//           </div> */}
//           {renderAssisment}
//       </div>
//     )
//   }
//   renderConditionBodyStream(){
//
//     const renderCommonBodyStream=(
//       <div className="col-lg-1">
//         <div
//           // style={{position: "relative",
//           //     	 top: "20%",
//           //     	 transform: "translateY(+20%)"}}
//                  >
//         <div >
//           <button id="temperatureButton2" onClick={this.temperatureButtonClick.bind(this)} className={this.state.temperature?"btn btn-success btn-round":"btn btn-default btn-round"} style={{width: 80}}>
//             <i className="fa fa-fw fa-thermometer-three-quarters"
//                title="temperature visualization"></i>
//           </button>
//           <button id="humidityButton2" onClick={this.humidityButtonClick.bind(this)} className={this.state.humidity?"btn btn-success btn-round":"btn btn-default btn-round"} style={{width: 80}}>
//             <i className="fa fa-fw fa-tint" title="humidity visualization"></i>
//           </button>
//           <button id="pressureButton2" onClick={this.pressureButtonClick.bind(this)} className={this.state.pressure?"btn btn-success btn-round":"btn btn-default btn-round"} style={{width: 80}}>
//             <i className="fa fa-fw fa-download" title="pressure visualization"></i>
//           </button>
//           <button id="pressureSegmentButton2" onClick={this.pressureSegmentButtonClick.bind(this)} className={this.state.pressureSegment?"btn btn-success btn-round":"btn btn-default btn-round"} style={{width: 80}}>
//             <i className="fa fa-fw fa-sitemap" title="pressure segments visualization"></i>
//           </button>
//           <button id="bodyMapButton" onClick={this.bodyMapButtonClick.bind(this)} className={this.state.bodyParts?"btn btn-success btn-round":"btn btn-default btn-round"} style={{width:80}}>
//             <i className="fa fa-fw fa-exclamation-circle" title="risk visualization"></i>
//           </button>
//           <button id="aiButton" onClick={this.aiButtonClick.bind(this)} className={this.state.ai?"btn btn-success btn-round":"btn btn-default btn-round"} style={{width: 80}}>
//             <img alt="AI" src="/assets/img/icons/ai.png" height="24"/>
//           </button>
//         </div>
//         <div >
//           <button type="button" className="btn btn-default btn-round" style={{width: 80}} data-toggle="modal"
//               data-target="#modal-observation">
//             <i class="fa fa-map-pin"></i>
//           </button>
//           <button type="button" className="btn btn-default btn-round" style={{width: 80}} data-toggle="modal"
//               data-target="#modal-threshold">
//             <img alt="Threshold" src="/assets/img/icons/threshold.png" height="24"/>
//           </button>
//           <button className={this.history()?"btn btn-success btn-round":"btn btn-default btn-round"}
//               style={{width: 80}} onClick={this.advancedControlClick.bind(this)} id="advancedControl">
//             <i className="fa fa-fw fa-search-plus" title="advanced control"></i>
//           </button>
//         </div>
//       </div>
//       </div>
//     )
//     const renderBodyStream="";
//     if(this.bodyParts())
//     {
//       renderBodyStream=(
//             <div className="col-lg-5" >
//               <div className="card">
//                 <div className="card-header card-header-icon" data-background-color="red">
//                   <i className="material-icons">pie_chart</i>
//                 </div>
//                 <div className="card-content">
//                   <h4 className="card-title">Patient Body Regions</h4>
//                   <span style={{fontSize: 16, fontWeight: 600, paddingLeft: 50}}>Left Side</span><span
//                     className="pull-right"
//                     style={{fontSize: 16, fontWeight: 600, paddingRight: 50}}>Right Side</span>
//                   <BodyParts patientDoc={this.state.patientDoc} callback={this.myCallback} type="total"/>
//                 </div>
//               </div>
//             </div>
//           );
//       const renderHistory="";
//         if(!this.history()){
//             renderHistory=(
//               <div className="col-lg-5">
//                   <div className="row">
//
//                     <div className="col-lg-12">
//                       <DonutChart data={this.bodySigments()}/>
//                     </div>
//                     <div className="col-lg-12">
//                       <LineChart data={this.totalRiskData()}/>
//                     </div>
//
//                   </div>
//                 </div>
//               )
//             }
//       const renderRiskHistory="";
//       if(this.history()){
//         renderRiskHistory=<RiskHistory />
//       }
//       return(
//         [
//         renderBodyStream,
//         renderCommonBodyStream,
//         renderHistory,
//         renderRiskHistory
//       ]);
//     }
//     else {
//       const renderBodyStreamConditional="";
//
//       if(this.history()){
//         renderBodyStreamConditional=<StreamingHistory2 data={this.graphData()} />
//       }
//       else{
//         if(this.graphData() && !this.state.pressureSegment){
//           renderBodyStreamConditional=<Streaming data={this.graphData()} />
//         }
//         else if(this.graphData() && this.state.pressureSegment){
//           renderBodyStreamConditional=<StreamingSegments data={this.graphData()} />
//         }
//         else{
//           if(this.squabData()){
//             //{{> streamingSquab data=squabData}}
//           }
//         }
//       }
//       renderBodyStream=(
//         renderBodyStreamConditional
//       )
//       return(
//         [
//         renderBodyStream,
//         renderCommonBodyStream
//       ]);
//     }
//
//   }
//   renderIfBodyParts(){
//
//     // return(
//     //   <div className="row">
//     //     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//     //       <div className="row">
//     //       </div>
//     //       <hr/>
//     //       <div className="row" >
//     //         {this.renderConditionBodyStream()}
//     //       </div>
//     //       <div className="row">
//     //       <div className="col-lg-6" >
//     //         <div className="row">
//     //           <div className="col-lg-12">
//     //             {{> slider title="Total Score" data=sliderData}}
//     //           </div>
//     //         </div>
//     //         <div className="row">
//     //           <div className="col-lg-2">
//     //             <select id="dataDisplay" className="form-control">
//     //                     <option value="1" selected="">In Time</option>
//     //                     <option value="2" selected="selected">Average</option>
//     //                     <option value="3" selected="">Sum</option>
//     //             </select>
//     //           </div>
//     //           <div className="col-lg-6">
//     //             {{> daterangepicker}}
//     //           </div>
//     //           <div className="col-lg-2">
//     //             <button id="resetDates" className="btn btn-primary btn-round">Reset<div className="ripple-container"></div></button>
//     //           </div>
//     //
//     //         </div>
//     //       </div>
//     //       {{#if bodyParts}}
//     //
//     //
//     //           {{#if bodyTarget}}
//     //             <div className="col-lg-6 col-xs-12">
//     //               <div className="card">
//     //                 <div className="card-header card-header-icon" data-background-color="red">
//     //                   <i className="material-icons">pie_chart</i>
//     //                 </div>
//     //                 <div className="card-content">
//     //                   <h4 className="card-title">Injury Assessment Data{{#if bodyTarget}}
//     //                                on {{bodyTarget.name}}{{/if}}</h4>
//     //                   {{> quickForm id="pressureForm" schema=pressureSchema doc=pressureDoc type="normal" validate="submitThenBlur"}}
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           {{/if}}
//     //
//     //       {{/if}}
//     //       </div>
//     //       <div className="row">
//     //         <div className="card">
//     //           <div className="card-header card-header-icon" data-background-color="purple">
//     //             <i className="fa fa-fw fa-fw fa-exchange"></i>
//     //           </div>
//     //           <div className="card-content">
//     //             <h4 className="card-title">Next Actions</h4>
//     //             <div className="material-datatables" style={ paddingLeft: 60, paddingRight: 60}>
//     //               <table className="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%"
//     //                    style={width:"100%"}>
//     //
//     //                 <thead>
//     //                 <tr>
//     //
//     //                     <th>Time</th>
//     //                     <th>Urgency</th>
//     //                     <th>Name</th>
//     //                     <th>Role</th>
//     //
//     //
//     //                   <th className="col-action">Actions</th>
//     //                 </tr>
//     //               </thead>
//     //               <tbody>
//     //               </tbody>
//     //             </table>
//     //           </div>
//     //         <div className="col-lg-12" style={height: 400,	width: "100%",	overflowY: scroll}>
//     //           {{> list collection="request" hideNewEntryButton=true title="Next Actions" filter=requestFilter sort=requestSort}}
//     //         </div>
//     //       </div>
//     //     </div>
//     //
//     //       </div>
//     //     </div>
//     //
//     //   </div>
//     // )
//   }
//   renderSelectPatient(){
//     const divStyle = {
//       fontSize: "xx-large",
//       height: 50
//     };
//     return (
//       <div className="row">
//         <div className="col-lg-1 col-md-1 col-sm-1">
//           {this.state.graphData?
//           [
//             <div className="card" style={{boxShadow: "none"}}>
//         			<div className="card-header card-header-icon" data-background-color={this.getStreamingTypeColor()}>
//         				<i className="material-icons">pie_chart</i>
//         			</div>
//         			<div className="card-content">
//
//               </div>
//             </div>
//           ]:""}
//         </div>
//         {this.state.graphData?
//         <div className="col-lg-4 col-md-4 col-sm-4">
//           <h2 style={{marginTop: 5, fontSize:"29px", fontWeight: "400"}}>{this.state.graphData.title}</h2>
//         </div>
//         :""}
//         {this.patientSelected()?
//           <div className="col-lg-2 col-md-2 col-sm-10">
//             <h2 style={{marginTop: 5, fontSize: "29px", fontWeight: "400"}}> Patient:</h2>
//           </div>:""
//         }
//         <div className={this.patientSelected()?"col-lg-4 col-md-4 col-sm-4":"col"}>
//           <select id="patientSelect" value={this.state.patientDoc?this.state.patientDoc._id:-1} onChange={this.changePatientSelect.bind(this)} className="form-control" style={{fontSize:"x-large", height:"50px"}}>
//             <option key="-1" value="-1" >Select Patient</option>
//
//             {this.riskLevels().map((riskLevel)=>{
//                return (
//               <optgroup key={riskLevel.label} label={riskLevel.label}>
//                 {this.patients(riskLevel).map((patient)=>{
//                   return (
//                   <option key={patient._id} value={patient._id} >{patient.name}
//                   </option>
//                     )
//                  })}
//               </optgroup>
//                 )
//              })}
//           </select>
//         </div>
//
//       </div>
//     )
//   }
//   render(){
//     if(!Session.get("dataReady"))
//     {
//       Session.set("waitBackURL","/patient-management");
//       return(
//       <Redirect to={"/wait"}/>
//     )
//     }
//     else{
//
//     return (
//       <div className="row">
//
//         {this.renderSelectPatient()}
//         {this.patientSelected()?
//           [
//             //<h1>{this.patientDoc().name}</h1>,
//             <div className="row">
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                 {/* <div className="row">
//                 </div>
//                 <hr/>
//                 <div className="row" > */}
//                   {this.renderConditionBodyStream()}
//                 {/* </div> */}
//               </div>
//             </div>,
//           this.renderDateSliderAndAssisment(),
//           this.renderRequestList(),
//           this.renderBottomCharts()
//         ]
//           :"Please select a patient from the list above to see all details related to the selected patient"}
//
//       </div>
//     );
//   }
//   }
// /////////////////////////////////////////// event listner
//
// changePatientSelect(event){
//   const patientId = $('#patientSelect').val();
//   if (!patientId) {
//       this.setState({"patientId": null});
//       this.setState({"patientDoc": null});
//       this.setState({"bodyParts": false});
//   }
//   else {
//       this.setState({"patientId": patientId});
//       this.setState({"patientDoc": Patients.findOne(patientId)});
//       this.setState({"bodyParts": true});
//       this.setState({"graphData": null});
//       this.setState({"squabData": false});
//   }
// }
// // 'change #patientSelect'(event, instance) {
// //
// // }
// /////////////////////////////////////// if callback returns from bodymap
// myCallback = (dataFromChild) => {
//       // instance.state.set("callbackId", FlowRouter.current().path);
//       // instance.state.set("callbackIdSlider", FlowRouter.current().path);
//
//
//       const callback = dataFromChild;
//       //const callbackSlider = Session.get("sliderData");
//       //console.log(callbackSlider);
//       const currentTarget = this.state.bodyTarget;
//       if ((callback && currentTarget) && (callback.id !== currentTarget.id)) {
//           $('#pressureForm').get(0).reset();
//       }
//       console.log("before",this.state.bodyTarget);
//       this.setState({"bodyTarget":callback});
//       console.log("After",this.state.bodyTarget);
//     }
//     onPressureFormSubmit(event){
//       event.preventDefault();
//       console.log(event.target)
//       // const data = AutoForm.getFormValues('pressureForm');
//       // pressureSchema.validate(data.insertDoc);
//       //
//       // const patientDoc = instance.state.get("patientDoc");
//       // const target = instance.state.get("bodyTarget");
//       //
//       // const updateDoc = Object.assign({}, patientDoc);
//       // if (!updateDoc.pressure) {
//       //     updateDoc.pressure = {};
//       // }
//       // console.log(data);
//       // updateDoc.pressure[target.id] = data.insertDoc.pressure;
//       // console.log("try update:",updateDoc, target);
//       // if (Patients.update(patientDoc._id, {$set:updateDoc})) {
//       //     console.log("update");
//       //     instance.state.set("patientDoc", updateDoc);
//       // } else {
//       //     console.log("not updated");
//       // }
//     }
// /////////////// if callback from slider happened
// sliderCallback = (dataFromChild) => {
//   console.log("slider changes",dataFromChild);
// }
// dateRangePickerCallback=(dataFromChild)=>{
//   console.log("DateRangePicker changes",dataFromChild);
// }
//     // 'submit #pressureForm'(event, instance) {
//     //
//     //   }
// temperatureButtonClick(event){
//   this.setState({"bodyParts": false});
//   this.setState({"humidity": false});
//   this.setState({"pressure": false});
//   this.setState({"pressureSegment": false});
//   this.setState({"temperature": true});
//   this.setState({"ai": false});
//   this.setState({"squabData": null});
//   this.setState({"graphData": {
//       history:false,
//       recording:true,
//       title:"Temperature Sensors",
//       type: PlotlyUtils.graphs.advanced,
//       mode:PlotlyUtils.modes.temperature,
//   }});
// }
//     // 'click #temperatureButton2'(event, instance) {
//     //
//     //     },
// pressureButtonClick(event){
//   this.setState({"bodyParts": false});
//   this.setState({"humidity": false});
//   this.setState({"pressure": true});
//   this.setState({"pressureSegment": false});
//   this.setState({"temperature": false});
//   this.setState({"ai": false});
//   this.setState({"squabData": null});
//   this.setState({"graphData": {
//       history:false,
//       recording:true,
//       title:"Pressure Sensors",
//       type: PlotlyUtils.graphs.d3,
//       mode:PlotlyUtils.modes.pressure,
//   }});
// }
// pressureSegmentButtonClick(event){
//   this.setState({"bodyParts": false});
//   this.setState({"humidity": false});
//   this.setState({"pressure": false});
//   this.setState({"pressureSegment": true});
//   this.setState({"temperature": false});
//   this.setState({"ai": false});
//   this.setState({"squabData": null});
//   this.setState({"graphData": {
//       history:false,
//       recording:true,
//       title:"Pressure Sensors",
//       type: PlotlyUtils.graphs.d3,
//       mode:PlotlyUtils.modes.pressure,
//   }});
// }
//         // 'click #pressureButton2'(event, instance) {
//         //
//         // },
// humidityButtonClick(event){
//   this.setState({"bodyParts": false});
//   this.setState({"humidity": true});
//   this.setState({"pressure": false});
//   this.setState({"temperature": false});
//   this.setState({"pressureSegment": false});
//   this.setState({"ai": false});
//   this.setState({"squabData": null});
//   this.setState({"graphData": {
//       history:false,
//       recording:true,
//       title:"Humidity Sensors",
//       type: PlotlyUtils.graphs.advanced,
//       mode:PlotlyUtils.modes.humidity,
//   }});
// }
//         // 'click #humidityButton2'(event, instance) {
//         //
//         // },
// recordDataClick(event){
//
// }
//         // 'click #recordData'(event, instance) {
//         //
//         // },
// aiButtonClick(event){
//   this.setState({"bodyParts": false});
//   this.setState({"humidity": false});
//   this.setState({"pressure": false});
//   this.setState({"temperature": false});
//   this.setState({"pressureSegment": false});
//   this.setState({"ai": true});
//   // console.log("in python run");
//   // Meteor.call('runPython',this.state.patientDoc._id, function (err,res) {
//   //
//   //     if (err) {
//   //       console.log(err);
//   //     } else {
//   //       console.log(res)
//   //     }
//   //   });
// }
//         // 'click #aiButton'(event,instance){
//         //
//         // },
//
// bodyMapButtonClick(event){
//   this.setState({"bodyParts": true});
//   this.setState({"humidity": false});
//   this.setState({"pressure": false});
//   this.setState({"temperature": false});
//   this.setState({"pressureSegment": false});
//   this.setState({"ai": false});
//   this.setState({"graphData": null});
//   this.setState({"squabData": null});
// }
//         // 'click #bodyMapButton'(event, instance) {
//         //
//         // },
// advancedControlClick(event){
//   const history = this.state.history;
//   this.setState({"history": !history});
// }
//         // 'click #advancedControl'(event,instance){
//         //
//         // },
// }
