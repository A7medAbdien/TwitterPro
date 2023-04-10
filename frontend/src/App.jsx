import { useState, useEffect, useRef } from 'react'
import React from 'react';
import $ from 'jquery'
import BarChar from './components/charts/BarChar';
import { TFAllUni, TFTweetsUni } from './components/data/TermsFreqUni';
import { TFAllBi, TFTweetsBi } from './components/data/TermsFreqBi';
import { UFAll, UFReplies } from './components/data/UsersFreq';

const URL = "http://127.0.0.1:8000"

function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);
  const [usersFreq, setUsersFreq] = useState([]);

  const getTermFreqUni = () => {
    $.ajax({
      url: `${URL}/ch/tf/uni`,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        setTermFreqUni(res)
      }
    })
  }

  const getTermFreqBi = () => {
    $.ajax({
      url: `${URL}/ch/tf/bi`,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        setTermFreqBi(res)
      }
    })
  }

  const getUsersFreq = () => {
    $.ajax({
      url: `${URL}/ch/users`,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        setUsersFreq(res)
      }
    })
  }

  useEffect(() => {
    getTermFreqUni()
    getTermFreqBi()
    getUsersFreq()
  }, [])

  return <>
    <TFTweetsUni res={termFreqUni} />
    <TFTweetsBi res={termFreqBi} />
    <UFReplies res={usersFreq} />
  </>
}

export default App;

