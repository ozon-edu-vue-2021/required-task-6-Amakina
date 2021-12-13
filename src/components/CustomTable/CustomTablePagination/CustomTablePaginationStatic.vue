<script lang="jsx">
import CustomTablePaginationButton from './CustomTablePaginationButton'
import CustomTablePaginationNumbers from './CustomTablePaginationNumbers'
export default {
  functional: true,
  name: 'CustomTablePaginationStatic',
  props: {
    totalPagesCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    },
  },
  render(h, context) {
    const { $style, listeners } = context
    const { currentPage, totalPagesCount, maxVisiblePages } = context.props
    
    return (
    <ul class={$style.pagination}>
      <CustomTablePaginationButton
        content='<<'
        pageToGo={0}
        on={{getNewPage: listeners.getNewPage}}
      />
      <CustomTablePaginationButton
        content='<'
        pageToGo={currentPage - 1} 
        on={{getNewPage: listeners.getNewPage}}
      />
      <CustomTablePaginationNumbers 
        totalPagesCount={totalPagesCount} 
        currentPage={currentPage} 
        maxVisiblePages={maxVisiblePages}
        on={{getNewPage: listeners.getNewPage}}
      />
      <CustomTablePaginationButton
        content='>'
        pageToGo={currentPage + 1} 
        on={{getNewPage: listeners.getNewPage}}
      />
      <CustomTablePaginationButton
        content='>>'
        pageToGo={totalPagesCount - 1}
        on={{getNewPage: listeners.getNewPage}}
      />
    </ul>
    )
  }
}
</script>

<style module>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
}
</style>