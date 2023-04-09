import { useState, useEffect } from 'react'
import React from 'react';
import $ from 'jquery'
import BarChar from './components/BarChar';

const URL = "http://127.0.0.1:8000"

function App() {
  const [random, setRandom] = useState([]);
  const [termFreqUni, setTermFreqUni] = useState([]);
  const [termFreqBi, setTermFreqBi] = useState([]);

  const getRandom = () => {
    $.ajax({
      url: `${URL}/tf`,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        setRandom(data)
      }
    })
  }

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

  useEffect(() => {
    getTermFreqUni()
    getRandom()
  }, [])

  return <>
    <BarChar
      data={random}
      title={"title"}
      xLabel={"xLabel"}
      yLabel={"yLabel"}
    />

    <BarChar
      {...termFreqUni.tweets}
    />

  </>
}

export default App;

