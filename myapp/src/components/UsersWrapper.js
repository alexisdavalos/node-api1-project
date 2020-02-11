import React from 'react'
import User from './User'

const UsersWrapper = (props) =>{
    return(
        <div>
            <h3>Users In Database:</h3>
            {props.users.map(user=>(
                <User key={user.id} user={user} />
            ))}
        </div>
    )
}

export default UsersWrapper;