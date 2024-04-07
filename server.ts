import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: './config/development.env' });
import router from './routes/user-routes';
import bodyParser from 'body-parser';
import {db} from "./sequelize";
import post from './routes/post-routes';
const host = process.env.HOST;
const port = process.env.PORT || 4000;
console.log("Host:",host);
try{
    db.authenticate();
    console.log('conncection has been established successfully');
}
catch(error){
    console.log("unable to cooncet with database");
}

const app = express();
app.use(bodyParser.json());
app.use('/user',router)
app.use('/post',post)
app.get('/',function(req,res){
    res.send('Hello World');
})

app.listen(4000, () => {
    console.log("Server is started on port 4000");
});