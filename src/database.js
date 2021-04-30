const mongoose = require('mongoose')
require('dotenv').config()

let CONNECTION_STRING = process.env.MONGO_URI || ''

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('DB Connected!'))
    .catch(error => console.log(error))
