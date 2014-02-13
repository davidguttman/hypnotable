var hypnotable = require('../')

var es = require('event-stream')
var accounting = require('accounting')

var ghUsers    = require('./github.json')

var columns = [
  {
    // Title: heading of the column
    title: 'User Name',
    // Property: object key/val of interest
    property: 'login',
    // Template: custom display of the value
    template: function(val, fullObj) {
      return '<a href="https://github.com/'+ val +'">' + val + '</a>'
    }
  }, 

  // Omit title to default to property name
  // Omit template to default to toString()
  {
    property: 'name'
  }, 

  // Property can also be a function
  {
    title: 'Repos per Follower',
    property: function(user) {
      return user.public_repos / user.followers
    },
    template: function(val) {
      return val.toFixed(3)
    }
  }, 

  {
    title: 'Repos',
    property: 'public_repos'
  }, 

  {
    title: 'Followers',
    property: 'followers',
    template: function (val, fullObj) {
      return accounting.formatNumber(val)
    }
  }
]

var ht = hypnotable(columns, function(obj, tr) {
  // optional fn gives you access to the object and the created row
})

document.body.appendChild(ht.el)

es.readArray(ghUsers).pipe(ht)