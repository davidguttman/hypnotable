bean = require 'bean'

tableTemplate = require './table.jade'

RowStream = require './row-stream.coffee'

require './style.css'

stringToElement = (str) ->
  clean = str.replace /(^\s+)|(\s+$)/g, ''
  div = document.createElement 'div'
  div.innerHTML = clean

  els = div.childNodes

  if els.length is 1
    return els[0]
  else
    return els

module.exports = (columns, rowFn) ->
  normalizeColumns columns

  html = tableTemplate columns: columns

  $table = stringToElement html
  $tbody = $table.querySelector 'tbody'

  rowStream = RowStream columns

  rowStream.on 'data', (data) ->
    {cells, obj} = data

    tr = document.createElement 'tr'
    for cell in cells
      td = document.createElement 'td'
      td.classList.add cell.className
      td.dataset.value = cell.serialized
      td.innerHTML = cell.text
      tr.appendChild td

    rowFn obj, tr if rowFn
    $tbody.appendChild tr

  addSort $table

  rowStream.el = $table

  return rowStream

normalizeColumns = (columns) ->
  for column, i in columns
    if typeof column.property is 'function'
      column.className ?= 'ht-col-' + i
      column.title ?= "Column #{i+1}"
    else
      column.title ?= column.property
      column.className ?= 'ht-col-' + column.property

addSort = (table) ->
  tbody = table.querySelector 'tbody'
  ths = table.querySelectorAll 'th'
  curSort = null
  reverse = false

  bean.on table, 'click', 'th', (event) ->
    el = this
    className = el.dataset.className
    rows = []
    rows.push tr for tr in tbody.childNodes

    if className is curSort
      reverse = not reverse
    else
      reverse = false

    th.classList.remove 'ht-sorted', 'ht-reverse' for th in ths

    el.classList.add 'ht-sorted'
    el.classList.add 'ht-reverse' if reverse

    rows.sort (a, b) ->
      [av, bv] = [a, b].map (cell) ->

        val = cell.querySelector('.'+className).dataset.value
        try
          return JSON.parse val
        catch err
          return val

      if reverse
        r = -1
      else
        r = 1

      return 1*r if av > bv
      return -1*r if bv > av
      return 0

    curSort = className

    for row in rows
      row.parentNode.removeChild row
      tbody.appendChild row
