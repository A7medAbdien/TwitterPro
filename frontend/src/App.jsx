import Experience from './Experience'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Frames } from './components/rooms/Frames'
import { Environment, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { useState, useEffect } from 'react'



import { FAll, FTweets, FReplies } from './components/Freq'
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api'
import { TimeReplies, TimeTweets } from './components/TimeHeatmap'
import { VComm } from './components/VComm'
import { TwoBar } from './components/charts/TwoBar'
import BarChar from './components/charts/Bar'
import { assignUrlToImage, getBarUrl, getUrlFromData } from './components/Helpers/UrlChart'
import { Clump, Pointer, Plane } from './components/Clump'
import { Floor } from './components/rooms/Floor'
import { frames } from './components/rooms/tweaks'
import { Robot } from './components/Robot'
import { Door } from './components/Door'


function App() {

  const [isLoading, setIsLoading] = useState(false)
  const roomFrames = frames()


  useEffect(() => {
    const images = roomFrames.map(room => room.image)
    getUrlFromData(getTermFreqUni, getBarUrl)
      .then((res) => assignUrlToImage(res, images))
      .then(() => setIsLoading(false))
    roomFrames.map((room, i) => room.image = images[i])
    console.log("images", roomFrames);

  }, [roomFrames])

  return <>

    <Leva collapsed />
    <Canvas flat dpr={[1, 1.5]} camera={{ fov: 95, position: [0, 2, 8] }}>

      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />

      <Experience />
      {!isLoading && (
        <Frames images={roomFrames} />
      )}

      {/* <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
        <Plane />
      </Physics> */}
      {/* <Floor /> */}

      <Environment preset="city" />
    </Canvas>
  </>
}


export default App

