<template>
  <div
    class="w-full bg-white dark:bg-dark-high text-dark-high dark:text-white"
    :class="$colorMode.preference === 'dark' ? 'dark' : ''"
  >
    <nav-bar/>
    <Nuxt class="pt-20 md:pt-24 min-h-screen"/>
    <search-modal v-if="showSearch"/>
    <bottom-nav/>
  </div>
</template>

<script>
import NavBar from '~/components/shared/NavBar.vue'
import BottomNav from '~/components/shared/BottomNav'
import events from "~/utils/events";

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Default',
  components: {BottomNav, NavBar},

  data() {
    return {
      showSearch: false,
    }
  },


  mounted() {
    this.$nuxt.$on(events.SEARCH.HIDE, () => {
      this.showSearch = false;
      this.document?.body.classList.remove("overflow-hidden");
    });

    this.$nuxt.$on(events.SEARCH.SHOW, () => {
      this.showSearch = true;
      this.document?.body.classList.add("overflow-hidden");
    });
  }
}
</script>
