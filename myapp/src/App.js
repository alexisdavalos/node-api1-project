import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

//components
import UsersWrapper from './components/UsersWrapper'


function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/') //gets list of users
    .then(res => {
      console.log('response from localhost:5000:', res)
      console.log('setting data to users State...', res.data)
      setUsers(res.data)
      console.log(`success`)
    })
    .catch( err => console.log(err))
  },[])

  console.log(`Users State:`, users)
  return (
    <div className="App">
      <header className="App-header">
      <h1>Node API I Project</h1>
      <div>
        <UsersWrapper users={users}/>
      </div>
      </header>
    </div>
  );
}

export default App;
