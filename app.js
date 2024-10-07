const express=require("express")
const hospitalRouter=require('./routes/hospitalRoute')

const app=express()
require("dotenv").config();



app.use(express.json())

app.use('/hospitaldata',hospitalRouter)


app.get('/',(req,res)=>{
    res.send('from hospitaldata api')
})



app.listen(process.env.port,()=>{
    console.log(`server is up and running in port 5000`)
})

