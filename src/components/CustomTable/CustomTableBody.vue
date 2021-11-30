<script lang="jsx">
export default {
  functional: true,
  name: 'CustomTableBody',
  props: {
    columnSettings: {
      type: Array,
      default: () => ([])
    },
    rows: {
      type: Array,
      default: () => ([])
    },
  },
  render(h, context) {
    const { $style } = context
    const { columnSettings, rows } = context.props
    return rows.map(row => 
      <tr>
      {
        ...columnSettings.map(column => {
          const columnToRender = column.scopedSlots.body
            ? column.scopedSlots.body({ row }) 
            : row[column.prop]
          return (
            <td class={$style.table__cell}>{columnToRender}</td>
          )
        })
      }
      </tr>
    )
  }
}
</script>

<style module>
.table__cell {
  min-width: 120px;
  text-align: left;
}
</style>