<template>
  <div :class="$options.name" class="pagination">
    <span
      :class="{ disabled: isFirstPage }"
      class="previous_page"
      @click="go('first')"
    >&laquo;</span>
    <span
      :class="{ disabled: isFirstPage }"
      class="previous_page"
      @click="go('prev')"
    >&lsaquo;</span>

    <a
      v-for="num in pages"
      :key="num"
      :class="{'current selected': num === page}"
      @click.prevent="go(num)"
      v-text="num"
    />

    <span
      :class="{ disabled: isLastPage }"
      class="next_page"
      @click="go('next')"
    >&rsaquo;</span>
    <span
      :class="{ disabled: isLastPage }"
      class="next_page"
      @click="go('last')"
    >&raquo;</span>
  </div>
</template>

<script>
export default {
  name: 'ui-pagination',
  model: {
    prop: 'page',
    event: 'change',
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    pageLocal: 1,
  }),
  computed: {
    pages() {
      return Math.ceil(this.total / this.perPage) || 1;
    },
    isFirstPage() {
      return this.page === 1;
    },
    isLastPage() {
      return this.page === this.pages;
    },
  },
  watch: {
    page: {
      immediate: true,
      handler() {
        this.pageLocal = this.page;
      },
    },
    pageLocal(page) {
      if (page < 1) {
        return this.go('first');
      }
      if (page > this.pages) {
        return this.go('last');
      }

      this.$emit('change', this.pageLocal);
    },
    pages() {
      if (this.page > this.pages) {
        this.go('last');
      }
    },
  },
  methods: {
    go(num) {
      switch (num) {
        case 'first':
          this.pageLocal = 1;
          break;
        case 'prev':
        case 'previous':
          this.pageLocal -= 1;
          break;
        case 'next':
          this.pageLocal += 1;
          break;
        case 'last':
          this.pageLocal = this.pages;
          break;
        default:
          this.pageLocal = num;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-pagination {}
</style>
