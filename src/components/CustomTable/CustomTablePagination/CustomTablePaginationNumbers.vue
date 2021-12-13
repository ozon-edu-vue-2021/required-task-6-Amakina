<script lang="jsx">
import CustomTablePaginationButton from './CustomTablePaginationButton'
export default {
  functional: true,
  name: 'CustomTablePaginationNumbers',
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
    const { listeners } = context
    const { currentPage, maxVisiblePages, totalPagesCount } = context.props
    const numberOfPagesToRender = Math.floor(Math.min(totalPagesCount, maxVisiblePages) / 2)
    const start = Math.max(0, Math.floor(currentPage + 1 - maxVisiblePages / 2))
    const end = Math.min(currentPage + numberOfPagesToRender, totalPagesCount - 1)
    const renderedPageNumbers = []
    for (let page = start; page <= end; page++) {
      renderedPageNumbers.push(
        <CustomTablePaginationButton 
          content={`${page+1}`} 
          pageToGo={page} 
          isSelectedPage={ page === currentPage}
          on={{getNewPage: listeners.getNewPage}}
        />
      )
    }
    return renderedPageNumbers
  }
}
</script>