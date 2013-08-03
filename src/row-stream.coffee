through = require 'through'

module.exports = RowStream = (columns) ->
  through (data) ->
    cells = columns.map (column) ->
      cell = {}

      cell.value = data[column.property]

      if column.className
        cell.className = column.className
      else
        cell.className = column.property

      cell.serialized = JSON.stringify cell.value

      if column.template
        cell.text = column.template cell.value, data
      else
        cell.text = cell.value

      return cell

    @emit 'data', {cells:cells, obj:data}