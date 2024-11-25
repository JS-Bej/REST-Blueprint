import * as dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import {db} from './db';
import { estudianteRouter } from './src/routes/estudianteRouter'
import { asignaturaRouter } from './src/routes/asignaturaRouter'
import { profesorRouter } from './src/routes/profesorRouter';
import { imparteRouter } from './src/routes/imparteRouter';
import cors from 'cors'
import { inscribeRouter } from './src/routes/inscribeRouter';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=> {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

app.use('/estudiantes', estudianteRouter);
app.use('/asignaturas', asignaturaRouter);
app.use('/profesores', profesorRouter);
app.use('/imparten', imparteRouter);
app.use('/inscriben', inscribeRouter);


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