const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require('cors')

const app=express()
dotenv.config();

app.use(express.json());
app.use(cors())

//routes
const authRoute = require("./routes/auth")
const user = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require('./routes/stripe')





app.use('/api/auth',authRoute)
app.use('/api/users',user)
app.use('/api/products',productRoute)
app.use('/api/carts',cartRoute)
app.use('/api/orders',orderRoute)
app.use('/api/checkout',stripeRoute)


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("successfully connected with mongodb");
    app.listen(process.env.PORT || 6010,()=>{console.log("server is running on port: 3000");})
})
.catch((err)=>{console.log(err);})


