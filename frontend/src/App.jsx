import Experience from './Experience';
import { Canvas, useThree } from '@react-three/fiber';
import { Gallery } from './components/Gallery';
import { Html, Environment, } from '@react-three/drei'
import { Leva } from 'leva'

import { useState, useEffect, useRef } from 'react'

import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';
import { TwoBar } from './components/charts/TwoBar';

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`


function App() {

  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [user, setUser] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    Promise.all([
      getTermFreqUni(setTermFreqUni),
      getTermFreqBi(setTermFreqBi),
      getTopicFreq(setTopic),
      getUserFreq(setUser),
      getTimeFreq(setTimeFreq),
      getComm(setComm),
    ]).then(() => {
      // console.log(termFreqUni);
      // console.log(termFreqBi);
      setIsLoading(false)
    })
  }, [])

  const images = [
    // Front
    { position: [-1.5, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970), data: comm.user_rl, type: "venn" },
    // Back
    { position: [1.5, 0, 1.5], rotation: [0, 0, 0], url: pexel(416430), data: termFreqUni.tweets, type: "bar" },
    // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },

    // // Left
    // { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
    // { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
    // { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
    // // Right
    // { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
    // { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
    // { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }

  ]

  const termFreqUniRoom = [
    // Front
    // { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970), data: comm.user_rl, type: "venn" },



    // // Left
    // Back
    { position: [-5, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430), data: termFreqUni.tweets, type: "bar" },
    { position: [-2, 0, -0.6], rotation: [0, 0, 0], url: pexel(16207048), data: termFreqUni.replies, type: "bar" },

    { position: [-6.5, 0, 1], rotation: [0, Math.PI / 2, 0], url: pexel(2603464), data: termFreqUni.likedTweets, type: "bar" },
    { position: [-6.5, 0, 4], rotation: [0, Math.PI / 2, 0], url: pexel(325185), data: termFreqUni.followingLiked, type: "bar" },

    // // Right
    // Back
    { position: [2, 0, -0.6], rotation: [0, 0, 0], url: pexel(227675), data: termFreqBi.tweets, type: "bar" },
    { position: [5, 0, -0.6], rotation: [0, 0, 0], url: pexel(16350045), data: termFreqBi.replies, type: "bar" },

    { position: [6.5, 0, 1], rotation: [0, -Math.PI / 2, 0], url: pexel(1738986), data: termFreqBi.likedTweets, type: "bar" },
    { position: [6.5, 0, 4], rotation: [0, -Math.PI / 2, 0], url: pexel(10401968), data: termFreqBi.followingLiked, type: "bar" },
  ]

  return <>
    <Leva hidden />
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['#fff']} />
      <fog attach="fog" args={['#191920', 0, 15]} />

      <Experience />
      <Gallery images={termFreqUniRoom} />
      <Environment preset="city" />
    </Canvas>
  </>
}

export default App;

