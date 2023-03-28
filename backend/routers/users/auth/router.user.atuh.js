const express = require('express');
const router = new express.Router();
//const Users = require('../../../controllers/users/authentication/users,.authenticatio.controller');
//const users = new Users();
const passport = require('passport');
//const query = require('../../../model/database');
const UserController = require('../../../controllers/users/auth/user.auth.controller');
const userController = new UserController();

router.post('/signup',userController.signup);
router.post('/login' ,userController.login);
router.get('/protected', passport.authenticate('jwt' , {session : false}) , (req , res , next) => {
    res.status(200).send('you are auth');
});


router.post('/update');
router.post('/delete');


module.exports = router;