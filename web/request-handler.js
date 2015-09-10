var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// var htmlFetcher = require('../workers/htmlfetcher');
// require more modules/folders here!

var extensions = ['.html', '.css'];

var handleGetRequest = function(req, res) {
  // Given url
  archive.isUrlArchived(path.basename(req.url), function(isArchived, url){
    if (isArchived) {
      httpHelpers.serveAssets(res, url, function(){
        console.log('Retrieved: ' + url);
      });
    } else {
      var headers = {'Content-Type' : 'text/html'};
      _.extend(headers, httpHelpers.headers);
      res.writeHead(404, headers);
      res.end();
    }
  });
};

var handlePostRequest = function(req, res) {
  // console.log(req);
  var headers = {'Content-Type' : 'text/plain'};
  _.extend(headers, httpHelpers.headers);
  
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    // console.log();
    res.writeHead(302, headers);
    // req.end();
    // res.end(function() {
      archive.addUrlToList(data.slice(4), function(isArchived, url) {
        console.log('Is ' + url + ' archived?: ' + isArchived);
        if (!isArchived) {
          httpHelpers.serveAssets(res, 'loading.html', function() {
            console.log('SHOULD LOAD LOADING.HTML');
            // archive.downloadUrls([url]);
            // htmlFetcher();
          });
        } else {
          var urlParts = path.parse(url);
          httpHelpers.serveAssets(res, urlParts['base'], function() {
            console.log('SHOULD LOAD ARCHIVED FILE');
          });
        }
        // var fileContents = fs.readFileSync('/Users/student/Desktop/2015-08-web-historian/test/testdata/sites.txt', 'utf8');
        // console.log('What\'s in fileContents? '+ fileContents);
      })
    // });
  });

  req.on('error', function(err) {
    console.log('Error at handlePostRequest: ' + err);
    res.writeHead(404, headers);
  });
  // archive.addUrlToList(req.url)
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
        console.log('SHOULD FINISH SOME CSS ASSETS');
      });
    } else {
      handleGetRequest(req, res);
    }
  } else if (req.method === 'POST') {
    handlePostRequest(req, res);
  }
};