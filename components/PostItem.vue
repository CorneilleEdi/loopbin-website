<template>
  <div
    class="h-full flex items-center border-dark-low dark:border-white dark:border-opacity-20 border rounded-sm hover:shadow-sm"
  >
    <nuxt-link :to="post.path" class="w-full" style="text-decoration: none">
      <div class="p-4">
        <p class="text-dark-high dark:text-white font-medium">
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
</template>

<script>
import { formatDate } from '~/utils/date.util'

export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    fDate(date) {
      return formatDate(date)
    },
  },
}
</script>

<style scoped></style>
