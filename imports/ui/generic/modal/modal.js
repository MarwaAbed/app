import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

const instance=null
export default class MyModal extends React.Component{

  constructor(props){
    super(props);
    instance=this;
    //console.log("in reder slider")

    instance.state={
      MyModal:props.MyModal?props.MyModal:"MyModal",
      MyModalLabel:props.MyModalLabel?props.MyModalLabel:"MyModalLabel"
    };
    //console.log("pie data",this.state.data);
  }
  componentWillReceiveProps(nextProps) {
    instance.setState({MyModal:nextProps.MyModal?nextProps.MyModal:"MyModal"})
    instance.setState({MyModalLabel:nextProps.MyModalLabel?nextProps.MyModalLabel:"MyModalLabel"})

    }
  componentDidMount(){
  }


  render(){
    return (
      <div className="modal fade" id={instance.state.MyModal} tabindex="-1" role="dialog" aria-labelledby={instance.state.MyModalLabel} aria-hidden="true" style={{display: "none"}}>
        <div className="modal-dialog modal-notice" style={{width: "70%"}}>
            <div className="modal-content" >
                <div className="modal-header">
                    {/* <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="material-icons">clear</i></button> */}
                    <h5 className="modal-title" id={instance.state.MyModalLabel}> </h5>
                </div>
                <div className="modal-body">
                  {instance.props.children}
                </div>
                <div className="modal-footer text-center">
                    <button type="button"  className="btn btn-info btn-round" data-dismiss="modal">close<div className="ripple-container"><div className="ripple ripple-on ripple-out" style={{left: 65.1563, top: 20.75, backgroundColor: "rgb(255, 255, 255)", transform: "scale(14.6621)"}}></div></div></button>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
