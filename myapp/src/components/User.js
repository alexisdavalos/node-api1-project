import React from 'react'
import axios from 'axios'

const Users = (props) =>{

    const handleDelete = () =>{
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/users/${props.user.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = () =>{
        
    }

    return(
        <div className='user'>
            <h5>Name: {props.user.name}</h5>
            <p>Bio: {props.user.bio}</p>
            <p>Bio: {props.user.id}</p>
            <button onClick={() => handleDelete()}>Delete</button>
            <button>Update</button>
        </div>
    )
}

export default Users;