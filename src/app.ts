import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import socketIO, { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
// middlewares
import graphql from './middlewares/graphql';
import i18 from './middlewares/i18';
import auth from './middlewares/auth';

const PORT: string | number = process.env.PORT || 5000;
const MONGO_URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m673t.mongodb.net/${process.env.MONGO_DATABASE}`;
const app: Application = express();

// middlewares
app.use(cors({
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(i18);
app.use(process.env.API_VERSION_PATH + '/graphql', graphql);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const { code, data, message } = error;
  res.status(code || 404).json({ message, data });
});

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then((res: Mongoose) => {
    const server = app.listen(PORT, () => console.log('Server is running'));
    const socket: Server = socketIO(server);
    socket.on('connection', () => {
      console.log('Client connected');
    });
  })
  .catch((err: Error) => console.log(err));