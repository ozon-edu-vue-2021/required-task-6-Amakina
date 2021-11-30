<script lang="jsx">
export default {
  functional: true,
  name: 'CustomTablePaginationInfinite',
  props: {
    totalPagesCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
  },
  render(h, context) {
    const { $style, listeners } = context
    const { currentPage, totalPagesCount } = context.props

    if (currentPage + 1 === totalPagesCount) {
      return (<div></div>) 
    }

    const directives = [
      {
        name: 'CustomDetectViewportDirective',
        value: {
          callback: () => listeners.getNewPage(currentPage + 1),
        }
      }
    ];

    return (
      <div {...{ class: $style.pagination__infinite, directives }} />
    );
  }
}
</script>

<style module>
.pagination__infinite {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 1em auto;

  animation: colors 1s infinite;
}

@keyframes colors {
  0% {
    background: rgb(255, 255, 255);
  }
  100% {
    background: rgb(206, 206, 206);
  }
}
</style>