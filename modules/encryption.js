var bcrypt = require("bcrypt");

var SALT_WORK_FACTOR = 10;

var booktrackerPW = {
  encryptPassword : function(password) {
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    var encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },  //  encryptedPassword
  comparePassword : function(candidatePassword, storedPassword) {
    var answer = bcrypt.compareSync(candidatePassword, storedPassword);
    return answer;
  } //  comparePassword
};  //  booktrackerPW

module.exports = booktrackerPW;
