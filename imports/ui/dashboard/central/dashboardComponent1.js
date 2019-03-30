import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

//import {LargeMat} from "../../../api/sensor/BigMatt";
import {PlotlyUtils} from "../../../api/plotly/PlotlyUtils";

const instance=null;
export default class DashboardComponent extends React.Component{
/////////////////////////////////////// lifecycle functions
  constructor(props){
    super(props);
    instance=this;
    instance.state={
      streaming:null,
      local:null,
      graphMode:PlotlyUtils.modes.pressure,
      lowerThreshold:PlotlyUtils.getLowerThreshold(PlotlyUtils.modes.pressure),
      upperThreshold:PlotlyUtils.getUpperThreshold(PlotlyUtils.modes.pressure)
    }
  }
  componentWillMount(){
    // Meteor.call(LargeMat.methods.isLocal, function (err,res) {
    //     if (res) this.setState({"local": true})
    // }.bind(instance));
    // stopStream();
    // instance.setState({"streaming": false});
  }
  componentWillReceiveProps(nextProps) {
  // // You don't have to do this check first, but it can help prevent an unneeded render
  //   if (nextProps.data !== instance.state.data) {
  //     instance.setState({graphMode: nextProps.data.mode });
  //     instance.setState({lowerThreshold:PlotlyUtils.getLowerThreshold(nextProps.data.mode)});
  //     instance.setState({upperThreshold:PlotlyUtils.getUpperThreshold(nextProps.data.mode)});
  //     stopStream();
  //     if ($('#pressure-graph-target').get(0)) {
  //         PlotlyUtils.timeSeries($('#pressure-graph-target').get(0),nextProps.data.mode);
  //     }
  //   }
  }
  componentDidMount(){
    if ( $('#pressure-graph-target').get(0)) {
        PlotlyUtils.timeSeries($('#pressure-graph-target').get(0),this.state.graphMode);
    }
  }
////////////////////////////////////// helpers

