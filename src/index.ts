import express from 'express'
import mongoose from 'mongoose'
import CustomerAUth from './routes/CustomerAUth'
import CustomerCrudOperation from './routes/CustomerCrudOperation'

const app= express()
const port=4001

app.use(express.json())
mongoose.connect("mongodb://localhost:27017/MYneWYoutube").then(() => console.log('ahmed test')).catch((i)=>console.log('errr' ,i))
app.use('/customerAuth',CustomerAUth)
app.use('/customerCrude',CustomerCrudOperation)
app.listen(port,()=>{
    console.log('server is running')
}
)