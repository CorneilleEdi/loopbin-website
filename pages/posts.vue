<template>
  <div class="page-bg">
    <div class="container">
      <h5 class="">Posts ({{ totalPosts }})</h5>

      <div class="flex flex-wrap my-4">
        <div v-for="post in posts" :key="post.slug" class="p-2 lg:w-1/2 w-full">
          <post-item :post="post" />
        </div>
      </div>

      <div class="w-full flex justify-center items-center">
        <pager
          :current-page="actualPage"
          :total="totalPosts"
          :total-pages="numberOfPages"
          :max-view-page="numberOfPages"
          @changed="onPageChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pager from '~/components/shared/Pager'
import { formatDate } from '~/utils/date.util'
import PostItem from '~/components/PostItem'

export default {
  name: 'Posts',
  components: { PostItem, Pager },
  async asyncData({ $content, query, redirect }) {
    const actualPage = parseInt(query?.page ?? '1')

    const totalPosts = (await $content('posts', { deep: true }).fetch()).length

    const perPage = 14
    const numberOfPages = Math.ceil(totalPosts / perPage)

    const hasMorePage = actualPage < numberOfPages

    const lastPageCount =
      totalPosts % perPage !== 0 ? totalPosts % perPage : totalPosts - perPage

    // redirect to page 1 if  query.page > numberOfPages

    if (!query.page || query.page <= 0 || query.page > numberOfPages) {
      redirect('/posts/?page=1')
    }

    const skipNumber = () => {
      if (actualPage === 1) {
        return 0
      }
      if (actualPage === numberOfPages) {
        return totalPosts - lastPageCount
      }

      return (actualPage - 1) * perPage
    }

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
      .skip(skipNumber())
      .limit(perPage)
      .fetch()

    return {
      posts,
      totalPosts,
      numberOfPages,
      actualPage,
      hasMorePage,
      perPage,
      lastPageCount,
    }
  },
  methods: {
    fDate(date) {
      return formatDate(date)
    },
    async onPageChanged(page) {
      this.actualPage = page

      const skipNumber = () => {
        if (this.actualPage === 1) {
          return 0
        }
        if (this.actualPage === this.numberOfPages) {
          return this.totalPosts - this.lastPageCount
        }

        return (this.actualPage - 1) * this.perPage
      }

      this.posts = await this.$content('posts', { deep: true })
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
        .skip(skipNumber())
        .limit(this.perPage)
        .fetch()

      window.scrollTo(0, 0)
    },
  },
}
</script>

<style scoped></style>
