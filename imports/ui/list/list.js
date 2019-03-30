import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {Session} from 'meteor/session';
import {Mongo} from 'meteor/mongo';
import {
  Redirect
} from 'react-router-dom'

import PyramidChart from '../visualizations/pyramidchart/pyramidchart.js'
import BoxChart from '../visualizations/boxchart/boxchart.js'

export default class List extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      data:{},
      hideNewEntryButton:false,
      hideEdit:false,
      title:"",
      unkownCollection:false,
      icon:"",
      filter:{},
      sort:{},
      collection:{}
    }
    if(!props.fromPatientDashboard)
    Session.set("viewtitle",this.props.data.title)
  }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.state.data) {
      this.initialization(nextProps)
    }
  }
  componentWillMount(){
    this.initialization(this.props)
  }
/////////////////////////////////////// helpers
initialization(props){
  this.setState({data:props.data});
const params = props.data;

    console.log("list params", params);
    if (!params) {
        return;
    }

    const collection = params.collection;
    if (!collection || !Mongo.Collection.get(collection)) {
        console.log("unknown collection:", params.collection);
        this.setState({"unkownCollection": true});
        return;
    }

    if (params.title) {
        this.setState({"title": params.title});
    }

    if (params.icon) {
        this.setState({"icon": params.icon});
    }

    if (params.filter) {
        this.setState({"filter": typeof params.filter === 'function' ? params.filter() : params.filter});
    }

    if (params.sort) {
        this.setState({"sort": typeof params.sort === 'function' ? params.sort() : params.sort});
    }

    if (params.hideNewEntryButton) {
        this.setState({"hideNewEntryButton": true});
    }

    if (params.hideEdit) {
        this.setState({"hideEdit": true});
    }

    const collectionInstance = Mongo.Collection.get(collection);
    //console.log("set colleciton def", collectionInstance)
    console.log("set collection def");
    this.setState({"collection": collectionInstance.def});
    console.log("list load complete");

}
boxData(){
  console.log("insdie chart6")
  var trace1 = {
    type: 'box',
    y:[1,2,3,4,5,6,7,8,9,0,10,11,11,12,3,4,4],
   name:'Bob',

   boxmean:'sd'
  };

  var trace2 = {
    type: 'box',
    y:[3,4,5,4,3,4,5,6,7,8,2,3,4,5,3,2,1],
   name:'Amy',

   boxmean:'sd'
  };
  var trace3 = {
    type: 'box',
    y:[9,2,1,8,7,6,5,5,5,5,5,5,5,5,5,5,4],
   name:'Jen',

   boxmean:'sd'
  };

  var data = [trace1, trace2,trace3];

      return {
     data:data,
     title: "Average # for patient/day for nurses",
     order: 0
   };
}
pyramidData(){
    return {
      data:[
        ['Surgical',        5],
        ['Rehab,Emergency', 4],
        ['ICU',             3],
        ['mental health',   2],
        ['Obstetrics',      1]
    ],
    title:"Number of Nurses/Ward"
  };
}
ifCollectionName(name){
  const collection = this.state.collection;
  return collection.name == name;

}
collectionName() {
        const collection = this.state.collection;
        return collection ? collection.name : "";
    }
noDocs() {
    const collection = this.state.collection;
    if (!collection) return true;
    const instance = Mongo.Collection.get(collection.name);
    const filter = this.state.filter || {};
    return instance.find(filter).count() === 0;
}
icon() {
    const icon = this.state.icon;
    if (icon) return icon;
    const collection = this.state.collection;
    return collection ? collection.icon : "";
}
header() {
        const collectionDef = this.state.collection;
        return collectionDef ? Object.values(collectionDef.publicFields) : "";
    }
documents() {
    const collection = this.state.collection;
    if(!collection) return [];
    const instance = Mongo.Collection.get(collection.name);
    const filter = this.state.filter || {};
    const sort = this.state.sort || {};
    return instance.find(filter, {sort: sort || {name:1}});
}
collectionTitle() {
    const title = this.state.title;
    if (title) return title;
    const collection = this.state.collection;
    return collection ? collection.title : "";
}
count() {
    const collection = this.state.collection;
    if (!collection) return 0;
    const instance = Mongo.Collection.get(collection.name);
    console.log("collection",collection);
    console.log("mongo",Mongo.Collection.get(collection.name))
    const filter = this.state.filter || {};
    return instance.find(filter).count();
}
publicFields(document) {
    const values = new Array();
    const collectionDef = this.state.collection;
    if (!collectionDef) return [];
    const publicFields = Object.keys(collectionDef.publicFields);
    for (let field of publicFields) {
        const value = document[field];
        values.push({key: field, value: value});
    }
    return values;
}
rowClass(document) {
    const collectionDef = this.state.collection;
    if (!collectionDef) return "";
    const instance = Mongo.Collection.get(collectionDef.name);
    return instance.resolveRowClass ? instance.resolveRowClass(document) : "";
}
resolveFields() {
        const collectionDef = this.state.collection;
        if (!collectionDef) return false;
        const instance = Mongo.Collection.get(collectionDef.name);
        return !!(instance.resolveFields);
    }
