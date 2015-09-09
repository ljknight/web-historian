var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

var extensions = ['.html', '.css'];

var handleGetRequest = function(req, res) {

};

var handlePostRequest = function(req, res) {

};

exports.handleRequest = function (req, res) {
  console.log(req.method + ': ' + req.url);
  if (req.method === 'GET') {
    var urlParts = path.parse(req.url);
    if (req.url === '\/') {
      // Retrieving static index.html
      httpHelpers.serveAssets(res, 'index.html', function() {
        console.log('SHOULD FINISH INDEX.HTML');
      });
    } else if (_.contains(extensions, urlParts['ext'])) {
      // Retrieving static assets
      httpHelpers.serveAssets(res, urlParts['base'], function() {
        console.log('SHOULD FINISH CSS.HTML');
      });
    } else {
      handleGetRequest(req, res);
    }
  } else if (req.method === 'POST') {
    handlePostRequest(req, res);
  }
  // res.end(archive.paths.list);
};