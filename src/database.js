const mongoose = require('mongoose')
require('dotenv').config()

let CONNECTION_STRING = `mongodb+srv://${process.env.USER}:${process.env.PASS}@jopipedia.u33ht.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('DB Connected!'))
    .catch(error => console.log(error))
