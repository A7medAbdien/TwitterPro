import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { FAll, FTweets, FReplies } from './components/Freq';
import { getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { Heatmap } from './components/charts/Heatmap';
import BarChar from './components/charts/BarChar';


function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [userFreq, setUserFreq] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);


  useEffect(() => {
    getTermFreqUni(setTermFreqUni)
    // getTermFreqBi(setTermFreqBi)
    getTopicFreq(setTopic)
    // getUserFreq(setUserFreq)
    getTimeFreq(setTimeFreq)
  }, [])

  return <>
    <FTweets res={termFreqUni} />
    {/* <FTweets res={termFreqBi} /> */}
    <FTweets res={topic} />
    {/* <FReplies res={userFreq} /> */}

    <Heatmap {...timeFreq.tweets} />
  </>
}

export default App;

