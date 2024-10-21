require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter=require("./routes/main")
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());
app.use('/api/v1',mainRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 8080;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
