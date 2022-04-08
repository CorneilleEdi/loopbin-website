<template>
  <div
    class="flex h-screen justify-center items-center bg-white dark:bg-dark-high text-dark-high dark:text-white"
  >
    <topics-list :topics="topics" />
  </div>
</template>

<script>
import TopicsList from '~/components/TopicsList'

export default {
  name: 'IndexPage',
  components: { TopicsList },

  async asyncData({ $content }) {
    const posts = await $content('posts', { deep: true })
      .only(['topics'])
      .fetch()

    const topics = new Set()

    posts.forEach((post) => {
      post.topics.forEach((topic) => {
        topics.add(topic)
      })
    })

    return { topics: [...topics].sort() }
  },
}
</script>
