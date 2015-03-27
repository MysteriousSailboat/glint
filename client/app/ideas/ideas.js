
// Ideas controller
// ----------------
//

// The pattern we're using here is the pattern we're using across all our controllers: the controllerAs syntax. This syntax is for Angular versions 1.2 and up, and means you don't have to use `$scope` anymore. Instead, inside of your HTML, you declare your controller with `ng-controller="IdeasCtrl as ictrl"` and reference your variables within that controlled scope as `ictrl.<varname>`. Additionally, instead of setting your properties within your controller to `$scope`, assign your controller's `this` to a variable called self and set your properties to that. 
angular.module('glint.ideas', [])
.controller('IdeasCtrl', function (Ideas, $filter, $location){
  var self = this;
  self.data = { ideas: [] };
  self.idea = {};
  self.postSuccess = false;
  self.submitted = false;

  // Display all ideas currently in the database.
  self.displayIdeas = function(){
    var path = $location.$$url;
    Ideas.getIdeas(path)
      .then(function (results){
        results = $filter('orderBy')(results, 'votes', true);
        // Add any new calculations as variables to the existing results using map and extend
        // We have added a way to display either recently upvoted or recently downvoted 
        
        results.map(function(result){
          var good = false;
          var bad = false
          if (Date.parse(result.lastUpVoted) - Date.parse(result.lastDownVoted) > 0){
            good = true;
          } else {
            bad = true;
          }
          console.log(result);
          result.displayDollarSign = good;
          result.displayStockDown = bad;
        })


        self.data.ideas = results;
        // console.log(self.data.ideas);
        // change lastUpVoted / DownVoted to range betw 0 and 100
        // console.log(Date.parse(self.data.ideas[0].lastUpVoted));
      })
      .catch(function (error){
        console.error('displayIdeas error', error);
      });
  };

  // Submit a new idea.
  self.submitIdea = function ($timeout){

    var path = $location.$$url;

    // Show description box.
    if (self.submitted === false){
      self.submitted = true;
    } else {

    // Escape user input.
    self.idea.title = _.escape(self.idea.title);
    self.idea.text = _.escape(self.idea.text);
    var idea = JSON.stringify(self.idea);
    
    // POST new idea, display confirmation, redisplay all ideas.
    Ideas.createIdea(path, idea)
      .then(function (response){
        // Show user feedback.
        self.postSuccess = true;
        // Hide idea description field.
        self.submitted = false;
        // Clear form fields after submit.
        self.idea = {};
        self.displayIdeas();
      })
      .catch(function (error){
        console.error('createIdea error', error);
      });
    }
  };

  self.displayIdeas();
});
