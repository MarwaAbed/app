import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

export default class NotFound extends React.Component{
  render(){
    return (
      <div className="jumbotron">
    		<h1>404 - Page not found</h1>
    		<a href="/" className="btn btn-primary"><i className="fa fa-home"></i> Back to home</a>
    	</div>
    );
  }
}
