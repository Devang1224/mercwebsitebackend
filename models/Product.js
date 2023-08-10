const mongoose = require('mongoose')

const schema = mongoose.Schema

const ProductSchema = new schema(
    {
         title:{
            type:String,
            required:true,
            unique: true
         },

         desc:{
            type:String,
            required:true,
         },
         img:{
            type:Array,
            required:true,
         },
         categories:{
            type:Array,
            required:true,
         },
         size:{
            type:Array,
            required:true,
         },
         color:{
            type:String,
            required:true,
         },
         price:{
            type:Number,
            required:true,
         },
         inStock:{
            type:Boolean,
            default:true
         }
         

    },{timestamps: true}
    )


 module.exports = mongoose.model("Product",ProductSchema)   