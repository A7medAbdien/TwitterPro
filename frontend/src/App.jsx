import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { FAll, FTweets, FReplies } from './components/Freq';
import { getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq } from './api';


function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [userFreq, setUserFreq] = useState([]);
  const [topic, setTopic] = useState([]);


  useEffect(() => {
    getTermFreqUni(setTermFreqUni)
    getTermFreqBi(setTermFreqBi)
    getTopicFreq(setTopic)
    getUserFreq(setUserFreq)
  }, [])

  return <>
    <FTweets res={termFreqUni} />
    <FTweets res={termFreqBi} />
    <FTweets res={topic} />
    {/* <FReplies res={userFreq} /> */}
  </>
}

export default App;

