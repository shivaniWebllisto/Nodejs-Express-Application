
const express = require("express");
const app = express();
// const cors = require('cors');
const products = require("./routes/products.js");
const port = 8080;  
const connectDB=require('./db/connect.js');
require("express-async-errors")
require("dotenv").config();

// // midddleware
// app.use(express.static('./public'))
app.use(express.json());
app.get("/", (req, res) => {
  res.send("store api")
})
const notFound =require('./middleware/not-found.js')
const errorHandlerMiddleware =require('./middleware/error-handler.js')
// app.use(cors());
app.use(`/api/v1/products` , products);
app.use(notFound)
app.use(errorHandlerMiddleware)
// // app.listen(port , () => {
// //     console.log(`server is running on port ${port}`);
// // })
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
console.log("store api")


