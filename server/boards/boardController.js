// Board Controller
// ---------------
//
// The idea controller handles requests passed from the idea router.

// The Q module is used to bind Mongoose methods to use promises.
var Q = require('q');
var Board = require('./boardModel.js');

module.exports = {

  // Retrieve all of the boards that exist in the MongoDB database.
  allBoards: function(req, res, next) {
    
    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findAllBoards = Q.nbind(Board.find, Board);
    
    findAllBoards({})
      .then(function(boards) {
        res.json(boards);
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Add a new Board to the MongoDB database.
  newBoard: function(req, res, next) {

    // Bind the Mongoose create method to the Board model, so that the Q module can use promises with it.
    var createBoard = Q.nbind(Board.create, Board);

    // Create a new document from the Board model. If successfully created then the new Board document is returned.
    var newBoard = {
      title: req.body.title,
      text: req.body.text
    };

    createBoard(newBoard)
      .then(function (createdBoard) {
        if (createdBoard) {
            res.json(createdBoard);
        }
      })
      .fail(function(error) {
        next(error);
      });
  }

};
