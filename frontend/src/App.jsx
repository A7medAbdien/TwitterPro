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

const getBarUrl = async (res) => {
  const [trace, layout] = BarChar(
    {
      data: res.data,
      title: res.title,
      xLabel: res.xLabel,
      yLabel: res.yLabel,
      dimension: [500, 500]
    }
  )
  return await getChartUrl(trace, layout);

}

function App() {

  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [user, setUser] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getTweets = async () => {

    const res = await getTermFreqUni

    const TFUni = {}

    for (const key of Object.keys(res)) {
      TFUni[key] = getBarUrl(res[key])
    }
    return TFUni

  }
  const images = [
    // Back
    { img: 0, no: 'tweets', position: [-1.2, 0, 1], rotation: [0, 0, 0], url: pexel(416430) },
    { img: 0, no: 'replies', position: [1.2, 0, 1], rotation: [0, 0, 0], url: pexel(310452) },
    // Left
    { img: 0, no: 'likes', position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
    // // Right
    { img: 0, no: 'fLikes', position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }
  ]

  useEffect(() => {

    getTweets().then((res) => {
      const promises = Object.values(res);

      Promise.all(promises)
        .then(responses => {
          const resolvedData = {};
          Object.keys(res).forEach((key, index) => {
            resolvedData[key] = responses[index]
          })
          images.map((image) => image.img = resolvedData[image.no])
        })
        .catch(error => {
          console.error(error);
        }).then(() => setIsLoading(false))
    }
    )
  }, [images])


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
      {!isLoading && (
        <Gallery images={images} />
      )}
      <Environment preset="city" />
    </Canvas>
  </>
}

export default App;

