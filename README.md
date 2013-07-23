# Hypnotable #

Want a table? Have a stream of object data?

    var Hypnotable = require('hypnotable');

    var hyperquest = require('hyperquest');
    var JSONStream = require('JSONStream');
    var accounting = require('accounting');

    columns = [
      {
        property: 'screenName',
        title: 'Screen Name'
      }, {
        property: 'followers',
        title: 'Follower Count',
        template: accounting.formatNumber
      }
    ];

    var stream = hyperquest('/api/accounts.json');
    var parser = JSONStream.parse([true]);
    stream.pipe(parser);

    var ht = Hypnotable(columns, parser);
    document.body.appendChild(ht.el);
