const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

let users = [
    {id: 1, name: 'Surendran'},
    {id: 2, name: 'Ashok'}
];

// Routes
app.get('/users', (req,res) => {
    res.json(users);
});

app.get('/users/:id',(req,res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if(!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }
});

app.post('/users',(req,res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req,res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    let findIndex = -1;
    const user = users.find((user, index) => {
        if (user.id === userId) {
            findIndex = index;
            return true;
        }
        return false;
    });

    if (!user) {
        res.status(404).json({ error:'User not found'});
    } else {
        users[findIndex] = { ...user, ...updatedUser };
        res.json(users[findIndex]);
    }
});

app.delete('/users/:id', (req,res) => {
    const userId = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).json({ error: 'User not found' });
    } else {
        const deletedUser = users.splice(index,1);
        res.json(deletedUser[0]);
    }
});

app.listen(2000,() => {console.log('Listening on port 2000');})