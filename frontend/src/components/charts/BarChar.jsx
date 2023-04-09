import { forwardRef, useEffect, createRef } from "react";
import Plot from 'react-plotly.js';

const BarChar = forwardRef(({ data, title, xLabel, yLabel }, ref) => {

    let x, y, yaxis = { title: yLabel }

    if (data) {
        [x, y] = data
        if (y)
            Math.max(...y) < 10 ?
                yaxis = {
                    title: yLabel,
                    tickmode: 'linear',
                    dtick: 1,
                    tickformat: 'd'
                }
                : { title: yLabel }
    }


    return <>
        <Plot
            ref={ref}
            data={[
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
            ]}
            layout={
                {
                    title: title,
                    xaxis: {
                        title: xLabel,
                        tickvals: x,
                        ticktext: x
                    },
                    yaxis: yaxis,
                    bargap: 0.2
                }
            }
        />
    </>
})

export default BarChar;

