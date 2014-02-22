# Hypnotable #

Easily create a table from a stream (or array) of objects.

[![browser support](https://ci.testling.com/davidguttman/hypnotable.png)
](https://ci.testling.com/davidguttman/hypnotable)

# Example #

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

    var ht = Hypnotable(columns);
    document.body.appendChild(ht.el);

    parser.pipe(ht);

To see a bit more look at `/example` or locally run

    npm run-script example

# License #

MIT

---

![hypnotoad](http://i.imgur.com/1faEnTz.gif)