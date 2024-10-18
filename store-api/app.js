
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
// max char
// function maxChar(string){
//   let obj={};
//   for (let char of string){
//     if(!obj[char]){
//       obj[char]=1
//     }
//     else{
//       obj[char]+=1
//     }

//   }
// let maxNum=0
// let maximumChar=""
// for(let char in obj){
//   if(obj[char]>=maxNum){
//     maxNum=obj[char];
//     maximumChar=char;
//   }
// }
// return {maximumChar,maxNum}
// }
// console.log(maxChar("hello"))

// duplicate array

// function findDuplicates(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) !== index);
// }
// function findDuplicates(arr){
//   return arr.filter(()=>arr.indexOf(item)!==index)
// }
// // Example usage
// let arr = [1, 2, 3, 4, 2, 5, 3, 6];
// console.log(findDuplicates(arr)); // Output: [2, 3]


// function anagramGroup(words){
// const anagramgrp={};
// for (let word of words){
//   let sortedWords=word.split("").sort().join("");
//   if(!anagramgrp[sortedWords]){
//     anagramgrp[sortedWords]=[word]
//   }
//   else{
//     anagramgrp[sortedWords].push(word)
//   }
 
// }
// return Object.values(anagramgrp)
// }

// const arrList = ["eat", "tea", "tan", "ate", "nat", "bat"];
// console.log(anagramGroup(arrList))


//reverse string
// function reverseString(str){
//   let result="";
//   for(let i=str.length-1;i>=0;i--){
//     result+=str[i]
//   }
//   return result
// }

// console.log(reverseString("shivani")) 

// fibonnai series


// function fibonacci(n) {
//   let fib = [0, 1];
//   for (let i = 2; i <= n; i++) {
//     fib.push(fib[i - 1] + fib[i - 2]);
//   }
//   return fib;
// }

// Example usage
// let n = 10;
// console.log(fibonacci(n));

// factorial series // REcursion 
// function factorial(n) {
//   if (n === 0 || n === 1) {
//     return 1;
//   } else {
//     return n * factorial(n - 1);
//   }
// }

// Example usage
// let x = 5;
// console.log(factorial(x));


// function fibonacciSeries(n){
// let fib=[0,1]
// for(let i=2;i<=n;i++){
//   fib.push(fib[i-1]+fib[i-2])
// }
// return fib
// }
// const result = 4
// console.log(fibonacciSeries(result))


// function findDuplicates(arr) {
//   let duplicates = [];
//   let seen = {};
//   for (let i = 0; i < arr.length; i++) {
//     if (seen[arr[i]]) {
//       if (!duplicates.includes(arr[i])) {
//         duplicates.push(arr[i]);
//       }
//     } else {
//       seen[arr[i]] = true;
//     }
//   }
//   return duplicates;
// }

// Example usage
// let arr = [1, 2, 3, 2, 4, 5, 4, 6];
// console.log(findDuplicates(arr)); // Output: [2, 4]





