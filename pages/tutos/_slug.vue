<template>
  <div class="page-bg">
    <div class="container-small">
      <div class="w-full">
        <h3 class="my-2 dark-text">{{ post.title }}</h3>
        <p class="mt-2 mb-4 md:mb-8 dark-text">{{ post.description }}</p>
      </div>

      <!--      <div class="w-full ">
              <NuxtContent :document="post"/>
            </div>-->
      <div class="slick-border h-auto p-4 rounded-sm toc">
        <p class="text-base lg:text-xl font-medium mb-2">Sommaire</p>
        <li
          v-for="link of post.toc"
          :key="link.id"
          :class="{
            'toc-deep-2': link.depth === 2,
            'toc-deep-3': link.depth === 3,
          }"
        >
          <NuxtLink :to="`#${link.id}`" active-class="text-blue" class="flex">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5 items-center mr-1"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
                />
              </svg>
            </span>

            {{ link.text }}
          </NuxtLink>
        </li>
      </div>
      <div class="w-full">
        <NuxtContent :document="post" />
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from '~/components/ActionButton'
import generateMeta from "~/utils/meta.util";

export default {
  name: 'Tuto',
  // eslint-disable-next-line vue/no-unused-components
  components: { ActionButton },
  async asyncData({ $content, params, error }) {
    const post = await $content('posts', { deep: true })
      .where({ slug: params.slug })
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    if (post.length <= 0) {
      error({ statusCode: 404, message: 'Page not found' })
    }

    return { post: post[0] }
  },

  head(){
    return {
      title: this.post.title,
      description: this.post.description,
      meta: generateMeta({
        title: this.post.title,
        description: this.post.description,
      }),
    }
  },
}
</script>

<style scoped></style>
