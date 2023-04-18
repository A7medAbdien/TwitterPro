import Experience from './Experience';
import { Canvas, useThree } from '@react-three/fiber';
import { Gallery } from './components/Gallery';
import { Html, Environment, OrbitControls } from '@react-three/drei'
import { Leva } from 'leva'

import { useState, useEffect, useRef, useMemo } from 'react'

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

const getBarUrl = async (setter, res) => {
  const [trace, layout] = BarChar(
    {
      data: res.data,
      title: res.title,
      xLabel: res.xLabel,
      yLabel: res.yLabel,
      dimension: [500, 500]
    }
  )
  const url = await getChartUrl(trace, layout);
  setter(url);
}


function App() {

  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [user, setUser] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [tweetsTFU, setTweetsTFU] = useState();
  const [repliesTFU, setRepliesTFU] = useState();
  const [likesTFU, setLikesTFU] = useState();
  const [fLikesTFU, setFLikesTFU] = useState();


  const getTweets = async () => {
    const TFUni = await getTermFreqUni
    // console.log(TFUni);
    const tweets = TFUni.tweets
    const replies = TFUni.replies
    const likes = TFUni.likes
    const fLikes = TFUni.fLikes
    getBarUrl(setTweetsTFU, tweets)
    getBarUrl(setRepliesTFU, replies)
    getBarUrl(setLikesTFU, likes)
    getBarUrl(setFLikesTFU, fLikes)
  }

  useMemo(() => {

    getTweets()
  }, [])

  const images = [
    // Back
    { img: tweetsTFU, position: [-1.2, 0, 1], rotation: [0, 0, 0], url: pexel(416430) },
    { img: repliesTFU, position: [1.2, 0, 1], rotation: [0, 0, 0], url: pexel(310452) },
    // Left
    { img: likesTFU, position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
    // // Right
    { img: fLikesTFU, position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }
  ]

  const termFreqUniRoom = [
    // // Left
    // Back
    { position: [-3.7, 0, -3], rotation: [0, 0, 0], url: pexel(16207048) },
    { position: [-4, 0, -1], rotation: [0, 0, 0], url: pexel(416430) },

    { position: [-4, 0, 1], rotation: [0, -0, 0], url: pexel(2603464) },
    { position: [-4.3, 0, 3], rotation: [0, -0, 0], url: pexel(325185) },

    // // Right
    // Back
    { position: [3.7, 0, -3], rotation: [0, 0, 0], url: pexel(227675) },
    { position: [4, 0, -1], rotation: [0, 0, 0], url: pexel(16350045) },

    { position: [4, 0, 1], rotation: [0, -0, 0], url: pexel(1738986) },
    { position: [4.3, 0, 3], rotation: [0, -0, 0], url: pexel(10401968) },
  ]

  return <>

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

