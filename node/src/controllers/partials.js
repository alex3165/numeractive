'use strict';

exports.partials = function(req, res) {
    res.render(req.params.page);
};