<template>
  <div
    class="mt-2 p-1 border-dark-low dark:border-white dark:border-opacity-20 border rounded-sm hover:shadow-sm"
  >
    <nuxt-link
      :to="{ name: 'tutos-slug', params: { slug: post.slug } }"
      class="w-full"
      style="text-decoration: none"

    >
      <div class="p-2">
        <p class="text-dark-high dark:text-white font-medium my-0" style="margin-top: 0rem;margin-bottom: 0">
          {{ post.title }}
        </p>
        <p
          class=" text-sm leading-5 text-dark dark:text-white dark:text-opacity-80"
          style="margin-top: 0;margin-bottom: 0;font-size: small"
        >
          {{ post.description }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>

export default {
  name: 'PostItemWithId',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: {}
    }
  },
  async created() {
    const posts = await this.$content('posts', {deep: true})
      .where({slug: this.slug})
      .fetch()
      .catch(() => {
      })

    this.post = posts[0];

  }
}
</script>

<style scoped></style>
