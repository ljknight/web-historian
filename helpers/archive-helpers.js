var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// Returns array
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('path not found' + err);
      return err;
    } 
    callback(data.split('\n'));
  });
};

// Returns boolean
exports.isUrlInList = function(url, callback) {
  // anonymous function callback allows access to returned array right away
  exports.readListOfUrls(function(urls) {
    callback(_.contains(urls, url));
  });
};

// Returns nothing
exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(exist) {
    if (!exist) {
      exports.readListOfUrls(function(urls) {
        callback(urls.push(url));
      });
    }
  });
};

// Return boolean
exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    callback(_.contains(files, url));
  })
};

// Returns nothing
// The passed in urls should be cleaned of already archived
exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    console.log('Attempting to archiving: ' + urls[i]);
    httpRequest.get({
      'url' : urls[i]
    }, exports.paths.archivedSites + '/' + urls[i], function(err, res) {
      if (err) {
        console.log('Error at httpRequest.get: ' + err);
        return;
      }
      console.log('File archived!');
    })
  }
};





















