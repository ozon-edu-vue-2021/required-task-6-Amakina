<script lang="jsx">
export default {
  functional: true,
  name: 'CustomTablePaginationButton',
  props: {
    pageToGo: {
      type: Number,
      default: 0
    },
    isSelectedPage: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
  },
  render(h, context) {
    const { $style, listeners } = context
    const { isSelectedPage, pageToGo, content } = context.props
    
    return (
      <li 
        class={[
          $style.pagination__control, 
          { 
            [$style.pagination__control_selected]: isSelectedPage 
          }
        ]}
        on={{ click: () => listeners.getNewPage(pageToGo)}}
      >
        {content}
      </li>
    )
  }
}
</script>

<style module>
.pagination__control {
  width: 1.5em;
  height: 1.5em;
  padding: 0.5em;
  margin: 0 0.5em;
  line-height: 1.5em;

  cursor: pointer;

  background: #c2c2c2;
  border-radius: 5px;
}

.pagination__control_selected {
  background: rgb(97, 65, 93);
  color: #fff
}
</style>