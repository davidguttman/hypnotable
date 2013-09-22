var hypnotable = require('../')

var accounting = require('accounting')
var es         = require('event-stream')

var ghUsers    = require('./github.json')

var formatNumber = function(val) {
  return accounting.formatNumber(val)
};

var columns = [
  {
    property: 'name',
    title: 'Name'
  }, {
    property: 'login',
    title: 'User Name'
  }, {
    property: 'followers',
    title: 'Followers',
    template: formatNumber
  }, {
    property: 'following',
    title: 'Following',
    template: formatNumber
  }, {
    property: 'public_repos',
    title: 'Repos'
  }, {
    property: 'location',
    title: 'Location'
  }, {
    property: 'repos_per_follower',
    title: 'Repos per Follower',
    template: function(val) {
      return val.toFixed(3)
    }
  }
]

var stream = es.readArray(ghUsers)
var tr = es.through(function(user) {
  user.repos_per_follower = user.public_repos/user.followers
  this.emit('data', user)
})

var ht = hypnotable(columns)
document.body.appendChild(ht.el)
stream.pipe(tr).pipe(ht)