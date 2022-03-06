var express = require('express');
var router = express.Router();

let usersController = require('../controllers/users')

//Authenticator function
function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()){

        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

//Router for listing all users
router.get('/business_contacts', usersController.userList)

// Routers for edit functions
router.get('/update/:id', requireAuth, usersController.displayUpdatePage);
router.post('/update/:id', requireAuth, usersController.processUpdatePage);

// Router for Delete function
router.get('/delete/:id', requireAuth, usersController.performDelete);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Signup
router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.signup);

//SignIn
router.get('/signin', usersController.renderSignIn);
router.post('/signin', usersController.signin);

//SignOut
router.get('/signout', usersController.signout);

module.exports = router;
