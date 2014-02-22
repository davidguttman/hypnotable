var test = require('tape')

var hypnotable = require('../')

var data = 
    [ {strField: 'b', numField: 1}
    , {strField: 'a', numField: 3}
    , {strField: 'c', numField: 2}
    ]

var columns = 
  [ {property: 'strField', template: function(v) {return 't'+v}}
  , {property: 'numField'}
  ]

var ht = hypnotable(columns)
data.forEach(ht.write.bind(ht))

window.document.body.appendChild(ht.el)

test('table should sort', function(t) {
  var cell1 = ht.el.querySelector('tbody tr td')
  t.assert(cell1.innerHTML === 'tb')

  ht.el.querySelector('th').click()
  cell1 = ht.el.querySelector('tbody tr td')
  t.assert(cell1.innerHTML === 'ta')
  t.end()
})
  