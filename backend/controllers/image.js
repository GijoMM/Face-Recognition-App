require('dotenv').config({ path: '..heroku git:remote -a/.env' })
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: `${process.env.REACT_APP_API_KEY}`
   });

const handleApiCall = (req, res) => {
    app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => {
         res.json(data);
     })
     .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entrie', 1)
    .returning('entrie')
    .then( entrie => {
        res.json(entrie[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}