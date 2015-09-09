var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
// Might have to do a check for url in list
exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(exist) {
    if (!exist) {
      exports.readListOfUrls(function(urls) {
        callback(urls.push(url));
      });
    }
  })
};

// Return boolean
exports.isUrlArchived = function(url, callback) {
};

// Returns nothing
exports.downloadUrls = function() {
};
