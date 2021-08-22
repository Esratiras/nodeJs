const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect('mongodb://localhost/NodeProject', {useNewUrlParser: true, useUnifiedTopology: true})

    mongoose.connection.on('open', () => {
        console.log('MongoDb Connected Successfully')
    })

    mongoose.connection.on('error', (err) => {
        console.log('MongoDb Connection Error',err)
    })

}

