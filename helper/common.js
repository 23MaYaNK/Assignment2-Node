const signup=require('../models/User');
const bcrypt=require('bcrypt');
const saltRound=10;
async function createadmin() {
    try{
        let password=bcrypt.hashSync("8860044187",saltRound);
        let User={
            firstName:'admin',
            email:'mayank@house.in',
            password: password,
            usertype:1
        }
       
        let user=new signup(User);
        await user.save();
        console.log("Admin has been created successfully")

    }catch(err){
        console.log(err);
    }
    
}
module.exports={
    createadmin
}