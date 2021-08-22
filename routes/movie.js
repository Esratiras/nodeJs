const express = require('express');
const router = express.Router();
//Models
const Movie = require('../models/Movie')
router.get('/api/movie', function (req, res, next) {
    const movie = new Movie({

    })
    movie.save((err, data) => {
        if (err) console.log(err)
        res.json(data)
    })
});




module.exports = router;
