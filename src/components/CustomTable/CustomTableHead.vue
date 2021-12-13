<script lang="jsx">
export default {
  functional: true,
  name: 'CustomTableHead',
  props: {
    columnSettings: {
      type: Array,
      default: () => ([])
    },
  },
  render(h, context) {
    const { columnSettings } = context.props
    return columnSettings.map(column => {
      const titleToRender = column.scopedSlots.title ? column.scopedSlots.title() : column.title;
      return (
        <th>{titleToRender}</th>
      )
    })
  }
}
</script>