const express = require('express');
const router = express.Router();
//Models
const Book = require('../models/Book')

router.get('/new', function (req, res, next) {
    const book = new Book({
        title: 'Hayatım Roman',
        author: 'Esra',
        published: false,
        comments: [{
            message: 'Acıklı anılar var'
        }],
        meta: {
            votes: 12,
            favs: 104
        }
    })
    book.save((err, data) => {
        if (err) console.log(err)
        res.json(data)
    })
});

router.get('/search', function (req, res, next) {
    //Book find boş obje göndermek tüm kayıtları seçmemizi sağlar
    //find tüm collectiondaki kayıtlara bakar
    Book.find({}, 'title comments', (err, data) => {
        res.json(data)
    })
})

router.get('/searchOne', function (req, res, next) {
    //findOne ilk kayıtla uyuştuğunda ilk kayıt cevap olarak döner
    Book.findOne({title: 'Hayatım Roman'}, (err, data) => {
        res.json(data)
    })
})

router.get('/searchById', function (req, res, next) {
    //find ile tüm collection taranır findById ile bir kerede işlem yapılır ve daha fazla arama yapılmaz

    Book.findById('611e6e61589118836bf4c5b8', (err, data) => {
        res.json(data)
    })
})

router.put('/update', function (req, res, next) {
    Book.updateOne({published: false}, {published: true}, (err, data) => {
        res.json(data)
    })
})

//id bazlı güncelleme
router.get('/updateById', function (req, res, next) {
    Book.findByIdAndUpdate('611e6e61589118836bf4c5b8', {title: 'HelloWorld', 'meta.favs': 99}, (err, data) => {
        res.json(data)
    })
})

router.delete('/remove', function (req, res, next) {

    //Book.findOne() => remove()
    //Book.findOneAndRemove()
    //Book.remove()
    Book.findOneAndRemove({published:true}, (err, book) => {
        //İlk gördüğü kaydı siler
        book.remove((err, data) => {
            res.json(data)
        })
    })
})

//sort
router.get('/sort', function (req, res, next) {
    Book.find({}, {}, (err, data) => {
        res.json(data)
    }).sort({'meta.favs':1})//küçükten büyüğe sıralama 1
    //büyükten küçüğe -1
})

//limit and skip
//limit:istediğimiz kadar kayıt
//skip:
router.get('/limitandSkip', function (req, res, next) {
    Book.find({}, {}, (err, data) => {
        res.json(data)
    }).limit(2)
})

router.get('/limitandSkip', function (req, res, next) {
    Book.find({}, {}, (err, data) => {
        res.json(data)
    })
        .skip(2)
        .limit(1)
    //2.den sonra 1 tane kayıt göster
})

module.exports = router;
