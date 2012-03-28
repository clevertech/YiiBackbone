// features/step_definitions/myStepDefinitions.js

var myStepDefinitionsWrapper = function() {
	this.World = require("../support/world.js").World; // overwrite default World constructor

	this.Given(/^I am on the "([^"]*)"$/, function(callback) {
	    // express the regexp above with the code you wish you had
		this.visit('http://foo.bar', callback);
	});

	this.When(/^I go to the "([^"]*)"$/, function(text, callback) {
	  // express the regexp above with the code you wish you had
		// this.browser.text('body').should.include.string(text);
		callback();
	});

	this.Then(/^I should see "([^"]*)"$/, function(text, callback) {
	    // express the regexp above with the code you wish you had
		// this.browser.text('body').should.include.string(text);
		callback();
	});
  
};

module.exports = myStepDefinitionsWrapper;
