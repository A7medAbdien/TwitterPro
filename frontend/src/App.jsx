import Experience from './Experience';
import { Canvas, useThree } from '@react-three/fiber';
import { Gallery } from './components/Gallery';
import { Html, Environment, OrbitControls } from '@react-three/drei'
import { Leva } from 'leva'

import { useState, useEffect, useRef } from 'react'

import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';
import { TwoBar } from './components/charts/TwoBar';
import BarChar from './components/charts/Bar';


const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const pexel2 = (id) => `http://127.0.0.1:8000/ch/tf/uni/${id}`

const getChartUrl = async (data, layout) => {

  const chartDiv = document.createElement('div');
  chartDiv.setAttribute('id', 'chart');
  chartDiv.style.display = 'none';
  document.body.appendChild(chartDiv);

  // Create the chart in the 'chart' div
  Plotly.newPlot('chart', data, layout);

  // save the chart as a byte array
  return await Plotly.toImage('chart', { format: 'png', width: 500, height: 600 });
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
  },
};


function App() {

  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [user, setUser] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [u, setU] = useState();


  useEffect(() => {
    Promise.all([
      getTermFreqUni,
      // getTermFreqBi(setTermFreqBi),
      // getTopicFreq(setTopic),
      // getUserFreq(setUser),
      // getTimeFreq(setTimeFreq),
      // getComm(setComm),
    ]).then(([TFuni,]) => {
      const all = TFuni
      const tweets = TFuni.tweets
      console.log(tweets);
      const [trace, layout] = BarChar({ data: tweets.data, title: tweets.title, xLabel: tweets.xLabel, yLabel: tweets.yLabel, dimension: [500, 500] })
      layout['font'] = {
        family: 'Arial',
        size: 20,
        color: 'black',
      }
      getChartUrl(trace, layout).then((url) => {
        // console.log(url);
        setU(url)
      })
    })


    // BarChar()
    getChartUrl(data, layout).then((url) => {
      // console.log(url);
      setU(url)
    })
  }, [])

  const images = [
    // Front
    { img: u, position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel2(1) },
    // Back
    { img: u, position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
    { img: u, position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
    // Left
    { img: u, position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
    { img: u, position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
    { img: u, position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
    // Right
    { img: u, position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
    { img: u, position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
    { img: u, position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }


  ]

  const termFreqUniRoom = [
    // // Left
    // Back
    { position: [-3.7, 0, -3], rotation: [0, 0, 0], url: pexel(16207048), data: termFreqUni.tweets, type: "bar" },
    { position: [-4, 0, -1], rotation: [0, 0, 0], url: pexel(416430), data: termFreqUni.replies, type: "bar" },

    { position: [-4, 0, 1], rotation: [0, -0, 0], url: pexel(2603464), data: termFreqUni.likedTweets, type: "bar" },
    { position: [-4.3, 0, 3], rotation: [0, -0, 0], url: pexel(325185), data: termFreqUni.followingLiked, type: "bar" },

    // // Right
    // Back
    { position: [3.7, 0, -3], rotation: [0, 0, 0], url: pexel(227675), data: termFreqBi.tweets, type: "bar" },
    { position: [4, 0, -1], rotation: [0, 0, 0], url: pexel(16350045), data: termFreqBi.replies, type: "bar" },

    { position: [4, 0, 1], rotation: [0, -0, 0], url: pexel(1738986), data: termFreqBi.likedTweets, type: "bar" },
    { position: [4.3, 0, 3], rotation: [0, -0, 0], url: pexel(10401968), data: termFreqBi.followingLiked, type: "bar" },
  ]

  return <>

    {/* <VComm res={comm} /> */}
    {/* <Leva hidden /> */}
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      {/* <OrbitControls makeDefault /> */}
      <color attach="background" args={['#fff']} />
      <fog attach="fog" args={['#191920', 0, 15]} />

      <Experience />
      <Gallery images={images} />
      <Environment preset="city" />
    </Canvas>
  </>
}

export default App;

