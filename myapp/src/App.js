import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios'

//components
import UsersWrapper from './components/UsersWrapper'


function App() {
  const [users, setUsers] = useState([])
  const [fetch, setFetch]= useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    bio: ''
  })
  console.log(newUser);
  useEffect(() => {
    axios.get('http://localhost:5000/api/users/') //gets list of users
    .then(res => {
      console.log('response from localhost:5000:', res)
      console.log('setting data to users State...', res.data)
      setUsers(res.data)
      console.log(`success`)
    })
    .catch( err => console.log(err))
    setFetch(false)
  },[fetch])

  const handleChange = (e) =>{
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  };
  const handleSubmit = (e) =>{
    e.preventDefault()
    setFetch(true);
    axios
    .post('http://localhost:5000/api/users', newUser)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    setNewUser({name:'',bio:''})
  }
  console.log(`Users State:`, users)
  return (
    <div className="App">
      <header className="App-header">
 
          <h1>Node API I Project</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <label>Name</label>
            <input
              name='name'
              value={newUser.name}
              onChange={handleChange}
            />
            <label>Bio</label>
            <input
              name='bio'
              value={newUser.bio}
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
          <div>
            <UsersWrapper setFetch={setFetch} users={users}/>
          </div>
      </header>
    </div>
  );
}

export default App;
