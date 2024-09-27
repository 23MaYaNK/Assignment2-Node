const express=require('express');
const usercontrollers=require('../controllers/usercontrollers');
const router=express.Router();
router.use(express.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    res.render('login')                          
})

router.get('/login/nav',(req,res)=>{
    res.render('login')                          
})
router.post('/login',(req,res)=>{
    usercontrollers.dologin(req,res)                          
})
router.get('/sign/up',(req,res)=>{
    res.render('signup')                           
})
router.post('/add/user',(req,res)=>{
    usercontrollers.addUser(req,res)
                            
})
router.get('/show/users',(req,res)=>{
    usercontrollers.showusers(req,res)
})

router.get('/user/edit/page/:id',(req,res)=>{
    usercontrollers.getUserForEdit(req,res);
})
router.post('/update/user/:id',(req,res)=>{
    usercontrollers.updateUser(req,res)

})
router.get('/delete/user/:id',(req,res)=>{
    usercontrollers.deleteUser(req,res)
})



module.exports=router;