import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import doctorRoute from './routes/doctorRoute.js'
import reviewRoute from './routes/reviewRoute.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth/',authRoute);
app.use('/api/user/',userRoute);
app.use('/api/doctor/',doctorRoute)
app.use('/api/reviews/',reviewRoute)

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connected')
    } catch (err) {
        console.log('this error occured while connecting database:', err)
    }
}

app.listen(port, () => {
    connectToDB()
        .then(() => {
            console.log(`Server Listening on : http://localhost:${port}`)
        })
})