// import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react';
// import InnerHTML from 'dangerously-set-html-content'
import './App.css';
import $ from 'jquery'

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
    <div>
      hi
      {random}
    </div>
  )
}

export default App;

