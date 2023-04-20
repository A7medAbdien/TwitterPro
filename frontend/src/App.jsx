import Experience from './Experience'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Debug, Physics, useSphere, usePlane } from "@react-three/cannon"
import * as THREE from "three"

import { Gallery } from './components/Gallery'
import { Html, Environment, OrbitControls, MeshReflectorMaterial } from '@react-three/drei'
import { Leva } from 'leva'

import { useState, useEffect, useRef, useMemo } from 'react'

import { FAll, FTweets, FReplies } from './components/Freq'
// import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api'
import { TimeReplies, TimeTweets } from './components/TimeHeatmap'
import { VComm } from './components/VComm'
import { TwoBar } from './components/charts/TwoBar'
import BarChar from './components/charts/Bar'
import { assignUrlToImage, getBarUrl, getUrlFromData } from './components/Helpers/UrlChart'
import { Clump, Pointer, Plane } from './components/Clump'
import { Floor } from './components/Floor'

const x = 0
const z = -4
const images = [
  // Back
  { img: 0, meta: 'tweets', position: [x + -1.2, 0, 1 + z], rotation: [0, 0, 0], url: 'tweets' },
  { img: 0, meta: 'replies', position: [x + 1.2, 0, 1 + z], rotation: [0, 0, 0], url: 'replies' },
  // Left
  { img: 0, meta: 'likes', position: [x + -2, 0, 2.75 + z], rotation: [0, Math.PI / 2.5, 0], url: 'likes' },
  // // Right
  { img: 0, meta: 'fLikes', position: [x + 2, 0, 2.75 + z], rotation: [0, -Math.PI / 2.5, 0], url: 'fLikes' },
  { img: 0, meta: 'fLikes', position: [x + 2 + 4, 0, 2.75 + z], rotation: [0, -Math.PI / 2.5, 0], url: 'ffLikes' },
  { img: 0, meta: 'door', position: [0, 0, 1], rotation: [0, 0, 0], url: 'door-sam' },
  // { img: 0, meta: 'home', position: [0, 0, -1], rotation: [-Math.PI / 2, 0, 0], url: 'homey' },


  { img: 0, meta: 'door', position: [4, 0, 1], rotation: [0, 0, 0], url: 'door-chan' },
  { img: 0, meta: 'home', position: [4, 0, -1], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
]

function App() {

  const [termFreqUni, setTermFreqUni] = useState([])
  const [termFreqBi, setTermFreqBi] = useState([])
  const [user, setUser] = useState([])
  const [topic, setTopic] = useState([])
  const [timeFreq, setTimeFreq] = useState([])
  const [comm, setComm] = useState([])
  const [isLoading, setIsLoading] = useState(false)




  useEffect(() => {

    // getUrlFromData(getTermFreqUni, getBarUrl)
    //   .then((res) => assignUrlToImage(res, images))
    //   .then(() => setIsLoading(false))

  }, [images])



  return <>

    {/* <Leva hidden /> */}
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 10] }}>
      {/* <OrbitControls makeDefault /> */}
      <color attach="background" args={['#fff']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Experience />
      {!isLoading && (
        <Gallery images={images} />
      )}

      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
        <Plane />
      </Physics>

      <Floor />

      <Environment preset="city" />
    </Canvas>
  </>
}


export default App

