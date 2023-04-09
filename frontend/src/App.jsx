import { useState, useEffect } from 'react'
import React from 'react';
import $ from 'jquery'
import BarChar from './components/BarChar';

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

  return <>
    <BarChar
      data={random}
      title={"title"}
      xLabel={"xLabel"}
      yLabel={"yLabel"}
    />
  </>
}

export default App;