  ////////////////////////////////////////////////
  // GRAPH RELATED
  ////////////////////////////////////////////////
  isPressure() {
      return instance.state.graphMode === PlotlyUtils.modes.pressure;
  }
  graphMode() {
      return instance.state.graphMode;
  }
  streaming() {
      return instance.state.streaming;
  }
  lowerThreshold() {
      return instance.state.lowerThreshold;
  }
  upperThreshold() {
      return instance.state.upperThreshold;
  }

////////////////////////////////////// end helpers
////////////////////////////////////// renders methods
  render(){
    return (
      <div className="col-xs-11" >
              {instance.isPressure()?
    				        <div id="pressure-graph-target" className="responsive-plot" style={{minHeight:800}}></div>
                    :<div id="pressure-graph-target"></div>
                  }
              <div className="row">
                {this.state.title?
                <div className="col-lg-2">
                  <h4>{this.state.title}</h4>
                </div>
                :""}
                <div className="col-lg-2">
                  <select className="form-control" id="update-interval" onChange={this.updateIntervalChange.bind(this)}>
                    {/* <option value="10">10 ms interval</option>
                    <option value="100">100 ms interval</option> */}
                    <option value="500"  selected="true">500 ms interval</option>
                    <option value="1000">1 sec. interval</option>
                    <option value="2000">2 sec. interval</option>
                    <option value="3000">3 sec. interval</option>
                    <option value="5000">5 sec. interval</option>
                    <option value="10000">10 sec. interval</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div style={{display: "inline-block"}}>
                    <button id="startStream" onClick={this.startStreamClick.bind(this)}
                        className={this.streaming()?"btn btn-primary":"btn btn-default"}>
                      <i className="fa fa-fw fa-play" title="Start Stream"></i>
                    </button>
                    <button id="stopStream" onClick={this.stopStreamClick.bind(this)}
                        className={this.streaming()?"btn btn-default":"btn btn-primary"}>
                      <i className="fa fa-fw fa-stop" title="Stop Stream"></i>
                    </button>
                    <button id="mockInsert" onClick={this.mockInsertClick.bind(this)} className="btn btn-default">
                      <i className="fa fa-fw fa-database" title="Mock Insert"></i>
                    </button>
                    <button id="cleanChart" onClick={this.cleanChartClick.bind(this)} className="btn btn-default">
                      <i className="fa fa-fw fa-trash-o" title="Clean Chart"></i>
                    </button>
                  </div>
                </div>
                <div className="col-lg-3">
                  <label for="pressure_lower_threshold" style={{marginRight:10}}>Lower Threshold</label>
                  <input  id="pressure_lower_threshold" onChange={this.pressureLowerThresholdChange.bind(this)} type="number"
                       value={this.state.lowerThreshold}/>
                </div>
                <div className="col-lg-3">
                  <label for="pressure_upper_threshold" style={{marginRight:10}}>Upper Threshold</label>
                  <input  id="pressure_upper_threshold" onChange={this.pressureUpperThresholdChange.bind(this)} type="number"
                       value={this.state.upperThreshold}/>
                </div>
              </div>
    			</div>
    );
  }
//////////////////////////////////////// end render
/////////////////////////////////////////// events


////////////////////////////////////////////////////////////
//
//  STREAMING
//
////////////////////////////////////////////////////////////

startStreamClick(event){
  event.preventDefault();
  stopStream();
  instance.setState({"streaming": true});
  const interval = parseInt($('#update-interval').val());
  const mode = instance.state.graphMode;
  switch (mode) {
      case PlotlyUtils.modes.pressure:
          instance.setState({"cleanData": false});
          streamPressure(interval, instance,true);
          break;
  }
}
stopStreamClick(event){
  event.preventDefault();
  stopStream();
  instance.setState({"streaming": false});
}
mockInsertClick(event){
  event.preventDefault();
  const fields=["name","dateOfBirth","sensorID","email"];
  // Meteor.call("getAllTabledata","patient",fields, function (err, res) {
  //     console.log("table data ", err, res)
  // });

  Meteor.call("getLatestBySensorID","heart_beat2",function (err, res) {
      console.log("table data ", err, res)
  });
  // const mode = instance.state.graphMode;
  // let targetMethod;
  // switch (mode) {
  //     case PlotlyUtils.modes.pressure:
  //         targetMethod = LargeMat.methods.mockInsertSegments;
  //         break;
  //
  // }
  // Meteor.call(targetMethod, function (err, res) {
  //     console.log("mock insert ", err, res)
  // });
}
cleanChartClick(event){
  event.preventDefault();
  stopStream();
  instance.setState({"streaming": false});
  if ($('#pressure-graph-target').get(0)) {
    PlotlyUtils.purge($('#pressure-graph-target').get(0));
    PlotlyUtils.timeSeries($('#pressure-graph-target').get(0),this.state.graphMode);
  }
}
updateIntervalChange(event){
  event.preventDefault();
  stopStream();
  instance.setState({"streaming": false});
}
pressureUpperThresholdChange(event){
  const value = $(event.target).val();
  this.setState({upperThreshold:value});
  const mode = instance.state.graphMode;
  var dateOffset = (10*1000)//(24*60*60*1000) * 5; //5 days
  var myDate = new Date();
  myDate.setTime(myDate.getTime() - dateOffset);
  PlotlyUtils.updateUpperThreshold(mode, value);
  var layout = {

    shapes: [
    {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: PlotlyUtils.getZmin(mode),
        x1: 1,
        y1: PlotlyUtils.getZmin(mode),
        line:{
            color: 'rgb(255, 0, 0)',
            width: 1,
            dash:'dashdot'
          }
      },
      {
          type: 'line',
          xref: 'paper',
          x0: 0,
          y0: PlotlyUtils.getZmax(mode),
          x1: 1,
          y1: PlotlyUtils.getZmax(mode),
          line:{
              color: 'rgb(255, 0, 0)',
              width: 1,
              dash:'dashdot'
            }
        }
    ],
    };
    if ($('#pressure-graph-target').get(0)) {
      PlotlyUtils.relayout($('#pressure-graph-target').get(0),layout)
    }
}
pressureLowerThresholdChange(event){
  const value = $(event.target).val();
  this.setState({lowerThreshold:value});
  const mode = instance.state.graphMode;
  PlotlyUtils.updateLowerThreshold(mode, value);
  var layout = {

    shapes: [
    {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: PlotlyUtils.getZmin(mode),
        x1: 1,
        y1: PlotlyUtils.getZmin(mode),
        line:{
            color: 'rgb(255, 0, 0)',
            width: 1,
            dash:'dashdot'
          }
      },
      {
          type: 'line',
          xref: 'paper',
          x0: 0,
          y0: PlotlyUtils.getZmax(mode),
          x1: 1,
          y1: PlotlyUtils.getZmax(mode),
          line:{
              color: 'rgb(255, 0, 0)',
              width: 1,
              dash:'dashdot'
            }
        }
    ],
    };
    if ($('#pressure-graph-target').get(0)) {
      PlotlyUtils.relayout($('#pressure-graph-target').get(0),layout)
    }
}
}
//////////////////////////////////////////// end of class

