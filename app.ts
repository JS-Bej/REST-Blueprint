import * as dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors'
import * as bodyParser from 'body-parser';
import {db} from './db';
import { studentRouter } from './src/routes/studentRouter'
import { subjectRouter } from './src/routes/subjectRouter'
import { professorRouter } from './src/routes/professorRouter';
import { teachRouter } from './src/routes/teachRouter';
import { registerRouter } from './src/routes/registerRouter';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=> {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

app.use('/students', studentRouter);
app.use('/subjects', subjectRouter);
app.use('/professors', professorRouter);
app.use('/teaches', teachRouter);
app.use('/registers', registerRouter);


db.connect((err)=>{
    if(err){
        console.log('Database connection error')
    } else {
    console.log('Database connected')
}
});

app.use((req: Request, res: Response)=>{
    res.status(404).send({ error: 'Not found', message: 'URL not found'});
})

app.listen(process.env.PORT, ()=>{
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
})