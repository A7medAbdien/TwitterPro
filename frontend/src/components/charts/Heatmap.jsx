import Plot from 'react-plotly.js';

export const Heatmap = () => {

    const z = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const trace = {
        z: z,
        // text: z,
        hovertemplate: '%{z:.0f}',
        type: 'heatmap'
    };

    const layout = {
        title: 'Heatmap Example',
        yaxis: {
            tickmode: 'linear',
            dtick: 1,
            tickformat: 'd'
        }
    };

    const data = [trace];

    return (
        <Plot
            data={data}
            layout={layout}
        />
    );
}