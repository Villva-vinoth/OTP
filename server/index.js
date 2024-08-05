const express = require('express')
const cors = require('cors')
const emailRouter = require('./src/nodeMailer')
require('dotenv').config()

const app = express()

app.use(express.json(),cors())

app.use('/mail',emailRouter)

const port = 4000

app.listen(port,()=>{
    console.log(`server is running !`)
})
