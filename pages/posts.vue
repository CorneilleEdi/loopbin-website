<template>
  <div
    class="bg-white dark:bg-dark-high text-dark-high dark:text-white pb-20 md:pb-12"
  >
    <div class="container">
      <h5 class="">Posts ({{ totalPosts }})</h5>

      <div class="flex flex-wrap my-4">
        <div v-for="post in posts" :key="post.slug" class="p-2 lg:w-1/2 w-full">
          <div
            class="h-full flex items-center border-dark-low dark:border-white dark:border-opacity-20 border rounded-sm hover:shadow-sm"
          >
            <nuxt-link
              :to="post.path"
              class="w-full"
              style="text-decoration: none"
            >
              <div class="p-4">
                <p class="text-dark-high dark:text-white">
                  {{ post.title }}
                </p>
                <p
                  class="mt-2 text-sm leading-5 text-dark dark:text-white dark:text-opacity-80"
                >
                  {{ post.description }}
                </p>
                <div class="flex flex-wrap items-center mt-2">
                  <div class="flex flex-grow mr-2">
                    <p
                      v-for="tag in post.tags"
                      :key="tag"
                      class="ml-2 mt-1 text-xs py-1 px-2 bg-dark-low dark:bg-dark dark:bg-opacity-50 border border-dark-low dark:border-dark rounded-sm text-gray-600"
                    >
                      #{{ tag }}
                    </p>
                  </div>

                  <p
                    v-if="post.date !== 'Invalid date'"
                    class="text-sm text-gray-400 mt-2 ml-2"
                  >
                    {{ fDate(post.date) }}
                  </p>
                </div>
              </div>
            </nuxt-link>
          </div>
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

export default {
  name: 'Posts',
  components: { Pager },
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
