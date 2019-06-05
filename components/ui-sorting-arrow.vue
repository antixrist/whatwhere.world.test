<template>
  <span
    v-if="isVisible"
    :class="$options.name"
  >
    <template v-if="dir === 'asc'">&uarr;</template>
    <template v-else-if="dir === 'desc'">&darr;</template>
    <template v-else>&uarr;&darr;</template>
  </span>
</template>

<script>
export default {
  name: 'ui-sorting-arrow',
  props: {
    field: {
      type: String,
      required: true,
    },
    sortings: {
      type: Array,
      default: () => ([]),
    },
    hideUnsorted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isVisible() {
      return !this.hideUnsorted || this.dir;
    },
    dir() {
      const sort = this.sortings.find(([field]) => field === this.field);
      return sort ? sort[1] : null;
    },
  },
};
</script>
