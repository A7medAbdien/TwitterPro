// import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react';
// import InnerHTML from 'dangerously-set-html-content'
import './App.css';
import $ from 'jquery'
import Plot from 'react-plotly.js';

function App() {
  const [random, setRandom] = useState();

  const getRandom = () => {
    $.ajax({
      url: "http://127.0.0.1:8000/random/10",
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        setRandom(data)
      }
    })
  }

  useEffect(() => {
    getRandom();
  }, [])

  return (
    <Plot
      data={[
        {
          x: random,
          type: 'histogram',
          xbins: {
            start: 0,
            end: 100,
            size: 10
          }
        }
      ]}
      layout={
        {
          title: 'Histogram API',
          xaxis: {
            title: 'Random Numbers'
          },
          yaxis: {
            title: 'Frequency'
          },
          bargap: 0.2
        }
      }
    />
  )
}

export default App;

