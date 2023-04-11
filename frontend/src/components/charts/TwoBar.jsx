import React from 'react';
import Plot from 'react-plotly.js';

export const TwoBar = ({ bar, title, xLabel, yLabel }) => {


    if (!bar || bar.length < 1) return

    const [x, user, following] = bar

    const textFont = {
        family: 'Arial',
        size: 16,
        color: '#000'
    }

    const userTrace =
    {
        name: "USER",
        x: x,
        y: user,
        type: 'bar',
        text: user,
        textfont: textFont
    }

    const followingTrace =
    {
        name: "Followings",
        x: x,
        y: following,
        type: 'bar',
        text: following,
        textfont: textFont
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