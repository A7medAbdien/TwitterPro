import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import VennModule from "highcharts/modules/venn.js";
VennModule(Highcharts);
import HighchartsReact from 'highcharts-react-official'


export const Venn = ({ user, following, comm, title = 'title' }) => {

    const [data, setData] = useState([]);

    const apiResponse = [{
        sets: ['USER'],
        value: user
    }, {
        sets: ['Followings'],
        value: following
    }, {
        sets: ['USER', 'Followings'],
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
            height: 300,
            width: 300
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