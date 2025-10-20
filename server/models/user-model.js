const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    name: {type: String, unique: true, required: true},
    lastLogin: { type: Date },
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    isBlocked: { type: Boolean, default: false },
    activationLink: {type: String}

})

module.exports = model('User', UserSchema);