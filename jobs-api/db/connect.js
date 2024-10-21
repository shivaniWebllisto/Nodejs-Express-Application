

const mongoose = require('mongoose');
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

