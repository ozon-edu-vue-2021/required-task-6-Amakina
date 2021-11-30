<script lang="jsx">
export default {
  functional: true,
  name: 'CustomTablePagination',
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    sorters: {
      type: Array,
      default: () => ([])
    }
  },
  render(h, context) {
    const { columns, sorters }  = context.props
    const renderedColumns = columns.map(column => {
      const activeSorter = sorters.find(sorter => sorter.prop === column.prop) || { value: 'no' }
      
      const buttons = [
        { value: 'no', view: 'x'},
        { value: 'asc', view: '↑'},
        { value: 'desc', view: '↓'},
      ]

      const renderedButtons = buttons.map(({ value, view }) => (
        <button 
            class={[
              context.$style.sorter,
              {
                [context.$style.sorter_active]: activeSorter.value === value
              }
            ]} 
            on={{click: () => context.listeners.onSort(column.prop, value)}}
          >
            {view}
        </button>
      ))

      return (
        <td>
          <input 
            class={context.$style.filter} 
            placeholder={column.title}
            on={{input: (e) => context.listeners.onFilter(column.prop, e.target.value) }}
          />
          {...renderedButtons}
        </td>
      )
    }) 
    return (
      <tr>{...renderedColumns}</tr>
    )
  }
}
</script>

<style module>
.filter {
  width: calc(100% - 8em);
}

.sorter {
  width: 1.5em;
  height: 1.5em;
  line-height: 1em;
  font-size: 1em;
  margin: 0 0.25em;
}

.sorter_active {
  background: rgb(97, 65, 93);
  color: #fff;
}
</style>