import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

const instance=null
export default class DateRangePicker extends React.Component{

  constructor(props){
    super(props);
    instance=this;
console.log("in DateRangePicker")
  }
  componentDidMount(){
    instance.renderDateRange();
  }
  renderDateRange(){
    console.log("in render daterangepicker")
      if( $('#reservation'))
      {
      $('#reservation').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss'
        }
    });
      $('#reservation').on('apply.daterangepicker', function(ev, picker) {
        var startDate = picker.startDate;
        var endDate = picker.endDate;
        instance.props.callback({startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),endDate: endDate.format('YYYY-MM-DD HH:mm:ss')});
      });
      }
  }
setValue(event){
  // console.log("daterange",$('#reservation').val())
  // instance.props.callback($('#reservation').val());
}
  render(){
    return (
      <div class="input-group">
        <div class="input-group-addon">
          <i class="fa fa-calendar"></i>
        </div>
        <input type="text" onChange={this.setValue.bind(this)} class="form-control pull-right" id="reservation"/>
      </div>
    );
  }
}