resolveField(key, value) {
    const collectionDef = this.state.collection;
    if (!collectionDef) return value;
    const instance = Mongo.Collection.get(collectionDef.name);
    return instance.resolveFields(key, value);
}
actions(document) {

    const collectionDef = this.state.collection;
    if (!collectionDef) return [];
    const instance = Mongo.Collection.get(collectionDef.name);
    return instance.actions ? instance.actions(document) : [];
}
hasActions(document) {

    const collectionDef = this.state.collection;
    if (!collectionDef) return [];
    const instance = Mongo.Collection.get(collectionDef.name);
    return instance.actions ? true : false;
}
hideEdit() {
    return this.state.hideEdit;
}
hideNewEntryButton(){
    return this.state.hideNewEntryButton;
}
  ///////////////////////////////////// render function

  renderBody(){
    return (
      this.documents().map((doc)=>{
        return(
        <tr className={this.rowClass(doc)}>
          {this.publicFields(doc).map((publicField)=>{
            return(
              this.resolveFields()?
              <td>{this.resolveField(publicField.key,publicField.value)}</td>
            :
              <td>{publicField.value}</td>

          )
          })}

          <td className="col-action">

            {this.hasActions(doc)?
              <div className="dropdown">
                <button className="dropdown-toggle btn btn-primary btn-round btn-fab btn-fab-mini"
                    data-toggle="dropdown">
                  <i className="material-icons">settings applications</i>
                </button>
                <ul className="dropdown-menu dropdown-menu-left">
                  {this.actions(doc).map((action)=>{
                    return(
                      [
                      <li>
                        <a href={action.path}>
                          <i className={"fa fa-fw fa-"+action.icon}></i> {action.label}
                        </a>
                      </li>,
                      <li className="divider"></li>
                    ]
                    )
                  })}
                </ul>
              </div>
            :""}
            {this.hideEdit()?
              ""
            :<a className="btn btn-default btn-sm"
               href={"/formupdate/"+this.collectionName()+"/"+doc._id}
               target={"/formupdate/"+this.collectionName()+"/"+doc._id}>
              <i className="fa fa-fw fa-pencil"></i>
            </a>}
          </td>
        </tr>
      )
      })
    )
  }
  renderHeader(){
    const renderHeader=(
      <thead>
        <tr>
        </tr>
      </thead>
    );
    if(this.ifCollectionName('request') && this.state.hideNewEntryButton)
    {
      if(this.state.hideNewEntryButton){
        renderHeader=(
          <thead>
          <tr>

          </tr>
          </thead>
        )
      }
      else{
        renderHeader=(
          <thead>
          <tr>
            {this.header().map((head)=>{
              return <th>{head}</th>
            })}
            <th className="col-action">Actions</th>
          </tr>
          </thead>
        )
      }
      }
      else{
        renderHeader=(
          <thead>
          <tr>
            {this.header().map((head)=>{
              return <th>{head}</th>
            })}
            <th className="col-action">Actions</th>
          </tr>
          </thead>
        )
      }

    return renderHeader;
  }
  renderList(){
    console.log("renderList")
    return (
      <div className="card" style={this.ifCollectionName('request')? this.hideNewEntryButton()? {marginTop: -100}:{}:{}}>
  			<div className="card-header card-header-icon" data-background-color="purple">
  				<i className={"fa fa-fw fa-"+this.icon()}></i>
  			</div>
  			<div className="card-content">
  				<h4 className="card-title">{this.collectionTitle()}</h4>
          <div className="toolbar">

            {this.state.hideNewEntryButton?
              <span className="pull-right text-muted">
                <i className={"fa fa-fw fa-"+this.icon()}></i> {this.count()}
              </span>

            :

              <a className="btn btn-primary pull-right" href={"/form/"+this.collectionName()}
                 target={"/form/"+this.collectionName()}>
                <i className="fa fa-plus"></i> New Entry
              </a>
            }
          </div>
  				<hr/>
  				{this.noDocs()?
  					<div className="well">Currently no entries.</div>
  				:


  					<div className="material-datatables">
  						<table className="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%"
  							   style={{width:"100%"}}>
                   {this.renderHeader()}
  							<tbody>
                  {this.renderBody()}
  							</tbody>
  						</table>
  					</div>}
  			</div>
		</div>

    )
  }
  renderBottomCharts(){
    return(
      this.ifCollectionName('staff')?
    <div className="row">
      <div className="col-lg-4">
        <PyramidChart data={this.pyramidData()}/>
      </div>
      <div className="col-lg-8">
        <BoxChart data={this.boxData()}/>
      </div>
    </div>
    :"");
  }
  render(){
    if(!Session.get("dataReady"))
    {
      Session.set("waitBackURL",this.props.location.pathname);
      return(
      <Redirect to={"/wait"}/>
    )
    }
    else{
      return (
        [
          this.renderList()
          ,
          this.renderBottomCharts()
        ]
      )
    }
  }
  //return <h1>{this.props.match.params.collection}</h1>;
}
