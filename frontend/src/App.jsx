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
import { imagess } from './components/tweaks'


function App() {


  const [isLoading, setIsLoading] = useState(false)
  const images = imagess()


  useEffect(() => {

    // getUrlFromData(getTermFreqUni, getBarUrl)
    //   .then((res) => assignUrlToImage(res, images))
    //   .then(() => setIsLoading(false))

  }, [images])



  return <>

    {/* <Leva hidden /> */}
    <Canvas dpr={[1, 1.5]} camera={{ fov: 95, position: [0, 2, 8] }}>

      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}
      {/* <color attach="background" args={['#191920']} /> */}
      {/* <fog attach="fog" args={['#191920', 0, 15]} /> */}
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

