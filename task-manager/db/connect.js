const mongoose = require('mongoose');

// Using the properly URL-encoded username and password
const connectDB=(url)=>{

    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true
    })
}
module.exports=connectDB

