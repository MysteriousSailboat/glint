// User Model
// ----------
//
// The User model defines the structure of all of the User documents created.

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('users', UserSchema);

User.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch){
    if (err) {
      console.log('login error');
      console.error(err);
    } else {
      cb(null, isMatch);
    }
  });
};

UserSchema.pre('save', function(next){
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash){
      this.password = hash;
      next();
    });
});


module.exports = User;
