import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import routes from './modules/routes';
const port = config.port;

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.get('/', (req, res) =>{
    res.send("Server running")
})

app.listen(port, () =>{    
    console.log(`server running on port: ${port}`);
})


async function server() {
    try {
        await mongoose.connect(config.database_url!)


        console.log(`connect to database on port ${port}`);
    } catch (error) {
        console.error(`server error: ${error}`);
    }
}

server()