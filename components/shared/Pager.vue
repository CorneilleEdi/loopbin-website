<template>
  <div>
    <nav aria-label="Page navigation example">
      <div class="flex">
        <nuxt-link
          class="pager-item"
          :to="{ name: 'tutos', query: { page: 1 } }"
          :class="{ disabled: isInFirstPage }"
        >
          <p aria-hidden="true">First</p>
        </nuxt-link>
        <nuxt-link
          class="pager-item"
          :to="{
            name: 'tutos',
            query: { page: currentPage > 1 ? currentPage - 1 : 1 },
          }"
          :class="{ disabled: isInFirstPage }"
        >
          <p aria-hidden="true">&laquo;</p>
        </nuxt-link>

        <nuxt-link
          v-for="page in pages"
          :key="page.name"
          class="pager-item"
          :class="{ active: isPageActive(page.name) }"
          :to="{ name: 'tutos', query: { page: page.name } }"
          ><p>{{ page.name }}</p>
        </nuxt-link>

        <nuxt-link
          class="pager-item"
          :to="{
            name: 'tutos',
            query: {
              page: currentPage < totalPages ? currentPage + 1 : totalPages,
            },
          }"
          aria-label="Next"
          :class="{ disabled: isInLastPage }"
        >
          <p aria-hidden="true">&raquo;</p>
        </nuxt-link>

        <nuxt-link
          class="pager-item"
          :class="{ disabled: isInLastPage }"
          :to="{ name: 'tutos', query: { page: totalPages } }"
        >
          <p aria-hidden="true">Last</p>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxViewPage: {
      type: Number,
      default: 3,
      required: false,
    },
  },

  computed: {
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxViewPage + 1
      }
      return this.currentPage - 1
    },
    endPage() {
      return Math.min(this.startPage + this.maxViewPage - 1, this.totalPages)
    },
    pages() {
      const pageArr = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        pageArr.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }
      return pageArr
    },
  },
  watch: {
    '$route.query'(q) {
      if (q.page && q.page !== this.currentPage) {
        this.$emit('changed', q.page)
      }
    },
  },

  methods: {
    onFirstPage() {
      this.$emit('pageChanged', 1)
    },
    onPreviousPage() {
      if (this.currentPage > 1) {
        this.$emit('pageChanged', this.currentPage - 1)
      }
    },
    onCurrentPage(page) {
      this.$emit('pageChanged', page)
    },
    onNextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('pageChanged', this.currentPage + 1)
      }
    },
    onLastPage() {
      this.$emit('pageChanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>

<style scoped>
.pager-item {
  @apply border border-dark-low dark:border-white dark:border-opacity-20 text-dark dark:text-white px-3 py-1 md:px-5 md:py-3 cursor-pointer;
}

.pager-item:hover {
  @apply bg-dark-low dark:bg-dark;
}

.pager-item.active {
  @apply bg-blue font-bold text-white;
}

.pager-item.disabled {
  @apply opacity-70 cursor-not-allowed;
}

.pager-item.disabled:hover {
  @apply bg-transparent dark:bg-transparent;
}
</style>
