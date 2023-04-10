import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { TFAllUni, TFTweetsUni } from './components/data/TermsFreqUni';
import { TFAllBi, TFTweetsBi } from './components/data/TermsFreqBi';
import { UFAll, UFReplies } from './components/data/UsersFreq';
import { getTermFreqUni, getTermFreqBi, getUserFreq } from './api';


function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [userFreq, setUserFreq] = useState([]);


  useEffect(() => {
    getTermFreqUni(setTermFreqUni)
    getTermFreqBi(setTermFreqBi)
    // getUsersFreq(setUserFreq)
  }, [])

  return <>
    <TFTweetsUni res={termFreqUni} />
    <TFTweetsBi res={termFreqBi} />
    {/* <UFReplies res={userFreq} /> */}
  </>
}

export default App;

