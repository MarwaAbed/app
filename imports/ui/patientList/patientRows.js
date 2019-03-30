import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Tasks} from '../../api/collections/test.js'
// // TrackerReact is imported (default) with Meteor 1.3 new module system
// import TrackerReact from 'meteor/ultimatejs:tracker-react';

// Get the Collection

// > React.Component is simply wrapped with TrackerReact
export default class PatientRows extends React.Component {

	// Note: In ES6, constructor() === componentWillMount() in React ES5
	constructor(props) {
		super(props);
    console.log(this.props);
		this.state = {
          patients:this.props.patients
        };
		this.updatePatients=this.updatePatients.bind(this);
	}
  componentDidMount(){
    this.TestTracker = Tracker.autorun(()=> {
			const patients=this.props.patients;
			this.setState({patients});
    });
  }

	componentWillReceiveProps(nextProps) {
	    if(JSON.stringify(this.props.patients) !== JSON.stringify(nextProps.patients)) // Check if it's a new user, you can also use some unique, like the ID
	    {
	           this.updatePatients();
	    }
	}
	updatePatients(){
		const patients=this.props.patients;
		this.setState({patients});
	}
	componentWillUnmount() {
		//this.state.subscription.tasks.stop();
		this.TestTracker.stop();
	}
  renderPatientsListItem(){
    return this.state.patients.map((patientDoc)=>{
       return <tr key={patientDoc._id}><td>{patientDoc.name}</td></tr>
    });
  }
	//tracker-based reactivity in action, no need for `getMeteorData`!
	tasks() {
	    //return Tasks.find({}).fetch(); //fetch must be called to trigger reactivity
	}
  click(){
    //Tasks.insert({name:"hello"});
  }
  render(){
    return (
      <tbody>
      {this.renderPatientsListItem()}
      </tbody>

    );
  }
}
