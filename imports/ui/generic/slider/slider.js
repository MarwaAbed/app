import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

const instance=null
export default class Slider extends React.Component{

  constructor(props){
    super(props);
    instance=this;
    //console.log("in reder slider")

    instance.state={
      "min":(props.min)?props.min:0,
      "max":(props.max)?props.max:50
    };
    //console.log("pie data",this.state.data);
  }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.min !== instance.state.min || nextProps.max !== instance.state.max) {
      instance.setState({min: nextProps.min });
      instance.setState({max: nextProps.max});
      if($('#sliderID'))
      {
      document.getElementById('sliderID').noUiSlider.updateOptions({
      		range: {
      			'min': nextProps.min,
      			'max': nextProps.max
      		}
      	});
      }
      }
    }
  componentDidMount(){
    instance.renderSlider();
  }
  renderSlider(){
    console.log("in reder slider")
      if($('#sliderID'))
      {
        const dateValues = [
          // document.getElementById('event-start'),
          // document.getElementById('event-end')
        ];
        try {
          //$('#sliderID').noUiSlider.destroy()
        noUiSlider.create(document.getElementById('sliderID'), {
          start: 0,
          connect: [true, false],
          step: (instance.state.max && instance.state.max > 0)?instance.state.max/50:1,
          range: {
          'min': instance.state.min,
          'max': instance.state.max
          },
          pips: { // Show a scale with the slider
          		mode: 'steps',
          		stepped: true,
          		density: 4
          	}

        }).on('change', function (ev, val) {
           //dateValues[val].innerHTML = ev[val];
           instance.props.callback([Math.round(ev[0]), Math.round(ev[1])]);
        //Session.set('sliderData', [Math.round(ev[0]), Math.round(ev[1])]);
        });
        } catch (err) {}

      }
  }

  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
        <div id="sliderID" ></div>
        {/* Value :
        <span id="event-start">40</span>
        <span id="event-end" class="pull-right"></span> */}
      </div>
    </div>
    );
  }
}
