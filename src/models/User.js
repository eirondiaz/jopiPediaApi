const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name required']
    },
    lName: {
        type: String,
        trim: true,
        required: [true, 'last name required']
    },
    user: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'user required']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'email required']
    },
    pass: {
        type: String
    },
    rPass: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    foto: {
        type: String
    },
    fans: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, { 
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.virtual('restricciones', {
    ref: 'Restriccion',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})

module.exports = mongoose.model('User', userSchema)