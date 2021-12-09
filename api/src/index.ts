import express from 'express';
import { debug } from './routes/sample';
import { create_user, check_user } from './routes/userroutes';
import {uploadFile} from './routes/uploadFile';
import cors from 'cors';

const app = express();

app.use(cors());

//To handle POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', debug);

app.post('/createUser', create_user);

app.post('/checkUser', check_user);

app.post('/uploadFile', uploadFile);

app.listen(3001);


