import axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react';
import InnerHTML from 'dangerously-set-html-content'
import './App.css';

function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    axios.get('/api').then(res => setPeople(res.data))
    // axios.get('/api')

  }, [])

  const html = ``
  console.log(people);
  return (
    <div>
      hi
      <InnerHTML html={html} />
    </div>
  )
}

export default App;

