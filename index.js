// implement your API here
// import express from 'express'; //ES2015 Modules
const express = require('express'); //CommonJS Modules // npm i express

const Users = require('./data/db')
const server = express();

//teaches express how to read JSON from the body of request
server.use(express.json()); // needed for POST and PUT/PATCh

server.get('/', (req, res) => {
    res.json({ hello: 'Web26' })
})

//get users
server.get('/api/users', (req, res) => {
    Users.find().then(user => {
        console.log(user);
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
})

//get users by id
server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            console.log('User Id:,', String(user.id))
            console.log('Requested Id:', req.params.id)
            console.log((req.params.id === (user.id)) ? 'true' : 'false');

            (req.params.id === String(user.id)) ? res.status(200).json(user) : res.status(404).json({ message: "The user with the specified ID does not exist." })

        }).catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

// add new user
server.post('/api/users', (req, res) => {
    //axios.post.(url, data, options); the data will be in the body of the request
    const newUser = req.body;
    // validate the data, and if the data is valid save it
    console.log('body', req.body)
    Users.insert(newUser)
        .then(user => {
            (newUser.name === '' || newUser.bio === '') ? res.status(400).json({ errorMessage: "Please provide name and bio for the user." }) : res.status(201).json(user);
            // res.status(201).json(user);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
})

// update user
server.put('/api/users/:id',  (req, res) =>{
    console.log('fetching...')
    console.log('request body:', req.body)
    const updatedUser = req.body;
 
    (updatedUser.name === '' || updatedUser ==='') ? res.status(200).json({ errorMessage: "Please provide name and bio for the user." }) : Users.update(req.params.id, updatedUser).then(updateResponse =>{
        console.log('UpdateResponse',updateResponse)
        if(updateResponse === 1){
            res.status(200).json({...updatedUser, message: "successfully updated"})
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        // (updateResponse === 1) ? res.status(200).json({...updatedUser, message: "successfully updated"}) : console.log('err')
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    })
})
// server.put('/api/users/:id', (req, res) => {
//     res.json({ hello: 'Web26' })
//     // const updatedUser = req.body;
//     // Users.update(req.params.id, updatedUser).then(user => {
//     //     console.log(user);
//     // }).catch(err => {
//     //     console.log(err);
//     //     res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
//     // })
// })

//delete user

server.delete('/api/users/:id', (req, res) => {
    //remove function returns boolean 0 or 1 
    console.log(req.body);
    Users.remove(req.params.id).then(removedUser => {
        console.log('Deleting User......')
        console.log('removedUser (0 or 1):,', removedUser)
        console.log('Requested To Delete:', req.params.id)
        console.log((removedUser === 1) ? 'true' : 'false');
        (removedUser === 1) ? res.status(200).json(removedUser) : res.status(404).json({ errorMessage: 'The user with the specified ID does not exist' });

    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops' })
    })
})






const port = 5000;
server.listen(port, () => console.log(`\n** API Listening on port ${port} \n`));
