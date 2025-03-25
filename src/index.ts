import express from 'express'
import mongoose from 'mongoose'
import CustomerAUth from './routes/CustomerAUth'

const app= express()
const port=4000

app.use(express.json())
mongoose.connect("mongodb://localhost:27017/MYneWYoutube").then(() => console.log('ahmed test')).catch((i)=>console.log('errr' ,i))
app.use('/customer',CustomerAUth)
app.listen(port,()=>{
    console.log('server is running')
}
)