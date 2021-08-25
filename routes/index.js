const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', (req, res, next) => {

    const {username, password} = req.body
    const saltRounds = 10
    //şifrelemek için hash
    bcrypt.hash(password, saltRounds).then((hash) => {
        const user = new User({
            username,
            password: hash
        })

        const promise = user.save()
        promise.then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })

        //şifreyi çözmek için compare
    })

})


router.post('/authenticate', (req, res, next) => {
    const {username, password} = req.body
    User.findOne({
        username
    }, (err, user) => {
        if (err)
            throw err
        if ( ! user) {
            res.json({
                status: false,
                message: 'Authentication failed,user not found'
            })
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if ( ! result) {
                    res.json({
                        status: false,
                        message: 'Authentication failed, wrong password'
                    })
                } else {
                    const payload = {
                        username
                    }
                    const token = jwt.sign(payload,req.app.get('api_secret_key'),{
                        expiresIn: 720
                    })
                    res.json({
                        status: true,
                        token
                    })
                }
            })
        }
    })
})
module.exports = router;
