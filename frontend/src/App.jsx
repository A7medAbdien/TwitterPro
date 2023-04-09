import { useState, useEffect } from 'react'
import React from 'react';
// import './App.css';
import $ from 'jquery'
import Plot from 'react-plotly.js';

function App() {
  const [random, setRandom] = useState([]);

  const getRandom = () => {
    $.ajax({
      url: "http://127.0.0.1:8000/tf",
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
          x: random[0],
          y: random[1],
          type: 'bar',
          text: random[1],
          textfont: {
            family: 'Arial',
            size: 16,
            color: '#fcfcfc'
          }
        }
      ]}
      layout={
        {
          title: 'Histogram API',
          xaxis: {
            title: 'Random Numbers',
            tickvals: random[0],
            ticktext: random[0]
          },
          yaxis: {
            title: 'Frequency',
            tickmode: 'linear',
            dtick: 1,
            tickformat: 'd'
          },
          bargap: 0.2
        }
      }
    />
  )
}

export default App;