let streamPressureId;
let streamPressureDocId = "";

////////////////////////////////////////////////////////////////////////////////////////////
//
//
//  STREAM PRESSURE
//
////////////////////////////////////////////////////////////////////////////////////////////

export const streamPressure = function (interval = 1000, instance,firstRead=false) {
    stopStream();
    const targetCanvas = $('#pressure-graph-target').get(0);
    const local = instance.state.local;
    streamPressureId = setInterval(function () {

            streamPressureServer(targetCanvas,firstRead);

        firstRead=false;
    }, interval);
};

//let LargeMatCollection;
// export const streamPressureLocal = function(targetCanvas,firstRead=false) {
//   const middlecollection = Mongo.Collection.get(LargeMat.segments.MiddleSegmentName);
//   const rightcollection = Mongo.Collection.get(LargeMat.segments.RightSegmentName);
//   const leftcursor = leftcollection.find({}, {limit:1, hint: {$natural: -1}}); // getting the last entry is done via $natual:-1
//   const middlecursor = middlecollection.find({}, {limit:1, hint: {$natural: -1}});
//   const rightcursor = rightcollection.find({}, {limit:1, hint: {$natural: -1}});
//   const latestDoc=null;
//   if (leftcursor.count()>0 && middlecursor.count()>0 && rightcursor.count()>0) {
//     latestDoc= {
//       left:leftcursor.fetch()[0],
//       middle:middlecursor.fetch()[0],
//       right:rightcursor.fetch()[0]
//     }
//   }
//     if (!latestDoc)return;
//     streamPressureProcessdoc(latestDoc, targetCanvas,firstRead);
// }
export const streamPressureServer  =function (targetCanvas,firstRead=false) {
    Meteor.call("getLatestBySensorID","heart_beat2", function (err, latestDoc) {
        streamPressureProcessdoc(latestDoc, targetCanvas);
    })
};
export const streamPressureProcessdoc = function (latestDoc, targetCanvas,firstRead=false) {
  if (latestDoc ) {
      console.log(latestDoc);
      const initialTime = new Date().getTime();
      if(firstRead){
        latestDoc.title="heartbeat0";
        PlotlyUtils.timeSeries(targetCanvas,nextProps.data.mode,latestDoc);
      }else {
        PlotlyUtils.timeSeriesExtend(targetCanvas,latestDoc)
      }

            instance.setState({title:latestDoc.time});
        const afterRenderTime = new Date().getTime();
        console.log("RENDER TIME: ", (afterRenderTime-initialTime));
    }
    // else if (latestDoc) {
    //   console.log("stream Segment: same ID");
    // }
    else {
        console.log("stream Segment: null");
    }
};

export const stopStream = function () {
    clearInterval(streamPressureId);
};
