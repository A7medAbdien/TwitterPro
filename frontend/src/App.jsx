import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { TFAllUni, TFTweetsUni } from './components/data/TermsFreqUni';
import { TFAllBi, TFTweetsBi } from './components/data/TermsFreqBi';
import { UFAll, UFReplies } from './components/data/UsersFreq';
import { getTermFreqUni, getTermFreqBi, getUsersFreq } from './api';


function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [usersFreq, setUsersFreq] = useState([]);


  useEffect(() => {
    getTermFreqUni(setTermFreqUni)
    getTermFreqBi(setTermFreqBi)
    // getUsersFreq(setUsersFreq)
  }, [])

  return <>
    <TFTweetsUni res={termFreqUni} />
    <TFTweetsBi res={termFreqBi} />
    {/* <UFReplies res={usersFreq} /> */}
  </>
}

export default App;

