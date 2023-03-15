const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema(
    {
         username:{
            type:String,
            required:true,
            unique: true
         },

         email:{
            type:String,
            required:true,
            unique: true
         },
         password:{
            type:String,
            required:true,
            unique: true
         },
         isAdmin:{
            type:Boolean,
            default:false,
         },
         img:{
            type:String,
            default:"https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
         }

    },{timestamps: true}
    )


 module.exports = mongoose.model("User",userSchema)   