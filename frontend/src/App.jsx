import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { Venn } from './components/charts/Venn';
import BarChar from './components/charts/BarChar';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';

const getChartUrl = (data, layout) => {

  const chartDiv = document.createElement('div');
  chartDiv.setAttribute('id', 'chart');
  // chartDiv.style.display = 'none';
  document.body.appendChild(chartDiv);

  // Create the chart in the 'chart' div
  Plotly.newPlot('chart', data, layout);

  // save the chart as a byte array
  return Plotly.toImage('chart', { format: 'png', width: 500, height: 600 })
    .then(function (url) {
      return url
    })
}
// Define the data for the chart
var data = [{
  x: [1, 2, 3, 4, 5],
  y: [1, 4, 9, 16, 25],
  type: 'scatter',
  marker: {
    color: 'blue',
    size: 8
  },
  line: {
    color: 'blue',
    width: 2,
  },

}];

// Define the layout for the chart
var layout = {
  title: 'My First Plotly Chart',
  xaxis: { title: 'X Axis' },
  yaxis: { title: 'Y Axis' },
  font: {
    family: 'Arial',
    size: 20,
    color: 'black',
    // fontWeight: 'bold',
  },
};

// const url = ;

function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [userFreq, setUserFreq] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [u, setU] = useState();

  // console.log(url);

  useEffect(() => {
    Promise.all([
      getTermFreqUni(setTermFreqUni),
      getComm(setComm),
    ]).then(() => { setIsLoading(false) })
    getTopicFreq(setTopic)
    getTimeFreq(setTimeFreq)
    getChartUrl(data, layout).then((url) => {
      console.log(url);
      setU(url)
    })
  }, [])


  return <>
    <FTweets res={termFreqUni} />
    {/* <FTweets res={termFreqBi} /> */}
    {/* <FTweets res={topic} /> */}
    {/* <FReplies res={userFreq} /> */}
    {/* <TimeTweets res={timeFreq} /> */}

    {/* <VComm res={comm} /> */}
  </>
}

export default App;

