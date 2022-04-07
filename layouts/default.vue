<template>
  <div
    class="w-full bg-white dark:bg-dark-high text-dark-high dark:text-white"
    :class="$colorMode.preference === 'dark' ? 'dark' : ''"
  >
    <nav-bar />
    <Nuxt />
    <bottom-nav />
  </div>
</template>

<script>
import NavBar from '~/components/shared/NavBar.vue'
import BottomNav from '~/components/shared/BottomNav'

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Default',
  components: { BottomNav, NavBar },
}
</script>
