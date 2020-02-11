import React from 'react'

const Users = (props) =>{
    return(
        <div>
            <h5>Name: {props.user.name}</h5>
            <p>Bio: {props.user.bio}</p>
            <p>Bio: {props.user.id}</p>
        </div>
    )
}

export default Users;