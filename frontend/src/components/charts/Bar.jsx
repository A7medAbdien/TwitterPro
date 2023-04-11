import { forwardRef, useEffect, createRef } from "react";
import Plot from 'react-plotly.js';

const BarChar = forwardRef(({ data, title, xLabel, yLabel }, ref) => {

    let x, y, yaxis = { title: yLabel }, allContainColon = true

    if (data) {
        [x, y] = data

        Math.max(...y) < 10 ?
            yaxis = {
                title: yLabel,
                tickmode: 'linear',
                dtick: 1,
                tickformat: 'd'
            }
            : { title: yLabel }

        for (const i of x)
            if (!i.includes(':')) {
                allContainColon = false
                break
            }

        x = x.map((label) => {
            if (label.split(':').length > 1) {
                return label.replace(':', ':<br>');
            } else {
                return label;
            }
        })

    }

    const trace = [
        {
            x: x,
            y: y,
            type: 'bar',
            text: y,
            textfont: {
                family: 'Arial',
                size: 16,
                color: '#fcfcfc'
            }
        }
    ]

    const layout = !allContainColon ?
        {
            title: title,
            width: 700,
            height: 450,
            margin: {
                b: 100
            },
            xaxis: {
                title: xLabel,
                tickvals: x,
                ticktext: x
            },
            yaxis: yaxis,
            bargap: 0.2
        } :
        {
            title: title,
            width: 800,
            height: 600,
            margin: {
                b: 200
            },
            xaxis: {
                title: xLabel,
                tickvals: x,
                ticktext: x,
                tickangle: -60
            },
            yaxis: yaxis,
            bargap: 0.2
        }

    return <>
        <Plot
            ref={ref}
            data={trace}
            layout={layout}
        />
    </>
})

export default BarChar;

