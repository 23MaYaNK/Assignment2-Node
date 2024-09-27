const User=require('../models/User');
const params  = require('../routes/user');
const bcrypt=require('bcrypt');
const saltRound=10;

async function addUser(req,res){
    try{
        let hashedPassword=bcrypt.hashSync(req.body.password,saltRound);
        let user=new User(req.body);
        console.log(user);
        user.password=hashedPassword;
        // console.log(req.body);
        await user.save();
        res.render('adduser');
        
}catch(err){
    console.log(err);
}
}
async function dologin(req, res) {
    try { 
        console.log(req.body, 'req.body');  // Log input data

        // Find user by emailId
        let user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            console.log('No user found with this email');
            return res.status(404).end("No user found");
        }

        console.log(user, 'user found for login');

        // Compare passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            if (user.usertype == 1) {
                console.log('Admin login successful');
                return res.render('adminPanel');
            } else {
                console.log('User login successful');
                return res.render('adminPanel');
            }
        } else {
            console.log('Wrong password entered');
            return res.status(401).end("Wrong password");
        }

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send("An error occurred during login");
    }
}

async function showusers(req,res) {
    try{
        let user =await User.find({});
        // console.log(student);
        res.render('showusers',{
            user:user      // user--> table fetching data : user--> our varible on line 49
        })

    }catch(err){
        console.log(err);
    }
    
}

async function getUserForEdit(req,res) {
    try{ 
        
        let id=req.params.id;
        let user=await User.findOne({ _id: id});
        console.log(user);
        res.render('userforedit',{
            user:user

        });

    }catch(err){
        console.log(err, 'err');
    }
}

async function updateUser(req,res) {
    try{ let id=req.params.id;
        console.log(req.body ,"request body")
        let user =await User.findOne({_id: id});
        console.log(user);
        user.firstName=req.body.firstName;
        user.lastName=req.body.lastName;
        user.country=req.body.country;
        user.emailId=req.body.emailId;
        user.mobileNo=req.body.mobileNo;
        let hashedPassword=bcrypt.hashSync(req.body.password,saltRound);
        user.password=hashedPassword;
        await user.save();
        let users=await User.find({});
        res.render('showusers',{
            user:users  // fileReference : yourvarilable Reference
        }) 
    }catch(err){
        console.log(err);
    }    
}
async function deleteUser(req,res) {
    try{
        let id =req.params.id;
        await User.deleteOne({_id:id});
        let user= await User.find({});
        res.render('showusers',{
            user:user
        })


    }catch(err){
        console.log(err);
    }
    
}

module.exports={
    addUser,
    dologin,
    showusers,
    getUserForEdit,
    deleteUser,
    updateUser
}