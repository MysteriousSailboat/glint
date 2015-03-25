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
      boardName: req.body.boardName,
      ideas: []
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
  },

  // Retrieve all of the ideas that exist in the MongoDB database for current board.
  boardIdeas: function(req, res, next) {

    console.log(req.body.url);    
    // // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    // var findAllIdeas = Q.nbind(Idea.find, Idea);
    
    // findAllIdeas({})
    //   .then(function(ideas) {
    //     res.json(ideas);
    //   })
    //   .fail(function(error) {
    //     next(error);
    //   });
  },

  // Add a new idea to the MongoDB database.
  addIdea: function(req, res, next) {
  
  console.log(req.body.url);
  //   // Bind the Mongoose create method to the Idea model, so that the Q module can use promises with it.
  //   var createIdea = Q.nbind(Idea.create, Idea);

  //   // Create a new document from the Idea model. If successfully created then the new Idea document is returned.
  //   var newIdea = {
  //     title: req.body.title,
  //     text: req.body.text
  //   };

  //   createIdea(newIdea)
  //     .then(function (createdIdea) {
  //       if (createdIdea) {
  //           res.json(createdIdea);
  //       }
  //     })
  //     .fail(function(error) {
  //       next(error);
  //     });
  // }

};
