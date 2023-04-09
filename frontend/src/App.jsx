import { useState, useEffect, useRef } from 'react'
import React from 'react';
import $ from 'jquery'
import BarChar from './components/charts/BarChar';
import { TFAllUni, TFTweetsUni } from './components/data/TermsFreqUni';
import { TFAllBi, TFTweetsBi } from './components/data/TermsFreqBi';

const URL = "http://127.0.0.1:8000"

function App() {
  // const refs = useRef([])
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);

  const getTermFreqUni = () => {
    $.ajax({
      url: `${URL}/tf/uni`,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        setTermFreqUni(res)
      }
    })
  }

  const getTermFreqBi = () => {
    $.ajax({
      url: `${URL}/tf/bi`,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        setTermFreqBi(res)
      }
    })
  }

  useEffect(() => {
    getTermFreqUni()
    getTermFreqBi()
  }, [])

  return <>
    <TFTweetsUni res={termFreqUni} />
    <TFTweetsBi res={termFreqBi} />
  </>
}

export default App;

