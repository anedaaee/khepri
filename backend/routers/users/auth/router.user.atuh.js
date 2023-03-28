const express = require('express');
const router = new express.Router();
//const Users = require('../../../controllers/users/authentication/users,.authenticatio.controller');
//const users = new Users();

//const query = require('../../../model/database');
const UserController = require('../../../controllers/users/auth/user.auth.controller');
const userController = new UserController();
// router.get('/', users.list);
// router.post('/add', users.save);
// router.get('/update/:id', users.edit);
// router.post('/update', users.update);
// router.get('/delete/:id', users.delete);
// router.get('/login/:username/:password', users.login);
// router.post('/login', users.postlogin);
// router.get('/login', users.getlogin);

router.post('/signup',userController.signup);
router.post('/login');
router.post('/update');
router.post('/delete');


// router.get('/hi',(req,res,next)=>{
//     console.log("hi");
//     //let db = new Database();
//     // let result = db.setConnection().then((result) => {
//     //     console.log(result);
//     // }).catch((result) => {
//     //     console.log(result);
//     // });
//     //result = db.query("describe users;");
//     query("select * from users;")
//     .then((result) => {
//         console.log(JSON.stringify(result));
//         res.send(JSON.stringify(result));
//     })
//     .catch( (error) => {
//         console.log(JSON.stringify(error));
//     });
// });
module.exports = router;