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
data.forEach(function(item) { ht.write(item) })

window.document.body.appendChild(ht.el)

test('table should sort', function(t) {
  var cell1 = ht.el.querySelector('tbody tr td')
  t.ok(cell1.innerHTML === 'tb', 'should start with insertion order')

  var header1 = ht.el.querySelector('th')
  header1.classList.add('new-class')
  
  eventFire(header1, 'click')
 
  cell1 = ht.el.querySelector('tbody tr td')
  t.ok(cell1.innerHTML === 'ta', 'should sort by string field')
  t.end()
})
  
function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}