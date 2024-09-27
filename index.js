const express=require('express');
const app=express();
const user=require('./routes/user');
const path=require('path');
const connection=require('./connection');
const common=require('./helper/common')
connection();
common.createadmin();
app.use(user);
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running on 3000");
    }
})


