<script>
export default {
  name: 'CustomTableColumn',
  props: {
    prop: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  }
};
</script>
