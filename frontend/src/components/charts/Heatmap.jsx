import Plot from 'react-plotly.js';

export const Heatmap = ({ data, title, xLabel, yLabel }) => {

    const xv = [...Array(7).keys()]
    const xt = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let z
    if (data)
        z = replaceZerosWithNaN(data);

    const trace = {
        z: z,
        // text: z,
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
            ticktext: xt
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