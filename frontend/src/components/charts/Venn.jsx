import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import VennModule from "highcharts/modules/venn.js";
VennModule(Highcharts);
import HighchartsReact from 'highcharts-react-official'


export const Venn = ({ user, following, comm, title, a = 'USER', b = 'Following', height, width }) => {
    console.log(height, width);
    const [data, setData] = useState([]);

    const apiResponse = [{
        sets: [a],
        value: user
    }, {
        sets: [b],
        value: following
    }, {
        sets: [a, b],
        value: comm,
        name: 'Common'
    }]

    useEffect(() => {
        setData(apiResponse)
    }, [])

    let vennOptions = {
        title: {
            text: title
        },
        chart: {
            width: width,
            height: height
        },
        series: [{
            type: 'venn',
            name: title,
            data: data
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