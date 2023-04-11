import React from 'react';
import Plot from 'react-plotly.js';

export const TwoBar = ({ data, title, xLabel, yLabel }) => {


    if (data.length < 1) return

    const [x, user, following] = data[0]

    const userTrace =
    {
        name: "USER",
        x: x,
        y: user,
        type: 'bar',
        text: user,
        textfont: {
            family: 'Arial',
            size: 16,
            color: '#000'
        }
    }

    const followingTrace =
    {
        name: "Followings",
        x: x,
        y: following,
        type: 'bar',
        text: following,
        textfont: {
            family: 'Arial',
            size: 16,
            color: '#000'
        }
    }

    const trace = [userTrace, followingTrace];

    const layout = {
        title: title,
        width: 1000,
        height: 500,
        margin: {
            b: 100
        },
        xaxis: {
            title: xLabel,
            tickvals: x,
            ticktext: x
        },
        yaxis: { title: yLabel },
        bargap: 0.2
    }



    return <Plot data={trace} layout={layout} />;
}