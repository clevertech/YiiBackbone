var zombie = require('zombie'),
	should = require('should');

var World = function(callback) {
  this.browser = new zombie.Browser(); // this.browser will be available in step definitions

  this.visit = function(url, callback) {
	this.browser.visit(url, callback);
  };

  callback(this); // tell Cucumber we're finished and what to use as World (this)
};

exports.World = World;
