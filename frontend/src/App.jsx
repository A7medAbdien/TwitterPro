import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';
import { TwoBar } from './components/charts/TwoBar';


function App() {
  // const refs = useRef([])
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
    ]).then(() => { setIsLoading(false) })
  }, [])


  return <>
    <TwoBar data={comm} />
    <FTweets res={termFreqUni} />
    <FTweets res={topic} />
    <TimeTweets res={timeFreq} />
    <VComm res={comm} title={"Common Terms"} />
  </>
}

export default App;

