const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signing');
const register = require('./controllers/register');

const db = knex({
        client: 'pg',
        connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'your_database_password',
        database : 'face-recognition'
        }
});

const saltRounds = 10;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entrie', 1)
    .returning('entrie')
    .then( entrie => {
        res.json(entrie[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

/*

/ --> res = this is working
/signin --> POST - success/fail
/register --> POST = user
/profile/:uderId --> GET = user
/image --> PUT = user updated

*/