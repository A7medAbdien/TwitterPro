import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { Venn } from './components/charts/Venn';
import BarChar from './components/charts/BarChar';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';


function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [userFreq, setUserFreq] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [comm, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    Promise.all([
      getTermFreqUni(setTermFreqUni),
      getComm(setComm)
    ]).then(() => { setIsLoading(false) })
    getTopicFreq(setTopic)
    getTimeFreq(setTimeFreq)
  }, [])


  return <>
    {/* <FTweets res={termFreqUni} /> */}
    {/* <FTweets res={termFreqBi} /> */}
    {/* <FTweets res={topic} /> */}
    {/* <FReplies res={userFreq} /> */}
    {/* <TimeTweets res={timeFreq} /> */}

    <VComm res={comm} />
  </>
}

export default App;

