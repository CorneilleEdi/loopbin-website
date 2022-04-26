<template>
  <div class="flex flex-wrap my-4">
    <div
      v-for="topic in topics"
      :key="topic"
      class="p-2 lg:w-1/6 md:w-1/4 w-1/2"
    >
      <nuxt-link :to="{ name: 'topics-id', params: { id: topic } }">
        <div
          class="h-full flex items-center p-2 rounded-sm hover:shadow-sm slick-border dark-text"
        >
          <div class="bg-dark-low p-3 mr-4 rounded-sm">
            <img
              class="mx-auto h-5 w-5 flex-shrink-0"
              :src="getImagePath(topic)" :alt="topic"
            />
          </div>
          <div class="flex-grow">
            <p class="font-medium">
              {{ topic }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicsList',

  props: {
    topics: {
      type: Array,
      require: true,
      default() {
        return []
      },
    },
  },

  methods: {
    getImagePath(name) {
      return require(`../assets/images/svg/techs/${name}.svg`)
    },
  },
}
</script>
