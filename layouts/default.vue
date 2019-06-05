<template>
  <section class="page">
    <ui-menu />
    <nuxt />
  </section>
</template>

<script>
import UiMenu from '~/components/ui-menu.vue';

export default {
  components: { UiMenu },
};
</script>

<style lang="scss" src="@primer/css/index.scss" />

<style lang="scss" scoped>
.page {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
