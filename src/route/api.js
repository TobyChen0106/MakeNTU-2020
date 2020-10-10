const axios = require("axios");
const express = require("express");
const router = express.Router();
const baseUrl = 'https://api.cardbo.info/api/v3'

router.post('/token', (req, res) => {
    axios.post(baseUrl + '/token',
        {
            username: req.body.username,
            password: req.body.password
        }
    )
    .then(r => { if(r.status == 201) res.json(r.data) })
    .catch(error => console.log(error));
});

router.get('/user', (req, res) => {
    axios.get('api/user/' + req.body.userId,
        {
            headers: req.body.headers
        }
    )
    .then(r => { res.json(r) })
    .catch(error => console.log(error));
});


module.exports = router;