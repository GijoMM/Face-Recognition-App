const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image =  require('./controllers/image');

const db = knex({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        }
});

const app = express();

app.use(bodyParser.json());
// Allow CORS
const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,");

    res.header(
        "Access-Control-Allow-Credentials",
        "true"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );

      res.setHeader(
          "Access-Control-Allow-Headers",
          // You must include "authorization" and allow access on Header if you use CORS and credentials like Cookie
          "Access-Control-Allow-Headers, Origin,Accept,authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

      // res.options('*', (req, res) => {
      //   res.sendStatus(200);
      // });

  // Don't delete this "next()" otherwise server will not return any response.. somehow:(
  next();
}
app.use(allowCrossDomain);

app.get('/', (req, res) => {res.send(db.users)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

/*

/ --> res = this is working
/signin --> POST - success/fail
/register --> POST = user
/profile/:uderId --> GET = user
/image --> PUT = user updated

*/