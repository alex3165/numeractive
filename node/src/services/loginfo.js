var chalk = require('chalk');
var moment = require('moment');

module.exports = {
    logLevel: 3,

    _log: function(msg) {
		console.log('[' + moment().format('DD/MM/YYYY HH:mm:ss') + '] ' + msg)
    },

    error: function(msg) {
		if (this.logLevel >= 1) {
		    this._log(chalk.red(msg));
		}
    },

    info: function(msg) {
		if (this.logLevel >= 2) {
		    this._log(chalk.blue(msg));
		}
    },

    debug: function(msg) {
		if (this.logLevel >= 3) {
		    this._log(chalk.yellow(msg));
		}
    }
}
