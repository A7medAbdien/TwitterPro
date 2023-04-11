import React, { Component } from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts'
import VennModule from "highcharts/modules/venn.js";
// Initialize the VennModule https://github.com/highcharts/highcharts-react#how-to-add-a-module
VennModule(Highcharts);
import HighchartsReact from 'highcharts-react-official'

const apiResponse = [{
    sets: ['Hi'],
    value: 500
}, {
    sets: ['Hello'],
    value: 94
}, {
    sets: ['How are you'],
    value: 90
}, {
    sets: ['Hi', 'Hello'],
    value: 12,
    name: 'Slow Hi'
}, {
    sets: ['Hi', 'How are you'],
    value: 13,
    name: 'Slow'
}, {
    sets: ['Hello', 'How are you'],
    value: 10,
    name: 'Not the best'
}, {
    sets: ['Hello', 'How are you', 'Hi'],
    value: 15,
    name: 'She is daydreaming'
}]

export default class VennDiagram extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.setState({ data: apiResponse })
    }

    render() {
        let vennOptions = {
            title: {
                text: 'Sahil\'s Abilities  😋'
            },
            chart: {
                backgroundColor: "#5a1541CC",
                borderWidth: 2,
                borderColor: "#fff",
                borderRadius: 20,
                className: "",
                animation: false,
                height: 300,
                width: 300
            },
            series: [{
                type: 'venn',
                name: 'Decline Reasons',
                data: this.state.data
            }]
        }

        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={vennOptions}
                />
            </div>
        );
    }
}