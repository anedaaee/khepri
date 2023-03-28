const express = require('express');
const passport = require('passport');

const ServerStatus = require('../../../controllers/admin/serverStatus/admin.server.controller');
const serverStatus = new ServerStatus();

const router = express.Router();

router.post('/serverUsage',passport.authenticate('jwt' , {session : false}),serverStatus.serverUsage);

module.exports = router ;