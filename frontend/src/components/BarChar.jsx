import Plot from 'react-plotly.js';

const BarChar = ({ data, title, xLabel, yLabel }) => {

    let x, y
    if (data) [x, y] = data

    return (
        <Plot
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
                    yaxis: {
                        title: yLabel,
                        tickmode: 'linear',
                        dtick: 1,
                        tickformat: 'd'
                    },
                    bargap: 0.2
                }
            }
        />
    )
}

export default BarChar;

