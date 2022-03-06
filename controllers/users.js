//Reference to the model
let User = require('../models/users');
let passport = require('passport');

//Gets all users from the database and reders the page to list all users
module.exports.userList = function(req, res, next){
    User.find((err,userList) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.render('users/business_contacts',{
                title: "Business Contacts",
                users: userList
            })
            console.log(userList);
        }
    });
}

//Display update page
module.exports.displayUpdatePage = (req, res, next) => {
    
    let id = req.params.id;
    User.findById(id,(err, userToUpdate)=>{
        if(err)
        {
            console.log(err);;
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('users/update',{
                title: 'Update User',
                user: userToUpdate
            })
        }
    });

}

// Processes the data submitted from the update form to update the user
module.exports.processUpdatePage = (req, res, next) => {
    
    let id = req.params.id;

    let updatedUser = User({
        _id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city
    });
    
    User.updateOne({_id: id},updatedUser, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/users/business_contacts');
        }
    });
}

// Deletes a user based on its id.
module.exports.performDelete = (req, res, next) => {
    
    let id = req.params.id;

    User.remove({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/users/business_contacts');
        } 
    });

}

module.exports.renderSignup = function(req, res, next) {
    if (!req.user) {
  
      // creates a empty new user object.
      let newUser = User();
  
      res.render('users/signup', {
        title: 'Sign-up Form',
        messages: req.flash('error'),
        user: newUser
      });
  
    } else {
      return res.redirect('/');
    }
  };

  
module.exports.signup = function(req, res, next) {
    if (!req.user) {
      console.log(req.body);
  
      let user = new User(req.body);

      console.log(user);
  
      user.save((err) => {
        if (err) {
          let message = getErrorMessage(err);
  
          req.flash('error', message);
          // return res.redirect('/users/signup');
          return res.render('users/signup', {
            title: 'Sign-up Form',
            messages: req.flash('error'),
            user: user
          });
        }
        req.login(user, (err) => {
          if (err) return next(err);
          return res.redirect('/');
        });
      });
    } else {
      return res.redirect('/');
    }
  };

//Display SignIn page
module.exports.renderSignIn = function(req, res, next) {
    
    if(!req.user){
        res.render('users/signin',{
            title: 'Login',
            messages: req.flash('error') || req.flash('info')
        })
    }
    else 
    {
        console.log(req.user);
        return res.redirect('/');    
    }
};

//Signin
module.exports.signin = function(req, res, next) {

    passport.authenticate('local', {
        successRedirect: req.session.url || '/',
        failureRedirect: '/users/signin' ,
        failureFlash: true
    })(req,res,next);
    delete req.session.url;
};

// Signout

module.exports.signout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};
