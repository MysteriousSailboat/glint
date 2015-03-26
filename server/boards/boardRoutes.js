// Board Routes
// -----------
//
// The Board routes further routes any requests to /api/ideas in the middleware to specific Idea methods defined in the Idea controller.

var boardController = require('./boardController.js');
var util = require('./../config/utility.js');

module.exports = function (app) {
    // Further route from the /api/boards path. A GET will return all of the posted boards from the database. A POST will add a new board to the database.
    app.route('/')
      .get(util.checkUser, boardController.allBoards)
      .post(util.checkUser, boardController.newBoard);

    app.route('/ideas')
      .get(util.checkUser, boardController.boardIdeas)
      .post(util.checkUser, boardController.addIdea);
};
