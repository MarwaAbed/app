import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {PlotlyUtils} from "../../../api/plotly/PlotlyUtils";

export default class DonutChart extends React.Component{
  constructor(props){
    super(props);
    //console.log("piechart", props);
    this.state={
      "data":this.props.data,
      "order": this.props.order,
      "title":this.props.data.title
    };
    //console.log("pie data",this.state.data);
  }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }
  componentDidMount(){
    this.renderLine();
  }
  renderLine(){
      const data = this.state.data;
      const order = this.state.data.order;
  console.log("inrender plotly",data);
  console.log("inrender plotly order",order);
      if(data && $('.donut-chart-target')[order]) {
        ////console.log("inrender plotly ready",data);
          //PlotlyUtils.linechart( $('#pie-chart-target')[0], data);
          PlotlyUtils.donutChart(data, $('.donut-chart-target')[order]);
      }
  }

  render(){
    return (
      <div >
          <div>
            <h3 className="card-title">{this.state.data.title}</h3>
            <div className="responsive-plot donut-chart-target"></div>
          </div>
        {this.renderLine()}
      </div>
    );
  }
}
