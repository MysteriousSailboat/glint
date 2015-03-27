// Votes controller
// ----------------

angular.module('glint.votes', [])

.controller('VotesCtrl', function (Votes, $location){
  var self = this;

  // Display the user's upvotes and pass them along to the db.
  self.upvote = function(idea){
    var path = $location.$$url;
    var ideaRef = idea;
    console.log(path);

    idea = JSON.stringify(idea);
    Votes.upvote(path, idea)
      .then(function (response){
        // Update the specific idea's vote count.
        ideaRef.votes++;
      })
      .catch(function (error){
        console.error('upvote error', error);
      });
  };

  // Display the user's downvotes and pass them along to the db.
  self.downvote = function(idea){
    var path = $location.$$url;
    var ideaRef = idea;

    idea = JSON.stringify(idea);
    Votes.downvote(path, idea)
      .then(function (response){
        // Update the specific idea's vote count.
        ideaRef.votes--;
      })
      .catch(function (error){
        console.error('downvote error', error);
      });
  };
});
