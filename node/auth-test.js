'use strict';

var assert = require("assert");
var jwt = require('jwt-simple');
var Auth = require("../src/services/auth");


describe('Authentification', function() {
	it('Should return the user token', function(done) {
		var token = Auth.createToken('admin');

		if (!typeof token === "string") {
			throw new Error('token is undefined or is not a string');
		}
		done();
		describe('getUserFromToken', function() {
			it('Should return the user login from token', function(done) {
				Auth.isAuthenticated(token).then(function(user) {
					assert.equal(user.login, 'admin');
					done();
				}, function(err) {
					done(err);
				});
			});
		});
	});
});