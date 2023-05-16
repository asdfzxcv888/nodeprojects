
require('dotenv').config()

require('express-async-errors')
const express =require('express')
const app =express()
const connectdb=require('./db/connect')

const notfoundmiddleware =require('./middleware/not-found')
const errormiddleware =require('./middleware/error-handler')
const productrouter =require('./routes/products')

app.use(express.json())


app.get('/',(req,res)=>{
    res.send('<h1>store api project4</h1><a href ="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productrouter)

app.use(notfoundmiddleware)
app.use(errormiddleware)

const start=async()=>{

    try {
        await connectdb(MONGO_URI)
        app.listen(3000,console.log('server is on'))
    } catch (error) {
        console.log(error);
    }

}
start()