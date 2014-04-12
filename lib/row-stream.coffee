through = require 'through'
module.exports = RowStream = (columns) ->
  through (data) ->

    cells = columns.map (column) ->
      cell = {}

      if typeof column.property is 'function'
        cell.value = column.property data
      else
        cell.value = data[column.property]

      if column.className
        cell.className = column.className
      else
        cell.className = column.property

      if cell.value?
        cell.serialized = JSON.stringify cell.value
      else
        cell.serialized = "null"

      if column.template
        cell.text = column.template cell.value, data
      else
        cell.text = cell.value

      return cell

    @emit 'data', {cells:cells, obj:data}
