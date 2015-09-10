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
      console.log('Path not found' + err);
      return err;
    } 

    // Cleans array of empty elements
    // console.log('DATA: ' + data);
    // console.log('DATA SPLIT BY \\n: ' + data.split('\n'));
    // console.log('DATA SPLIT BY \\n: ' + data.split('\n').length);
    
    // console.log('CLEANED ARRAY: ' + cleanedArray);
    // console.log('CLEANED ARRAY SPLIT BY \\n: ' + cleanedArray.length);
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
  // console.log('addUrlToList: ' + url);
  exports.isUrlInList(url, function(exist) {
    // console.log('Does url exist?: ' + exist);
    if (!exist) {
      exports.readListOfUrls(function(urls) {

        // Cleaning url list of empty strings
        for (var i = 0; i < urls.length; i++) {
          if (urls[i] == '') {         
            urls.splice(i, 1);
            i--;
          }
        }
        // console.log('Adding url: ' + url);
        // console.log('Old array of urls: ' + urls);
        // console.log('LENGTH: ' + urls.length);
        urls.push(url);
        // console.log('New array of urls: ' + urls);
        // console.log('LENGTH: ' + urls.length);
        // console.log(urls.join("\n"));

        fs.writeFile(exports.paths.list, urls.join("\n"), function(err) {
          if (err) {
            console.log('Error at: ' + 'addUrlToList' + err);
          }
          // Returns boolean to see if url is already archived
          exports.isUrlArchived(url, callback);

        });
        // console.log('urls: ' + urls);
      });
    } else {
      // Returns boolean to see if url is already archived
      exports.isUrlArchived(url, callback);
    }
  });
};

// Return boolean
exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    callback(_.contains(files, url), url);
  })
};

// Returns nothing
// The passed in urls should be cleaned of already archived
exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    // console.log('Attempting to archiving: ' + urls[i]);
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





















