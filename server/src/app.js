import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import productRouter from './routes/product.router.js'
import cors from "cors"
import session from "express-session";

const app = express()
app.use(express.json())
app.use(cors());
try {
    await mongoose.connect('mongodb+srv://robmrdev:83VBnd4D5JO1D4Yb@cardigancluster.kqxx3hg.mongodb.net/cardigansDB?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)   
}

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder47300',
    resave: true,
    saveUninitialized: true,
}))


app.use('/', productRouter);


app.listen(8080, ()=>{
    console.log('Server on 8080')
})


