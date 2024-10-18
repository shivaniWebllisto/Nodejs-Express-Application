
const express = require("express");
const app = express();
const cors = require('cors');
const tasks = require("./routes/tasks.js");
const port = 8080;  
const connectDB=require('./db/connect.js');
require("dotenv").config();
const notFound =require('./middleware/not-found.js')
const errorHandlerMiddleware =require('./middleware/error-handler.js')
// midddleware
app.use(express.static('./public'))
app.use(express.json());
app.use(cors());
app.use(`/api/v1/tasks` , tasks);
app.use(notFound)
app.use(errorHandlerMiddleware)
// app.listen(port , () => {
//     console.log(`server is running on port ${port}`);
// })
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start()
