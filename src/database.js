const mongoose = require('mongoose')

let CONNECTION_STRING = 'mongodb+srv://Eirond:ClGYBfpCA6eDd1wX@jopipedia.u33ht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB Connected!'))
    .catch(error => console.log(error))
