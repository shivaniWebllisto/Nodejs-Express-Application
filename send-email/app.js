const express =require('express')
const app=express()
let PORT =8080;
const sendMail=require('./controllers/sendMail')
app.get('/',(req,res)=>{
    res.send('I am server')
})
app.get('/send-email',sendMail)
const start=()=>{
    try{
        app.listen(PORT,()=>{
            console.log('server is running on port 8080')
        })
    }catch(err){
        console.log(err)
    }
}
start()