const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const authRouter = require('./routes/api/auth');
const reviewsRouter = require('./routes/api/reviews');
const usersRouter = require('./routes/api/users');
const tasksRouter = require('./routes/api/tasks');


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);


app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server erorr' } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
