import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { Gallery } from './components/Gallery';
import { Html, Environment } from '@react-three/drei'

import { useState, useEffect, useRef } from 'react'

import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';
import { TwoBar } from './components/charts/TwoBar';

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`


function App() {

  const [termFreqUni, setTermFreqUni] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    Promise.all([
      getTermFreqUni(setTermFreqUni),
      getTopicFreq(setTopic),
      getTimeFreq(setTimeFreq),
      getComm(setComm),
    ]).then(() => {
      setIsLoading(false)
    })
  }, [])

  const images = [
    // Front
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970), d: comm.user_rl },

  ]


  return <>
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />

      <Gallery images={images} />
      {/* <Html>
        <VComm {...comm.user_rl} />
      </Html> */}
      <Environment preset="city" />
    </Canvas>
  </>
}

export default App;

