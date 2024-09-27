const mongoose = require('mongoose');
const timestamps=require('mongoose-timestamps')
const Schema =  mongoose.Schema;
const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String },
    country: { type: String },
    countryCode: { type: Number },
    mobileNo: { type: Number },
    password: { type: String },
    confirmPassword: { type: String },
    usertype:{type:Number,default:2,enum:[1,2]},
    createdAt:Date,
    updatedAt:Date

})
UserSchema.plugin(timestamps,{index:true});
module.exports = mongoose.model('User', UserSchema)