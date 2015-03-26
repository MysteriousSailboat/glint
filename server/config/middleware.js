// Server-Side Middleware
// ----------------------
//
// The middleware connects the Express server app with the Express routers and configures the Express app to use additional modules such as body-parser, and morgan.

// Allows for parsing of POST request body.
var bodyParser  = require('body-parser');
// Error logging and handling helper functions.
var helpers = require('./helpers.js'); 
// Logs requests sent from the client.
var morgan = require('morgan'); 

var session = require('express-session');
var cookieParser = require('cookie-parser');

module.exports = function (app, express) {

  // Create Express routers for each type of route.
  var ideaRouter = express.Router();
  var voteRouter = express.Router();
  var commentRouter = express.Router();
<<<<<<< HEAD
  var userRouter = express.Router();
=======
>>>>>>> cdc7ae1f003be64cd20ff4143a20fda3e4332681
  var boardRouter = express.Router();

  // Associate the Express server app with the different modules that it should use.
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({ secret: "I like turtles",
  saveUninitialized: true,
  resave: true }));

  app.use(express.static(__dirname + '/../../client'));
  app.use(morgan('dev'));
  app.use(helpers.logErrors);
  app.use(helpers.handleErrors);

  //Use board router to handle board requests.
  app.use('/api/boards', boardRouter);
  // Use the idea router for all idea requests.
  app.use('/api/ideas', ideaRouter); 
  // Use vote router for requests related to upvoting or downvoting.
  app.use('/api/vote', voteRouter);

  app.use('/api', userRouter);
  // Use comment router for requests related to adding and getting comments.
  app.use('/api/comments', commentRouter);

  // Inject our Express routers into their respective route files.
  require('../ideas/ideaRoutes.js')(ideaRouter);
  require('../votes/voteRoutes.js')(voteRouter);
  require('../comments/commentRoutes.js')(commentRouter);
  require('../users/usersRoutes.js')(userRouter);
  require('../boards/boardRoutes.js')(boardRouter);
};
