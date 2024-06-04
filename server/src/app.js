import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { authRouter } from './routes/authRouter.js';
import { userRouter } from './routes/userRouter.js';
import { tripsRouter } from './routes/tripsRouter.js';
import { expensesRouter } from './routes/expensesRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/trips', tripsRouter);
app.use('/expenses', expensesRouter);

app.use((req, res, next) => {
  const error = new Error('Route is not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Something went wrong!' });
});

export default app;
