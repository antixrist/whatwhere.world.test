<template>
  <div :class="$options.name">
    <div class="markdown-body">
      <table>
        <thead>
          <tr>
            <th class="no-pointer">
              №
            </th>
            <th @click="orderBy('name')">
              Город
              <ui-sorting-arrow field="name" :sortings="filters.sort" />
            </th>
            <th @click="orderBy('temperature')">
              Температура воздуха, &deg;C
              <ui-sorting-arrow field="temperature" :sortings="filters.sort" />
            </th>
            <th @click="orderBy('wind.speed')">
              Скорость ветра, м/с
              <ui-sorting-arrow field="wind.speed" :sortings="filters.sort" />
            </th>
            <th @click="orderBy('wind.direction')">
              Направление ветра
              <ui-sorting-arrow field="wind.direction" :sortings="filters.sort" />
            </th>
            <th @click="orderBy('pressure')">
              Давление, мм рт. ст.
              <ui-sorting-arrow field="pressure" :sortings="filters.sort" />
            </th>
            <th class="no-pointer">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(city, idx) in visibleCities"
            :key="idx + city"
          >
            <td>{{ startVisibleIdx + idx + 1 }}.</td>
            <td>{{ city.name }}</td>
            <td>{{ city.temperature }}</td>
            <td>{{ city.wind.speed }}</td>
            <td>{{ city.wind.direction }}</td>
            <td>{{ city.pressure }}</td>
            <td
              class="remove"
              @click="removeCity(city)"
            >
              &times;
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex flex-row flex-items-center / gutter">
      <div class="col- float-left">
        <ui-pagination
          :page="filters.page"
          :per-page="filters.perPage"
          :total="citiesLength"
          @change="filterBy({ page: $event })"
        />
      </div>
      <div
        v-if="citiesLength > visibleCities.length"
        class="col- float-left"
      >
        {{ visibleCities.length }} из {{ citiesLength }}
      </div>
    </div>

    <div>
      Показывать по
      <select
        :value="filters.perPage"
        class="form-select"
        @change="filterBy({ perPage: $event.target.value })"
      >
        <option :value="5" v-text="5" />
        <option :value="10" v-text="10" />
        <option :value="20" v-text="20" />
      </select>
    </div>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy';
import unzip from 'lodash/unzip';
import { mapState, mapMutations } from 'vuex';
import { serializeSorting } from '~/utils';
import UiPagination from '~/components/ui-pagination.vue';
import UiSortingArrow from '~/components/ui-sorting-arrow.vue';
import asyncData, { filtersDefaults } from './asyncData';

export default {
  name: 'page-index',
  components: {
    UiPagination,
    UiSortingArrow,
  },
  data: () => ({
    filters: null, // asyncData
  }),
  computed: {
    ...mapState('cities', { cities: 'list' }),

    citiesLength() {
      return this.cities.length;
    },

    startVisibleIdx() {
      return (this.filters.page - 1) * this.filters.perPage;
    },

    visibleCities() {
      const endIdx = this.startVisibleIdx + this.filters.perPage;
      const visibleCities = this.cities.slice(this.startVisibleIdx, endIdx);
      return orderBy(visibleCities, ...unzip(this.filters.sort));
    },
  },
  watchQuery: Object.keys(filtersDefaults),
  asyncData,
  methods: {
    ...mapMutations('cities', {
      removeCity: 'remove',
    }),

    filterBy(params = {}) {
      const filters = { ...this.filters, ...params };
      filters.sort = serializeSorting(filters.sort);

      this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, ...filters },
      });
    },

    orderBy(field) {
      const sort = [ ...this.filters.sort ];

      const fieldInSort = sort.find(([f]) => f === field);
      if (fieldInSort) {
        const idx = sort.indexOf(fieldInSort);
        const [, dir] = fieldInSort;
        if (dir === 'asc') {
          sort.splice(idx, 1, [field, 'desc']);
        } else {
          sort.splice(idx, 1);
        }
      } else {
        sort.push([field, 'asc']);
      }

      this.filterBy({ sort, page: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-index {

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
}

th {
  cursor: pointer;
  white-space: nowrap;

  &.no-pointer {
    cursor: default;
  }
}

.remove {
  cursor: pointer;
  vertical-align: middle;
}
</style>
