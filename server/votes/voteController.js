// Vote Controller
// ---------------
//
// The vote controller handles requests passed from the vote router.

var Q = require('q');
var Idea = require('../ideas/ideaModel.js');

module.exports = {

  // Add one to the vote count for a given idea.
  upvote: function(req, res, next) {
    //
    updateVoteCount(req, res, 1, 'up');
  },

  // Subtract one from the vote count for a given idea.
  downvote: function(req, res, next) {
    updateVoteCount(req, res, -1, 'down');
  }

};


// Update the vote count for an idea.
// Add up or down vote indications.
var updateVoteCount = function(req, res, changeValue, direction) {

  // Bind the findOneandUpdate method to use promises
  var updateVotes = Q.nbind(Idea.findOneAndUpdate, Idea);

  var query = { title: req.body.title };
  var dateTime = Date();
  console.log(dateTime);
  var voteTime;
  if (direction === 'up'){
    voteTime = {lastUpVoted : dateTime};
  };
  if (direction === 'down'){
    voteTime = {lastDownVoted : dateTime};
  };



  updateVotes(query, { $inc: { votes: changeValue }, $set: voteTime} )
    .then(function (idea) {
        res.send(idea);
      })
    .fail(function (err) {
      console.log(err);
      next(err);
    });
};
