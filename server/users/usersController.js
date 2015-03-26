// User Controller
// ---------------
//
// The User controller handles requests passed from the User router.

var Q = require('q');
var User = require('./userModel.js');

module.exports = {

  // Retrieve all of the ideas that exist in the MongoDB database.
  login: function(req, res, next) {
    
    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findAllIdeas = Q.nbind(Idea.find, Idea);
    
    findAllIdeas({})
      .then(function(ideas) {
        res.json(ideas);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Add a new idea to the MongoDB database.
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var createUser = Q.nbind(User.create, User);

    var newUser = {
      title: req.body.title,
      text: req.body.text
    };

    createUser(newUser)
      .then(function (createdUser) {
        if (createdIdea) {
          res.json(createdIdea);
        }
      })
      .fail(function(error) {
        next(error);
      });

  }
};
