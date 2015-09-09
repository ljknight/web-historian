var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var assetPath = __dirname + '/public/' + asset;
  var extension = path.extname(asset);
  var contentType = {};
  
  if (extension === '.html') {
    contentType["Content-Type"] = "text/html";
  } else if (extension === '.css') {
    contentType["Content-Type"] = "text/css"; 
  }

  fs.readFile(assetPath, 'utf8', function(err, html) {
    console.log(html);
    _.extend(headers, contentType);

    if (err) {
      console.log('FILE NOT FOUND: ' + err);
      res.writeHead(404, headers);
      res.end(err);
    }

    console.log('FILE FOUND');
    res.writeHead(200, headers);
    console.log(html);
    res.write(html);
    res.end(function() {
      callback();
    });
  });
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
