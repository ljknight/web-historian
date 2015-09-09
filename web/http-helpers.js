var path = require('path');
var fs = require('fs');
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

  // Generate the file path given asset and path module
  // Generate the correct Content-Type given asset
  // Call callback();

  console.log('ATTEMPTING TO RETRIEVE: ' + asset);
  console.log(path.resolve('', asset));
  // fs.readFile('public/index.html', 'utf8', function(err, html) {

  //   var headers = {"Content-Type": "text/html"};
  //   _.extend(headers, httpHelpers.headers);

  //   // If there's an err
  //   if (err) {
  //     console.log('FILE NOT FOUND');
  //     res.writeHead(404, headers);
  //     res.end(err);
  //   }

  //   console.log('FILE FOUND');
  //   res.writeHead(200, headers);
  //   console.log(html);
    // res.write(html);
    // res.end();
  // });
  
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
