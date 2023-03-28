const express = require('express');
const passport = require('passport');

const UserController = require('../../../controllers/users/auth/user.auth.controller');
const userController = new UserController();

const router = new express.Router();

router.post('/signup',userController.signup);
router.post('/login' ,userController.login);

router.get('/protected', passport.authenticate('jwt' , {session : false}) , (req , res , next) => {
    res.status(200).send('you are auth');
});


// router.post('/update');
// router.post('/delete');


module.exports = router;