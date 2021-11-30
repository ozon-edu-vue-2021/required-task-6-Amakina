<script lang="jsx">
import CustomTablePaginationStatic from './CustomTablePaginationStatic'
import CustomTablePaginationInfinite from './CustomTablePaginationInfinite'
export default {
  functional: true,
  name: 'CustomTablePagination',
  props: {
    totalPagesCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10,
    },
    useInfiniteScroll: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 0
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  render(h, context) {
    const { listeners } = context
    const { totalPagesCount, currentPage, maxVisiblePages, useInfiniteScroll } = context.props
    return !useInfiniteScroll 
      ? (
        <CustomTablePaginationStatic 
          totalPagesCount={totalPagesCount}
          currentPage={currentPage}
          maxVisiblePages={maxVisiblePages}
          on={{getNewPage: listeners.getPage}}
        />
      )
      : (
        <CustomTablePaginationInfinite
          totalPagesCount={totalPagesCount}
          currentPage={currentPage}
          on={{getNewPage: listeners.getPage}}
        />
      )
  }
}
</script>