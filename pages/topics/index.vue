<template>
  <div class="page-bg">
    <div class="container">
      <h3>Les sujets ({{ numberOfTopics }})</h3>
      <p class="mt-2">
        Un total de {{ numberOfPosts }} sur {{ numberOfTopics }} sujets
      </p>
      <topics-list :topics="topics"/>
    </div>
  </div>
</template>

<script>
import TopicsList from '~/components/TopicsList'
import generateMeta from "~/utils/meta.util";

export default {
  name: 'Topics',
  components: {TopicsList},
  head() {
    return {
      title: 'Topics',
      meta: generateMeta({
        title: "Topics",
      }),
    }
  },
  async asyncData({$content}) {
    const posts = await $content('posts', {deep: true})
      .only(['topics'])
      .fetch()

    const topics = new Set()

    posts.forEach((post) => {
      post.topics.forEach((topic) => {
        topics.add(topic)
      })
    })

    const numberOfTopics = topics.size
    const numberOfPosts = posts.length

    return {topics: [...topics].sort(), numberOfTopics, numberOfPosts}
  },
}
</script>

<style scoped></style>
