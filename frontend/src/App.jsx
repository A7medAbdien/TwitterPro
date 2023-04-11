import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import VennDiagram from './components/charts/VennDiagram';
import BarChar from './components/charts/BarChar';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';


function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [userFreq, setUserFreq] = useState([]);
  const [topic, setTopic] = useState([]);
  const [timeFreq, setTimeFreq] = useState([]);
  const [Comm, setComm] = useState([]);


  useEffect(() => {
    getTermFreqUni(setTermFreqUni)
    // getTermFreqBi(setTermFreqBi)
    getTopicFreq(setTopic)
    // getUserFreq(setUserFreq)
    getTimeFreq(setTimeFreq)
    getComm(setComm)
    console.log(Comm);
  }, [])

  return <>
    {/* <FTweets res={termFreqUni} /> */}
    {/* <FTweets res={termFreqBi} /> */}
    {/* <FTweets res={topic} /> */}
    {/* <FReplies res={userFreq} /> */}
    {/* <TimeTweets res={timeFreq} /> */}

    <VennDiagram />
  </>
}

export default App;

