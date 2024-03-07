const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum:["student", "teacher", "admin"],
        default: "student"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

UserSchema.pre('save', async function(next) {
    const user = this;

    // Eğer parola değiştirilmemişse, işlemi devam ettir
    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Parolayı hash'le
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});





const User = mongoose.model('User',UserSchema)

module.exports = User