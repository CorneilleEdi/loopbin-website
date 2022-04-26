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
                <path fill="none" d="M0 0h24v24H0z"/>
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
        <NuxtContent :document="post"/>
      </div>
      <div
        class="mt-6 md:mt-12 flex flex-col md:flex-row  justify-end  space-y-4 md:space-x-4 md:space-y-0"
        :class="{'justify-between':prevPost!==null&&nextPost!==null,
           'justify-start':prevPost!==null&&nextPost===null}">

        <div v-if="prevPost" class="slick-border slick-hover px-4 py-4 cursor-pointer text-sm">

          <nuxt-link
            :to="{ name: 'tutos-slug', params: { slug: prevPost.slug } }"
            class="flex flex-row flex-nowrap items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 dark-text">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="currentColor" d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
            </svg>
            <div>
              <p class="dark-text text-xs">Précedent</p>
              <p class="darker-text">{{ prevPost.title }}</p>
            </div>
          </nuxt-link>

        </div>
        <div v-if="nextPost" class="slick-border slick-hover px-4 py-4 cursor-pointer text-sm">
          <nuxt-link
            :to="{ name: 'tutos-slug', params: { slug: nextPost.slug } }"
            class="flex flex-row flex-nowrap items-center space-x-4">

            <div>
              <p class="dark-text text-xs">Prochain</p>
              <p class="darker-text">{{ nextPost.title }}</p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 dark-text">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="currentColor" d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
            </svg>
          </nuxt-link>

        </div>
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
  components: {ActionButton},
  async asyncData({$content, params, error}) {
    const posts = await $content('posts', {deep: true})
      .where({slug: params.slug})
      .fetch()
      .catch(() => {
        error({statusCode: 404, message: 'Page not found'})
      })

    let nextPosts = [];
    let prevPosts = [];
    let post;

    if (posts.length <= 0) {
      error({statusCode: 404, message: 'Page not found'})
    } else {
      post = posts[0];
      const ops = [];

      if (post.next) {
        ops.push($content('posts', {deep: true})
          .only([
            'slug',
            'title'
          ])
          .where({slug: post.next})
          .fetch())
      } else {
        ops.push(Promise.resolve([]))
      }


      if (post.prev) {
        ops.push($content('posts', {deep: true})
          .only([
            'slug',
            'title'
          ])
          .where({slug: post.prev})
          .fetch())

      } else {
        ops.push(Promise.resolve([]))
      }

      console.log(ops);


      [nextPosts, prevPosts] = await Promise.all(ops).catch(() => {
      })
    }


    return {
      post,
      prevPost: prevPosts.length > 0 ? prevPosts[0] : null,
      nextPost: nextPosts.length > 0 ? nextPosts[0] : null
    }
  },

  head() {
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
