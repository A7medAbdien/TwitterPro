// Define the data for the chart
var data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 4, 9, 16, 25],
    type: 'scatter'
}];

// Define the layout for the chart
var layout = {
    title: 'My First Plotly Chart',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' }
};

// Create the chart in the 'chart' div
Plotly.newPlot('chart', data, layout);

// save the chart as a byte array
Plotly.toImage('chart', { format: 'png', width: 800, height: 600 })
    .then(function (url) {
        console.log(url);
    })