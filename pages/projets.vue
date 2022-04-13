<template>
  <div class="page-bg">
    <div class="container">
      <projects-list />

      <meets-list />
    </div>
  </div>
</template>

<script>
import  generateMeta from '../utils/meta.util'
export default {
  name: 'Projets',
  head() {
    return {
      title: 'Projets',
      meta: generateMeta({
        title: "Projets",
      }),
    }
  },
}
</script>

<style scoped></style>
