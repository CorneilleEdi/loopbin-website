<template>
  <div class="page-bg">
    <div class="container">
      <section class="text-dark mb-12">
        <div class="h-full flex items-center slick-border p-2 rounded-sm">
          <div class="bg-dark-low p-4 mr-4 rounded-sm">
            <img
              class="mx-auto h-16 w-16 lg:w-24 flex-shrink-0"
              :src="getImagePath(techno.image)"
            />
          </div>
          <div class="flex-grow">
            <h4 class="darker-text">
              {{ techno.name }}
            </h4>
            <p class="dark-text">
              {{ techno.description || '' }}
            </p>
          </div>
        </div>
      </section>

      <h4 class="mb-4">Tutos ({{ posts.length }})</h4>

      <section class="space-y-4">
        <post-item v-for="post in posts" :key="post.slug" :post="post"/>
      </section>
    </div>
  </div>
</template>

<script>
import techs from 'assets/data/topics.json'
import PostItem from '~/components/PostItem'
import generateMeta from "~/utils/meta.util";

export default {
  name: 'TopicsDetails',
  components: {PostItem},

  head() {
    return {
      title: this.$data.techno.name,
      meta: generateMeta({
        title: this.$data.techno.name,
      }),
    }
  },
  async asyncData({$content, params, error}) {
    const id = params.id
    let techId

    if (id === 'gcp') {
      techId = 'google cloud'
    } else {
      techId = id
    }
    let techno
    techs.forEach((tech) => {
      const t = tech.techs.find((t) => t.name.toLowerCase() === techId)

      if (t) {
        techno = t
      }
    })

    if (!techno) {
      error({statusCode: 404})
    }

    const posts = await $content('posts', {deep: true})
      .only([
        'slug',
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
      .where({topics: {$contains: id}})
      .fetch()
    return {techno, posts}
  },

  methods: {
    getImagePath(name) {
      return require(`../../assets/images/svg/techs/${name}`)
    },
  },
}
</script>

<style scoped></style>
