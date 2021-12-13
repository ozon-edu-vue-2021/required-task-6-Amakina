<template>
  <div>
    <div class="table-controls">
      <button @click="enableInfiniteScroll">Infinite Scroll</button>
      <button @click="enableStaticPagination">Static pagination</button>
    </div>
    <CustomTable 
      :rows="rows"
      :sorters="sorters"
      @filter="onFilterSortColumn"
      @sort="onSortColumn"
    >
      <CustomTableColumn prop="postId" title="Post ID" />
      <CustomTableColumn prop="id" title="Comment ID" />
      <CustomTableColumn prop="name" title="Title" />
      <CustomTableColumn prop="email" title="Email">
        <template #body="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </CustomTableColumn>
      <CustomTableColumn prop="body" title="Post" />
    </CustomTable>
    <CustomTablePagination 
      :totalPagesCount="totalPagesCount"
      :perPage="perPage"
      :currentPage="currentPage"
      :useInfiniteScroll="isInfiniteScroll"
      @getPage="getPageByNumber"
    />
  </div>
</template>

<script>
import CustomTable from "./CustomTable";
import CustomTableColumn from "./CustomTableColumn";
import CustomTablePagination from './CustomTablePagination/CustomTablePagination';

const API_URL = 'https://jsonplaceholder.typicode.com/comments'

export default {
  name: "BaseWrapper",
  components: {
    CustomTable,
    CustomTableColumn,
    CustomTablePagination,
  },
  data() {
    return {
      // only cause jsonplaceholder doesn't provide proper filtering and sorting
      allData: [],
      rows: [],
      totalPagesCount: 0,
      perPage: 30,
      isInfiniteScroll: true,
      filters: [],
      sorters: [],
      currentPage: 0,
    };
  },
  watch: {
    loading(v) {
      if (!v) {
        this.awaiter()
      }
    }
  },
  async created() {
    await this.fetchAllRows()
    await this.getPageByNumber(0, this.perPage)
  },
  methods: {
    getPagesCount(rows) {
      return Math.ceil(rows.length / this.perPage)
    },
    async fetchAllRows() {
      const response = await fetch(API_URL);
      const json = await response.json()
      this.allData = json
      this.totalPagesCount = this.getPagesCount(json)
    },
    getPageByNumber(page) {
      if (page < 0 || page >= this.totalPagesCount) {
        return
      }
      
      this.currentPage = page

      this.fetchPage()
    },
    setDefaultSettings() {
      this.currentPage = 0
      this.rows = []
    },
    sortComparator(a, b, prop, dir, previousSorters = []) {      
      const [lesser, bigger] = dir === 'asc' ? [a, b] : [b, a]
      const isEqualBySorting = previousSorters.every(sorter => lesser[sorter] === bigger[sorter])
      if (!previousSorters.length || isEqualBySorting) {
        if (lesser[prop] > bigger[prop]) return 1
        if (lesser[prop] < bigger[prop]) return -1
      }
      return 0
    },
    escapeRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    },
    async fetchPage() {
      const start = this.currentPage * this.perPage
      const end = start + this.perPage

      let newRows = [...this.allData]
      this.filters.forEach(({ prop, value }) => {
        newRows = newRows.filter(element => {
          return new RegExp(this.escapeRegex(value), 'i').test(element[prop])
        })
      })

      const checkedSorters = []
      this.sorters.forEach(({ prop, value }) => {
        if (value === 'no') return
        newRows = newRows.sort((a, b) => this.sortComparator(a, b, prop, value, checkedSorters))
        checkedSorters.push(prop)
      })

      this.totalPagesCount = this.getPagesCount(newRows)

      newRows = newRows.slice(start, end)

      if (this.isInfiniteScroll) {
        this.rows = [...this.rows, ...newRows]
      } else {
        this.rows = newRows
      }
    },
    onFilterSortColumn(prop, value, isSort = false) {
      const arrayName = !isSort ? 'filters' : 'sorters'
      this[arrayName] = this[arrayName].filter(filter => filter.prop !== prop)
      this[arrayName].push({ prop, value })
      this.setDefaultSettings()

      this.fetchPage()
    },
    onSortColumn(prop, value) {
      this.onFilterSortColumn(prop, value, true)
    },
    enableInfiniteScroll() {
      this.isInfiniteScroll = true
      this.setDefaultSettings()
      this.fetchPage()
    },
    enableStaticPagination() {
      this.isInfiniteScroll = false
      this.setDefaultSettings()
      this.fetchPage()
    }
  }
};
</script>

<style scoped>
.table-controls {
  display: flex;
  margin: 0 0 1em 0;
  justify-content: center;
}
.table-controls button {
  margin: 0 1em;
}
</style>
