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

  const { position: posOuterDoor, r: rOuterDoor } = useControls('Outer Doors', {
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
  const { position: posInnerDoor, r: rInnerDoor } = useControls('Inner Doors', {
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
  const { position: posTF, positionA, rA, positionB, rB, positionC, rC, positionD, rD } = useControls('TFU', {
    position:
    {
      value: { x: 0, y: -6 },
      step: 0.01,
    },
    positionA:
    {
      value: { x: 1.2, y: 1 },
      step: 0.1,
    },
    rA:
    {
      min: 0,
      max: 2 * Math.PI,
      step: 0.05,
      value: 0,
    },
    positionB:
    {
      value: { x: 4, y: 1 },
      step: 0.1,
    },
    rB:
    {
      min: 0,
      max: 2 * Math.PI,
      step: 0.05,
      value: 0.15,
    },
    positionC:
    {
      value: { x: 2.5, y: 2.5 },
      step: 0.1,
    },
    rC:
    {
      min: 0,
      max: 2 * Math.PI,
      step: 0.05,
      value: Math.PI / 2.5,
    },
    positionD:
    {
      value: { x: 3, y: 5 },
      step: 0.1,
    },
    rD:
    {
      min: 0,
      max: 2 * Math.PI,
      step: 0.05,
      value: Math.PI / 2.5,
    },
  })

  const termFreqUni = [
    // Back
    { img: 0, meta: 'tweets', position: [-positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, rA, 0], url: 'TFUtweets' },
    { img: 0, meta: 'replies', position: [positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, -rA, 0], url: 'TFUreplies' },

    { img: 0, meta: 'tweets', position: [-positionB.x + posTF.x, 0, positionB.y + posTF.y], rotation: [0, rB, 0], url: 'TFUtweets' },
    { img: 0, meta: 'replies', position: [positionB.x + posTF.x, 0, positionB.y + posTF.y], rotation: [0, -rB, 0], url: 'TFUreplies' },
    // Left
    { img: 0, meta: 'likes', position: [-positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, rC, 0], url: 'TFUlikes' },
    { img: 0, meta: 'fLikes', position: [positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, -rC, 0], url: 'TFUfLikes' },
    // // Right
    { img: 0, meta: 'likes', position: [-positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, rD, 0], url: 'TFUlikes' },
    { img: 0, meta: 'fLikes', position: [positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, -rD, 0], url: 'TFUfLikes' },
  ]

  const images = [
    {
      position: [posOuterDoor.x, 0, posOuterDoor.y],
      rotation: [0, rOuterDoor, 0],
      image: [...termFreqUni,
      { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-termFreqUni' },
      { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
    {
      position: [-posOuterDoor.x, 0, posOuterDoor.y],
      rotation: [0, -rOuterDoor, 0],
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
      position: [posInnerDoor.x, 0, posInnerDoor.y],
      rotation: [0, rInnerDoor, 0],
      image: [
        { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-b' },
        { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
    {
      position: [-posInnerDoor.x, 0, posInnerDoor.y],
      rotation: [0, -rInnerDoor, 0],
      image: [
        { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-b' },
        { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
      ]
    },
  ]

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
      <OrbitControls makeDefault />
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
      {/* <Floor /> */}
      <mesh position={[0, -0.5, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />

      </mesh>


      <Environment preset="city" />
    </Canvas>
  </>
}


export default App

