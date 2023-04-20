import Experience from './Experience'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Debug, Physics, useSphere, usePlane } from "@react-three/cannon"
import * as THREE from "three"
import { Perf } from 'r3f-perf'
import { Gallery } from './components/Gallery'
import { Html, Environment, OrbitControls, MeshReflectorMaterial } from '@react-three/drei'
import { Leva, useControls } from 'leva'
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


const termFreqUni = [
  // Back
  { img: 0, meta: 'tweets', position: [-1.2, 0, 1], rotation: [0, 0, 0], url: 'TFUtweets' },
  { img: 0, meta: 'replies', position: [1.2, 0, 1], rotation: [0, 0, 0], url: 'TFUreplies' },
  // Left
  { img: 0, meta: 'likes', position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: 'TFUlikes' },
  // // Right
  { img: 0, meta: 'fLikes', position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: 'TFUfLikes' },
]

const termFreqBi = [
  // Back
  { img: 0, meta: 'tweets', position: [-1.2, 0, 1], rotation: [0, 0, 0], url: 'BItweets' },
  { img: 0, meta: 'replies', position: [1.2, 0, 1], rotation: [0, 0, 0], url: 'BIreplies' },
  // Left
  { img: 0, meta: 'likes', position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: 'BIlikes' },
  // // Right
  { img: 0, meta: 'fLikes', position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: 'BIfLikes' },
]
const a = [
  // Back
  { img: 0, meta: 'tweets', position: [-1.2, 0, 1], rotation: [0, 0, 0], url: 'BItweets' },
]
const b = [
  // Back
  { img: 0, meta: 'tweets', position: [-1.2, 0, 1], rotation: [0, 0, 0], url: 'BItweets' },
  { img: 0, meta: 'replies', position: [1.2, 0, 1], rotation: [0, 0, 0], url: 'BIreplies' },
  // Left
  { img: 0, meta: 'likes', position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: 'BIlikes' },
  // // Right
  { img: 0, meta: 'fLikes', position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: 'BIfLikes' },
]



function App() {

  const { position: posA, r: rA } = useControls('Outer Doors', {
    position:
    {
      value: { x: -8, y: 1.25 },
      step: 0.01,
    },
    r:
    {
      min: 0,
      max: 2 * Math.PI,
      step: 0.05,
      value: 0.95,
    },
  })
  const { position: posB, r: rB } = useControls('Inner Doors', {
    position:
    {
      value: { x: -2.5, y: -2 },
      step: 0.01,
    },
    r:
    {
      min: 0,
      max: 2 * Math.PI,
      step: 0.05,
      value: 0.15,
    },
  })

  const images = [
    {
      position: [posA.x, 0, posA.y],
      rotation: [0, rA, 0],
      image: [
        { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-termFreqUni' },
        { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
    {
      position: [-posA.x, 0, posA.y],
      rotation: [0, -rA, 0],
      image: [
        { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-termFreqBi' },
        { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
    // {
    //   position: [position.x, 0, position.y],
    //   rotation: [0, r, 0],
    //   image: [
    //     { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-a' },
    //     { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
    //   ]
    // },
    {
      position: [posB.x, 0, posB.y],
      rotation: [0, rB, 0],
      image: [
        { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-b' },
        { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
    {
      position: [-posB.x, 0, posB.y],
      rotation: [0, -rB, 0],
      image: [
        { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-b' },
        { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
  ]

  // const [termFreqUni, setTermFreqUni] = useState([])
  // const [termFreqBi, setTermFreqBi] = useState([])
  // const [user, setUser] = useState([])
  // const [topic, setTopic] = useState([])
  // const [timeFreq, setTimeFreq] = useState([])
  // const [comm, setComm] = useState([])
  const [isLoading, setIsLoading] = useState(false)




  useEffect(() => {

    // getUrlFromData(getTermFreqUni, getBarUrl)
    //   .then((res) => assignUrlToImage(res, images))
    //   .then(() => setIsLoading(false))

  }, [images])



  return <>

    {/* <Leva hidden /> */}
    <Canvas dpr={[1, 1.5]} camera={{ fov: 90, position: [0, 2, 8] }}>

      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <color attach="background" args={['#fff']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Experience />
      {!isLoading && (
        <Gallery images={images} />
      )}

      {/* <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
        <Plane />
      </Physics> */}
      <Floor />


      <Environment preset="city" />
    </Canvas>
  </>
}


export default App

