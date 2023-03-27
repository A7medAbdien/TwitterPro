import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    axios.get('/api').then(res => setPeople(res.data))
    // axios.get('/api')
  }, [])

  return people.map((p, i) => {
    return <p key={i}> {p.id} {p.name} {p.age}</p>
  });
}

export default App;
