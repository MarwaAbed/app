import {check} from 'meteor/check';
//import {LargeMat} from "../sensor/BigMatt";
//import Plotly from 'plotly.js'

var math = require('mathjs');


Meteor.startup(function () {


    $(window).resize(function (evt) {
        // MAKE THE PLOTS RESPONSIVE

        var d3 = Plotly.d3;
        var WIDTH_IN_PERCENT_OF_PARENT = 100,
            HEIGHT_IN_PERCENT_OF_PARENT = 100;

        var gd3 = d3.selectAll(".responsive-plot")
            .style({
                width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

                //height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
                //'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
            });

        var nodes_to_resize = gd3[0]; //not sure why but the goods are within a nested array
        for (var i = 0; i < nodes_to_resize.length; i++) {
            Plotly.Plots.resize(nodes_to_resize[i]);
        }
    });
});

export const PlotlyUtils = {

    _pressure_lower_threshold:50,
    _pressure_upper_threshold:150,

    _humidity_lower_threshold: 1, //original 55,
    _humidity_upper_threshold: 80,

    _temp_lower_threshold: 10, //original: 23
    _temp_upper_threshold: 60, // original: 23


    modes: {
        humidity: "humidity",
        temperature: "temperature",
        pressure: "pressure",
    },

    graphs: {
        bar: "bar",
        default: "default",
        advanced: "advanced",
        squab:"squab",
        d3:"d3",
        d3liveAnimate:"d3liveAnimate"
    },

    getUpperThreshold(mode) {
        switch(mode){
            case this.modes.pressure:
                return PlotlyUtils._pressure_upper_threshold ;
                break;
            case this.modes.humidity:
                return PlotlyUtils._humidity_upper_threshold;
                break;
            case this.modes.temperature:
                return PlotlyUtils._temp_upper_threshold;
                break;
        }
    },

    getLowerThreshold(mode) {
        switch(mode){
            case this.modes.pressure:
                return PlotlyUtils._pressure_lower_threshold ;
                break;
            case this.modes.humidity:
                return PlotlyUtils._humidity_lower_threshold;
                break;
            case this.modes.temperature:
                return PlotlyUtils._temp_lower_threshold;
                break;
        }
    },
    updateUpperThreshold(mode, value) {
        switch(mode){
            case this.modes.pressure:
                PlotlyUtils._pressure_upper_threshold = value;
                break;
            case this.modes.humidity:
                PlotlyUtils._humidity_upper_threshold= value;
                break;
            case this.modes.temperature:
                PlotlyUtils._temp_upper_threshold= value;
                break;
        }
    },

    updateLowerThreshold(mode, value) {
        switch(mode){
            case this.modes.pressure:
                PlotlyUtils._pressure_lower_threshold = value;
                break;
            case this.modes.humidity:
                PlotlyUtils._humidity_lower_threshold= value;
                break;
            case this.modes.temperature:
                PlotlyUtils._temp_lower_threshold= value;
                break;
        }
    },

    transpose(data) {
        // Calculate the width and height of the Array
        var
            w = data.length ? data.length : 0,
            h = data[0] instanceof Array ? data[0].length : 0;

        // In case it is a zero matrix, no transpose routine needed.
        if (h === 0 || w === 0) { return []; }

        /**
         * @var {Number} i Counter
         * @var {Number} j Counter
         * @var {Array} t Transposed data is stored in this array.
         */
        var i, j, t = [];

        // Loop through every item in the outer array (height)
        for (i = 0; i < h; i++) {

            // Insert a new row (array)
            t[i] = [];

            // Loop through every item per item in outer array (width)
            for (j = 0; j < w; j++) {

                // Save transposed data.
                t[i][j] = data[j][i];
            }
        }

        return t;
    },

    emptyData: [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]],

    // X=24
    // Y=28
    emptyLargeMat: function () {
        return [
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

        ];
    },
    emptySmallMat: function () {
        return [
            [0.0, 0.0, 0.0, 0.0, 0.0,],
            [0.0, 0.0, 0.0, 0.0, 0.0,],
            [0.0, 0.0, 0.0, 0.0, 0.0,],
            [0.0, 0.0, 0.0, 0.0, 0.0,],
            [0.0, 0.0, 0.0, 0.0, 0.0,],
            [0.0, 0.0, 0.0, 0.0, 0.0,]
        ];
    },
    emptySmallMatWithQuadrants:function () {
        return {
            tl: this.emptySmallMat(),
            tr: this.emptySmallMat(),
            bl: this.emptySmallMat(),
            br: this.emptySmallMat(),
        }
    },
    emptySmallMatFull: function () {
        return [
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        ];
    },

    smallMatMapping:function(data){
          return data; // TODO
    },

    getColorScale(mode) {
        if (mode === this.modes.humidity)
            return [
                [0.0, '#FFFFFF'],
                [0.5, '#33daff'],
                [1, '#2f62ff'],
            ];
        if (mode === this.modes.temperature)
            return [
                [0.0, '#508de0'],
                [0.35, '#36e060'],
                [0.5, '#fde55c'],
                [1.0, '#3b0405'],
            ];
        return [
            [0.0, '#FFFFFF'],
            [0.5, '#007cff'],
            [1, '#ff0000']
        ];
    },

    getColorBarTitle(mode) {
        if (mode === this.modes.humidity)
            return "%";
        if (mode === this.modes.temperature)
            return 'Degrees Celsius';
        if (mode === this.modes.pressure)
            return 'mmHg';
        throw new Error("unknown mode "+ mode);
    },

    getZmin(mode) {
        if (mode === this.modes.humidity)
            return this._humidity_lower_threshold;
        if (mode === this.modes.temperature)
            return this._temp_lower_threshold;
        if (mode === this.modes.pressure)
            return  this._pressure_lower_threshold;
        throw new Error("unknown mode "+ mode);
    },

    getZmax(mode) {
        if (mode === this.modes.humidity)
            return this._humidity_upper_threshold;
        if (mode === this.modes.temperature)
            return this._temp_upper_threshold;
        if (mode === this.modes.pressure)
            return this._pressure_upper_threshold;
        throw new Error("unknown mode "+ mode);
    },

    render(data, graph, mode, target, options = {}) {
        //console.log("Pltolyutils.render: mode="+mode+" graph="+graph)
        switch (graph) {
            case PlotlyUtils.graphs.bar:
                PlotlyUtils.barChart(data.x, data.y, target, options);
                break;
            case PlotlyUtils.graphs.default:
                PlotlyUtils.defaultGraph(data, mode, target, options);
                break;
            case PlotlyUtils.graphs.advanced:
                PlotlyUtils.advancedGraph(data, mode, target, options);
                break;
            case PlotlyUtils.graphs.d3:
                PlotlyUtils.d3(data, mode, target, options);
                break;
            case PlotlyUtils.graphs.d3liveAnimate:
                PlotlyUtils.d3liveAnimate(data, mode, target, options);
            case PlotlyUtils.graphs.squab:
                break;

            default:
                throw new Error("unknown plotly graph type: " + graph);
        }
    },

    defaultGraph(data, mode, target, options={}) {
          //check(data, Array);
          //check(mode, String);
          ////console.log("Plotly Utils render default ", mode, data);

          const colorScale2 = this.getColorScale(mode);
          const colorBarTitle = this.getColorBarTitle(mode);
          const zmin = this.getZmin(mode);
          const zmax = this.getZmax(mode);

          if (!data) data = this.emptySmallMatFull();

          Plotly.newPlot(target, [{
              z: data,
              colorscale: colorScale2,
              type: "contour",
              zmin: zmin,
              zmax: zmax,
              zauto: false,
              colorbar: {
                  title: colorBarTitle,
                  titleside: 'right',
                  titlefont: {
                      size: 24,
                      family: 'Arial, sans-serif'
                  }
              },
              contours: {
                  start: zmin,
                  end: zmax,
                  size: 1
              }
          }], {
              xaxis: {
                  gridcolor: 'transparent',
                  autotick: false,
                  ticks: 'inside',
                  tick0: 0,
                  dtick: 100,
                  ticklen: 100,
                  tickwidth: 100,
                  tickcolor: 'white',
                  showticklabels: false,
                  linecolor: 'black',
                  linewidth: 2,
                  mirror: true,
                  title: options.title || "",
              },
              yaxis: {
                  autorange: 'reversed',
                  autotick: false,
                  ticks: 'inside',
                  tick0: 0,
                  dtick: 100,
                  ticklen: 100,
                  tickwidth: 100,
                  tickcolor: 'white',
                  showticklabels: false,
                  linecolor: 'black',
                  linewidth: 2,
                  mirror: true
              },
              autosize: true,
              width: options.width,
              height: options.height,
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
              font: {
                  size: 24,
                  color: '#000000'
              },
              colorScale: PlotlyUtils.getColorScale(mode),
          }, {
              displayModeBar: false
          });

      },
      d3liveAnimate(data, mode, target, options={}){
        //console.log("d3Liveanimate",data);
        Plotly.addFrames(target, [
          {data:[
            {
            //   x: xrange,
            //   y: yrange,
              z: data,
              type: 'surface',
              colorscale: [
                ['0.0', 'rgb(255,255,255)'],
                ['0.5', 'rgb(0,0,255)'],
                ['0.7', 'rgb(255,0,0)'],
                ['1.0', 'rgb(255,0,0)']
              ],
              colorbar:{
                showticklabels:false,
              },
              showscale:true,
              cmin: PlotlyUtils.getZmin(mode),
              cmax: PlotlyUtils.getZmax(mode),
              cauto: false,
            }
          ],
          name: options.title
          }
        ]);
        Plotly.animate(target, [options.title], {
            frame: [
              {duration: 0,redraw:false},
            ],
            transition: [
              {duration: 0},
            ],
            mode: 'immediate'
          })


      },
      d3Animate(interval,mode, target,options={}){
        //console.log("d3animate",interval[0].data.data);
        trace1 = {
          x: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],
          y: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          z: interval[0].data.data,
          colorscale: [
            ['0.0', 'rgb(255,255,255)'],
            ['0.5', 'rgb(0,0,255)'],
            ['0.7', 'rgb(255,0,0)'],
            ['1.0', 'rgb(255,0,0)']
          ],
          colorbar:{
            showticklabels:false,
          },
          type: 'surface',
          cmin: PlotlyUtils.getZmin(mode),
          cmax: PlotlyUtils.getZmax(mode),
          cauto: false,
        };
        //console.log(interval);
        data = [trace1];
        sliderSteps=[];
        frames=[];
        for(i=0;i<interval.length;i++)
        {
          sliderSteps.push(
            {
              args: [
                ['frame'+i], {
                  frame: {
                    duration: 0,
                    redraw: false
                  },
                  transition: {duration: 0},
                  mode: 'immediate'
                }
              ],
              label: ''+interval[i].Tdate,
              method: 'animate'
            });
            frames.push({
              data:[
                {
                //   x: xrange,
                //   y: yrange,
                  z: interval[i].data.data,
                  colorscale: [
                    ['0.0', 'rgb(255,255,255)'],
                    ['0.5', 'rgb(0,0,255)'],
                    ['0.7', 'rgb(255,0,0)'],
                    ['1.0', 'rgb(255,0,0)']
                  ],
                  colorbar:{
                    showticklabels:false,
                  },
                  type: 'surface',
                  cmin: PlotlyUtils.getZmin(mode),
                  cmax: PlotlyUtils.getZmax(mode),
                  cauto: false,
                }
              ],
              name: 'frame'+i
            })
        }
        layout = {
          updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Play'}
      // , {
      //   method: 'animate',
      //   args: [[null], {
      //     mode: 'immediate',
      //     transition: {duration: 0},
      //     frame: {duration: 0, redraw: false}
      //   }],
      //   label: 'Pause'
      // }
    ]
    }],
          sliders: [
            {
              x: 0.1,
              y: 0,
              active: 0,
              currentvalue: {
                font: {size: 20},
                prefix: 'Current:',
                visible: true,
                xanchor: 'right'
              },
              len: 0.9,
              pad: {
                t: 50,
                b: 10
              },
              steps: sliderSteps,
              transition: {
                duration: 0,
                easing: 'cubic-in-out'
              },
              xanchor: 'left',
              yanchor: 'top'
            }
          ],
          margin:{
            l:0,
            r:0,
            t:0,
            b:0,
            pad:0,
            autoexpand:true
          },
          scene: {
            aspectmode:"manual",
            aspectratio:{
              x:(options.aspectratioX?options.aspectratioX:2),
              y:(options.aspectratioY?options.aspectratioY:1),
              z:0.2
            },
            camera:{
                up:{x:0, y:0, z:1},
                center:{x:0.1, y:0, z:0},
                eye:{x:0.1, y:1.1076507764200195e-16, z:-1.8089449430311995}
            },
            xaxis: {
              autorange:false,
              showticklabels: false,
              showline:false,
              showgrid: false,
              zeroline: false,
              title:"",
              showspikes:false,
              range:[0,options.xrange]
            },
            yaxis: {
              autorange:false,
              showticklabels: false,
              showline:false,
              showgrid: false,
              zeroline: false,
              showspikes:false,
              title:"",
              range:[0,options.yrange]
            },
            zaxis: {
              autorange:false,
              showticklabels: false,
              showline:false,
              showgrid: false,
              zeroline: false,
              title:"",
              showspikes:false,
              range:[0,4100]//PlotlyUtils.getZmax(mode)]

            }
          }
          ,

          autosize: true,
          // width: 1300,
           //height: 600,
          title: options.title || "",//'$f(x,y) = A \cos(\pi x y) e^{-(x^2+y^2)/2}$'
        };
        //console.log(frames)
        //console.log(data)
        //Plotly.newPlot(target,data,layout,frames)
        Plotly.newPlot(target, {
          data: data,
          layout: layout,
          frames: frames
        },{displayModeBar: false});
      },
      d3(data, mode, target, options={}) {
        //console.log("d3",data);
        if(!data)
        data=(!data)?PlotlyUtils.emptyLargeMat():data;
        console.log("first d3",data)
        trace1 = {
          x: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],
          y: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          z: data,
          colorscale: [
            ['0.0', 'rgb(255,255,255)'],
            ['0.5', 'rgb(0,0,255)'],
            ['0.7', 'rgb(255,0,0)'],
            ['1.0', 'rgb(255,0,0)']
          ],
          colorbar:{
            showticklabels:false,
          },
          showscale:true,
          type: 'surface',
          cmin: PlotlyUtils.getZmin(mode),
          cmax: PlotlyUtils.getZmax(mode),
          cauto: false,
        };
        data = [trace1];
        layout = {
          margin:{
            l:0,
            r:0,
            t:0,
            b:0,
            pad:0,
            autoexpand:true
          },
          scene: {
            aspectmode:"manual",
            aspectratio:{
              x:(options.aspectratioX?options.aspectratioX:2),
              y:(options.aspectratioY?options.aspectratioY:1),
              z:0.2
            },
            camera:{
                up:{x:0, y:0, z:1},
                center:{x:0.1, y:0, z:0},
                eye:{x:0.1, y:1.1076507764200195e-16, z:-1.8089449430311995}
            },
            xaxis: {
              autorange:false,
              showticklabels: false,
              showline:false,
              showgrid: false,
              title:"",
              zeroline: false,
              showspikes:false,
              range:[0,options.xrange],
            },
            yaxis: {
              autorange:false,
              showticklabels: false,
              showline:false,
              showgrid: false,
              zeroline: false,
              title:"",
              showspikes:false,
              range:[0,options.yrange],
            },
            zaxis: {
              autorange:false,
              showticklabels: false,
              showline:false,
              showgrid: false,
              title:"",
              zeroline: false,
              showspikes:false,
              range:[0,4100]//PlotlyUtils.getZmax(mode)]

            }

          },
          autosize: true,
          // width: 1300,
          // height: 600,
          title: options.title || "",//'$f(x,y) = A \cos(\pi x y) e^{-(x^2+y^2)/2}$'
        };
        // plotly.plot(data, {layout: layout}, function(err, msg) {
        //   //console.log(msg);
        // });
        Plotly.newPlot(target,data,layout,{displayModeBar: false})
        //Plotly.Plots.resize(target);
          //if (!data) data = this.emptyLargeMat();

          // Plotly.newPlot(target,
          //     [{
          //         z: data,
          //         type: "contour",
          //         colorscale: PlotlyUtils.getColorScale(mode),
          //         zmin: PlotlyUtils.getZmin(mode),
          //         zmax: PlotlyUtils.getZmax(mode),
          //         zauto: false,
          //
          //         colorbar: {
          //             title: "",
          //             titleside: 'right',
          //             titlefont: {
          //                 size: 24,
          //                 family: 'Arial, sans-serif'
          //             }
          //         },
          //         contours: {
          //             start: PlotlyUtils.getZmin(mode),
          //             end: PlotlyUtils.getZmax(mode),
          //             size: 30,
          //
          //         },
          //     }], {
          //     xaxis: {
          //         gridcolor: 'transparent',
          //         autotick: false,
          //         ticks: 'inside',
          //         tick0: 0,
          //         dtick: 100,
          //         ticklen: 100,
          //         tickwidth: 100,
          //         tickcolor: 'white',
          //         showticklabels: false,
          //         title: options.title || "",
          //     },
          //     yaxis: {
          //         autorange: 'reversed',
          //         autotick: false,
          //         ticks: 'inside',
          //         tick0: 0,
          //         dtick: 100,
          //         ticklen: 100,
          //         tickwidth: 100,
          //         tickcolor: 'white',
          //         showticklabels: false,
          //     },
          //     autosize: true,
          //     width: options.width,
          //     height: options.height,
          //     paper_bgcolor: 'white',
          //     plot_bgcolor: 'white',
          //     colorScale: PlotlyUtils.getColorScale(mode),
          // }, {
          //     displayModeBar: false
          // });
      },
      timeSeries(target,mode,trace1Data={time:[Date().toLocaleString()],read:[0],title:"Heartbeat"}){
        var trace1 = {
          type: "scatter",
          mode: "lines",
          name: trace1Data.title,
          x: trace1Data.time,
          y: trace1Data.read,
          fill: 'tonexty',
          //line: {color: '#17BECF'}
        }

        // var trace2 = {
        //   type: "scatter",
        //   mode: "lines",
        //   name: trace2Data.title,
        //   x: trace2Data.Tdate,
        //   y: trace2Data.average,
        //   fill: 'tonexty',
        //   //line: {color: '#7F7F7F'}
        // }
        // var trace3 = {
        //   type: "scatter",
        //   mode: "lines",
        //   name: trace3Data.title,
        //   x: trace3Data.Tdate,
        //   y: trace3Data.average,
        //   fill: 'tonexty',
        //   //line: {color: '#7F7000'}
        // }

        var data = [trace1/*,trace2,trace3*/];

        var layout = {
          title: 'Body segments pressure average',
          legend:{
            orientation:"h",
            x:0.3,
            xanchor:"left",
            y:-0.4,
            yanchor:"top"
          },
          margin:{
            l:40,
            r:0,
            t:30,
            b:0,
            pad:0,
            autoexpand:true
          },
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
          xaxis: {
            autorange: true,
            // range: ['2015-02-17', '2017-02-16'],
            // rangeselector: {buttons: [
            //     {
            //       count: 1,
            //       label: '1m',
            //       step: 'month',
            //       stepmode: 'backward'
            //     },
            //     {
            //       count: 6,
            //       label: '6m',
            //       step: 'month',
            //       stepmode: 'backward'
            //     },
            //     {step: 'all'}
            //   ]},
            rangeslider: {range: [trace1Data.time, trace1Data.time]},
            type: 'date'
            },
            yaxis: {
              //autorange: true,
               range: [50, 150],
              type: 'linear'
            }
          };

          Plotly.newPlot(target, data, layout,{displayModeBar: false});

      },
      timeSeriesExtend(target,leftSegment){
        console.log("segments",leftSegment);
        Plotly.extendTraces(target, {
          x:[[leftSegment.time]],
          y:[[leftSegment.read]]
        }, [0],30)
        //Plotly.relayout(target, [], [])
      },
      advancedGraph(data, mode, target, options={}) {

          if (!data) data = this.emptyLargeMat();

          Plotly.newPlot(target,
              [{
                  z: data,
                  type: "contour",
                  colorscale: PlotlyUtils.getColorScale(mode),
                  zmin: PlotlyUtils.getZmin(mode),
                  zmax: PlotlyUtils.getZmax(mode),
                  zauto: false,

                  colorbar: {
                      title: "",
                      titleside: 'right',
                      titlefont: {
                          size: 24,
                          family: 'Arial, sans-serif'
                      }
                  },
                  contours: {
                      start: PlotlyUtils.getZmin(mode),
                      end: PlotlyUtils.getZmax(mode),
                      size: 30,

                  },
              }], {
              xaxis: {
                  gridcolor: 'transparent',
                  autotick: false,
                  ticks: 'inside',
                  tick0: 0,
                  dtick: 100,
                  ticklen: 100,
                  tickwidth: 100,
                  tickcolor: 'white',
                  showticklabels: false,
                  title: options.title || "",
              },
              yaxis: {
                  autorange: 'reversed',
                  autotick: false,
                  ticks: 'inside',
                  tick0: 0,
                  dtick: 100,
                  ticklen: 100,
                  tickwidth: 100,
                  tickcolor: 'white',
                  showticklabels: false,
              },
              autosize: true,
              width: options.width,
              height: options.height,
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
              colorScale: PlotlyUtils.getColorScale(mode),
          }, {
              displayModeBar: false
          });
      },

    barChart(x, y, target) {
        const data = [
            {
                x: x,
                y: y,
                type: 'bar'
            }
        ];
        //console.log("from plotly",data);
        Plotly.newPlot(target, data, {
            displayModeBar: false,
        });
    },

    pieChart(x, y, target) {
        const data = [{
            values: x,
            labels: y,
            type: 'pie'
        }];

        const layout = {
//            height: 400,
//            width: 500
            showlegend: false,

        };
        Plotly.newPlot(target, data, layout);
    },

    donutChart(data,target) {
        const input = [{
            values: data.x,
            labels: data.y,
            colors: data.colors,
            //name: data.title,
            //hoverinfo: 'label+percent+name',
            hole: .6,
            type: 'pie'
        }];

        const layout = {
            title: "",
            annotations: [
                {
                    font: {
                        size: data.size || 20
                    },
                    showarrow: false,
                    text: data.central_title,
                },
            ],
            showlegend: false,
        };

        Plotly.newPlot(target, input, layout);
    },
    barAndLineChart(x, y, target) {
        const data = [
            {
                x: x,
                y: y,
                type: 'bar'
            },
            {
                x: x,
                y: y,
                type: "scatter"

            }
        ];
        Plotly.newPlot(target, data, {
            displayModeBar: false,
            showlegend: false,
        });
    },
    linechart(target, data) {
        const layout = {
            title: ''
        };
        //console.log("draw line chart:", data);
        Plotly.newPlot(target, data.series, layout);
    },
    linechartthreshold(target, data,) {
        const layout = {
            shapes: [
            {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: data.threshold,
                x1: 1,
                y1: data.threshold,
                line:{
                    color: 'rgb(255, 0, 0)',
                    width: 4,
                    dash:'dot'
                }
            }
            ]
        };
        //console.log("draw line chart:", data);
        Plotly.newPlot(target, data.series, layout);
    },
    carGaugeChart(target, data1) {
      /*const base_chart = {

              "values": [35, 10, 10, 10, 10, 10],
              "labels": ["-", "0", "0.25", "0.5", "0.75","1"],
              "domain": {"x": [0, .48]},
              "marker": {
                  "colors": [
                      'rgb(255, 255, 255)',
                      'rgb(255, 255, 255)',
                      'rgb(255, 255, 255)',
                      'rgb(255, 255, 255)',
                      'rgb(255, 255, 255)',
                      'rgb(255, 255, 255)'
                  ],
                  "line": {
                      "width": 1
                  }
              },
              "name": "Gauge",
              "hole": .4,
              "type": "pie",
              "direction": "clockwise",
              "rotation": 108,
              "showlegend": false,
              "hoverinfo": "none",
              "textinfo": "label",
              "textposition": "outside"
          };
        const meter_chart = {
            "values": [50, 25, 11, 14],
            "labels": ["Log Level", "", "", ""],
            "marker": {
                'colors': [
                    'rgb(255, 255, 255)',
                    'rgb(0,255,0)',
                    'rgb(0,0,255)',
                    'rgb(255,0,0)'
                ]
            },
            "domain": {"x": [0, 0.48]},
            "name": "Gauge",
            "hole": .3,
            "type": "pie",
            "direction": "clockwise",
            "rotation": 90,
            "showlegend": false,
            "textinfo": "label",
            "textposition": "inside",
            "hoverinfo": "none"
        };
        const layout = {
                  'xaxis': {
                      'showticklabels': false,
                      'autotick': false,
                      'showgrid': false,
                      'zeroline': false,
                  },
                  'yaxis': {
                      'showticklabels': false,
                      'autotick': false,
                      'showgrid': false,
                      'zeroline': false,
                  },
                  'shapes': [
                      {
                          'type': 'path',
                          'path': 'M 0.235 0.5 L 0.24 0.65 L 0.245 0.5 Z',
                          'fillcolor': 'rgba(44, 160, 101, 0.5)',
                          'line': {
                              'width': 0.5
                          },
                          'xref': 'paper',
                          'yref': 'paper'
                      }
                  ],
                  'annotations': [
                      {
                          'xref': 'paper',
                          'yref': 'paper',
                          'x': 0.23,
                          'y': 0.45,
                          'text': '50',
                          'showarrow': false
                      }
                  ]
              };


        base_chart.marker.line.width = 0;

        const fig = {"data": [base_chart, meter_chart],
                     "layout": layout};

        //console.log("draw car gauge :", data);
        Plotly.newPlot(target, fig.data, fig.layout);
        */
        // Enter a speed between 0 and 180
        let level = data1*18;

        // Trig to calc meter point
        let degrees = 180 - level,
             radius = .5;
        let radians = degrees * Math.PI / 180;
        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);
        let path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        let mainPath = path1,
             pathX = String(x),
             space = ' ',
             pathY = String(y),
             pathEnd = ' Z';
        let path = mainPath.concat(pathX,space,pathY,pathEnd);

        let data = [{ type: 'scatter',
           x: [0], y:[0],
            marker: {size: 14, color:'850000'},
            showlegend: false,
            name: 'Percentage of turns',
            text: level,
            hoverinfo: 'text+name'},
          { values: [1,1,1,1,4],
            labels: [  "0.75-1", "0.5-0.75", "0.25-0.5","0-0.25","-"],
          rotation: 90,
          text: ['', '', '', '', ''],
          textinfo: 'label',
          textposition:'outside',
          marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(249, 168, 37, .5)',
                                 'rgba(183,28,28, .5)', 'rgba(183,28,28, .5)',
                                 'rgba(0, 0, 0, 0.5)']},
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
        }];

        let layout = {
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: '850000',
              line: {
                color: '850000'
              }
            }],
          height: 400,
          width: 400,
          xaxis: {zeroline:false, showticklabels:false,
                     showgrid: false, range: [-1, 1]},
          yaxis: {zeroline:false, showticklabels:false,
                     showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot(target, data, layout);
    },
    boxChart(data ,target) {




        const layout = {
//            height: 400,
//            width: 500
            showlegend: false,

        };
        Plotly.newPlot(target, data, layout);
    },
    purge(target){
      Plotly.purge(target);
    },
    relayout(target,layout){
      Plotly.relayout(target, layout);
    }


}
