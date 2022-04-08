<template>
  <div
    class="flex h-screen justify-center items-center bg-white dark:bg-dark-high text-dark-high dark:text-white"
  >
    <ul class="container">
      <li v-for="post in posts" :key="post.date">
        {{ post.title }}
        {{ post.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const posts = await $content('posts', { deep: true })
      .only([
        'title',
        'description',
        'date',
        'path',
        'tags',
        'topics',
        'path',
        'dir',
      ])
      .sortBy('date', 'desc')
      .limit(10)
      .fetch()

    return { posts }
  },
}
</script>
