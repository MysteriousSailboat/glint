// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./usersModel.js');

module.exports = {

  // Retrieve all of the ideas that exist in the MongoDB database.
  login: function(req, res, next) {
    
    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findUser = Q.nbind(User.findOne, User);
    
    findUser({ username: req.body.username })
      .then(function(user) {
        console.log(user);
        if (user) {
          User.comparePassword(req.body.password, user.password, function(err, isUser){
            res.json(isUser);
          })
        } else {
          res.json({message: 'User does not exist'});
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Add a new idea to the MongoDB database.
  signup: function(req, res, next) {
    var createUser = Q.nbind(User.create, User);

    var newUser = {
      username: req.body.username,
      password: req.body.password
    };

    createUser(newUser)
      .then(function (createdUser) {
        if (createdUser) {
          res.json(createdUser);
        }
      })
      .fail(function(error) {
        next(error);
      });

  }
};
