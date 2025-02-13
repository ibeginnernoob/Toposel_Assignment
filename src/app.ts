import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'

import WebRouter from './routes/index'

const app = express()

dotenv.config({ path: '../.env' });

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
}

app.use(cors())
app.use(express.json())

app.use('/api/v1', WebRouter)

app.listen(3000, ()=>{
    console.log('Server listening on port 3000!')
})