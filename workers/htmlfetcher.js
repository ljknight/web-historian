// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urls) {
  for (var i = 0; i < urls.length; i++) {
    archive.isUrlArchived(urls[i], function(isArchived, url) {
      console.log('Current url: ' + url);
      if (!isArchived) {
        // Push url to unarchivedUrls
        console.log(url + ' is unarchived!');
        // unarchivedUrls.push(url);
        archive.downloadUrls([url]);
      }
    });
  }
  // Below isn't working because of asynchronosity
  // console.log('Unarchived urls: ' + unarchivedUrls);
  // archive.downloadUrls(unarchivedUrls);
});

// Setting up Cron job

// crontab -e
// */1 * * * * /usr/local/bin/node /Users/student/Desktop/2015-08-web-historian/workers/htmlfetcher.js
// Save it


