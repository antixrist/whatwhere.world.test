<template>
  <nav :class="$options.name" class="UnderlineNav">
    <div class="UnderlineNav-body">
      <router-link
        v-for="link in links"
        :key="link.href"
        :to="link.to"
        :exact="link.exact"
        active-class="selected"
        class="UnderlineNav-item"
        v-text="link.text"
      />
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ui-menu',
  data: () => ({
    links: [
      { to: { name: 'index' }, text: 'Все города', exact: true },
      { to: { name: 'add' }, text: 'Добавить город' },
    ],
  }),
};
</script>
