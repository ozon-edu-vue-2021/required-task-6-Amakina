<script lang="jsx">
import CustomTableFilterSorter from './CustomTableFilterSorter';
import CustomTableHead from './CustomTableHead'
import CustomTableBody from './CustomTableBody'

export default {
  functional: true,
  name: 'CustomTable',
  props: {
    rows: {
      type: Array,
      default: () => ([])
    },
    sorters: {
      type: Array,
      default: () => ([])
    }
  },
  render(h, context) {
    const { listeners, children } = context
    const { rows, sorters } = context.props
    const columnSettings = children
      .filter(slot => slot.componentOptions && slot.componentOptions.tag === 'CustomTableColumn')
      .map(column =>
        Object.assign({}, column.componentOptions.propsData, {
            scopedSlots: column.data.scopedSlots || {}
          }
        )
      )
      
    return (
      <div>
        <table>
          <thead>
            <CustomTableHead columnSettings={columnSettings}/>
          </thead>
          <CustomTableFilterSorter 
            columns={columnSettings}
            sorters={sorters}
            on={{
              onFilter: listeners.filter,
              onSort: listeners.sort
            }}
          />
          <tbody>
            <CustomTableBody columnSettings={columnSettings} rows={rows}/>
          </tbody>
        </table>
      </div>
    )
  }
}
</script>

<style module>
.table__cell {
  min-width: 120px;
  text-align: left;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>