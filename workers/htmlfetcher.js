// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');

var unarchivedUrls = [];

// archive.readListOfUrls(function(urls) {
//   for (var i = 0; i < urls.length; i++) {
//     archive.isUrlArchived(urls[i], function(isArchived, url) {
//       if (!isArchived) {
//         // Push url to unarchivedUrls
//         unarchivedUrls.push(url);
//         // Beware the context has changed here, so urls[i] will be undefined
//       }
//     })
//   }
// });

// archive.downloadUrls(unarchivedUrls);