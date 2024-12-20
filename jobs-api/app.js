require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');
app.use(express.json());
// extra packages
//connectDB
const connectDB =require('./db/connect.js');
// routes
const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/jobs')
app.use('/api/v1/auth',authRouter)
// app.use('/api/v1/jobs',jobsRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter);// this is used when we authenticating the route
// app.get('/', (req, res) => {
//   res.send('jobs api');
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();