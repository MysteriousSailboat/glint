// Votes Route
// -----------
//
// The Votes route further routes any requests to /api/vote in the middleware to specific Vote methods defined in the Vote controller.

var voteController = require('./voteController.js');
var util = require('./../config/utility.js');

module.exports = function (app) {
    // Further route from the /api/vote path. A POST to upvote will increase the vote count by 1 in the database. A POST to downvote will decrease the vote count by 1 in the database.
    app.route('/upvote')
      .post(util.checkUser, voteController.upvote);
    app.route('/downvote')
      .post(util.checkUser, voteController.downvote);
};
