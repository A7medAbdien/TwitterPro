import Experience from './Experience'
import { Canvas, useThree } from '@react-three/fiber'
import { Gallery } from './components/Gallery'
import { Html, Environment, OrbitControls } from '@react-three/drei'
import { Leva } from 'leva'

import { useState, useEffect, useRef, useMemo } from 'react'

import { FAll, FTweets, FReplies } from './components/Freq'
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api'
import { TimeReplies, TimeTweets } from './components/TimeHeatmap'
import { VComm } from './components/VComm'
import { TwoBar } from './components/charts/TwoBar'
import BarChar from './components/charts/Bar'
import { assignUrlToImage, getBarUrl, getUrlFromData } from './components/Helpers/UrlChart'


const images = [
  // Back
  { img: 0, no: 'tweets', position: [-1.2, 0, 1], rotation: [0, 0, 0], url: 'tweets' },
  { img: 0, no: 'replies', position: [1.2, 0, 1], rotation: [0, 0, 0], url: 'replies' },
  // Left
  { img: 0, no: 'likes', position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: 'likes' },
  // // Right
  { img: 0, no: 'fLikes', position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: 'fLikes' }
]

function App() {

  const [termFreqUni, setTermFreqUni] = useState([])
  const [termFreqBi, setTermFreqBi] = useState([])
  const [user, setUser] = useState([])
  const [topic, setTopic] = useState([])
  const [timeFreq, setTimeFreq] = useState([])
  const [comm, setComm] = useState([])
  const [isLoading, setIsLoading] = useState(true)




  useEffect(() => {

    getUrlFromData(getTermFreqUni, getBarUrl)
      .then((res) => assignUrlToImage(res, images))
      .then(() => setIsLoading(false))

  }, [images])


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

export default App

