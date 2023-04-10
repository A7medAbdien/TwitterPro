import Plot from 'react-plotly.js';

export const Heatmap = ({ x, data, title, xLabel, yLabel }) => {

    let y, xv

    if (data)
        y = replaceZerosWithNaN(data)

    if (x)
        xv = [...Array(x.length).keys()]

    const trace = {
        name: '',
        z: y,
        hovertemplate: '%{z:.0f}',
        type: 'heatmap'
    };

    const layout = {
        title: title,
        width: 700,
        height: 700,
        margin: {
            b: 100
        },
        xaxis: {
            title: xLabel,
            showgrid: false,
            zeroline: false,
            tickvals: xv,
            ticktext: x
        },
        yaxis: {
            title: yLabel,
            showgrid: false,
            zeroline: false,
            tickmode: 'linear',
            dtick: 1,
            tickformat: 'd'
        },
        bargap: 0.2,

        plot_bgcolor: 'white'
    }



    const dataa = [trace];

    return (
        <Plot
            data={dataa}
            layout={layout}
        />
    );
}

const replaceZerosWithNaN = (arr) => {
    return arr.map((val) => {
        if (Array.isArray(val)) {
            return replaceZerosWithNaN(val)
        } else {
            return val === 0 ? NaN : val
        }
    })
}


export default Heatmap;