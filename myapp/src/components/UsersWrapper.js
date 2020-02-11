import React from 'react'
import User from './User'

const UsersWrapper = (props) =>{
    return(
        <>
         <h3>Users In Database:</h3>
            <div className='usersWrapper'>
                {props.users.map(user=>(
                    <User setFetch={props.setFetch} key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}

export default UsersWrapper;