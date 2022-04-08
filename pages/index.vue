<template>
  <div
    class="page-bg"
  >
    <div class="container">
     <div>
       <h3>Sujets disponibles</h3>
       <topics-list :topics="topics"/>
     </div>

     <div class="mt-8">
       <h3>Derniers posts</h3>
       <section class="space-y-4 mt-8">
         <post-item v-for="post in latestPosts" :key="post.slug" :post="post" />
       </section>
     </div>
    </div>
  </div>
</template>

<script>
import TopicsList from '~/components/TopicsList'
import PostItem from "~/components/PostItem";

export default {
  name: 'IndexPage',
  components: {PostItem, TopicsList},

  async asyncData({$content}) {
    const posts = await $content('posts', {deep: true})
      .only(['topics'])
      .fetch()


    const latestPosts = await $content('posts', {deep: true})
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

    const topics = new Set()

    posts.forEach((post) => {
      post.topics.forEach((topic) => {
        topics.add(topic)
      })
    })

    return {topics: [...topics].sort(), latestPosts}
  },
}
</script>
