<template>
  <div>
    <h3>Sujets disponibles</h3>
    <div class="flex flex-wrap my-4">
      <div
        v-for="topic in primaryTechs"
        :key="topic"
        class="p-1 lg:w-1/6 md:w-1/4 w-1/2"
      >
        <nuxt-link :to="{ name: 'topics-id', params: { id: topic } }">
          <div
            class="h-full flex items-center p-2 rounded-sm hover:shadow-sm slick-border dark-text"
          >
            <div class="bg-dark-low p-2.5 mr-4 rounded-sm">
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

    <h6 class="text-base font-medium">Autres</h6>

    <div class="flex flex-wrap my-2">
      <div
        v-for="topic in secondaryTechs"
        :key="topic"
        class="p-2 px-1"
      >
        <nuxt-link :to="{ name: 'topics-id', params: { id: topic } }">
          <div
            class="h-full flex items-center px-2 py-1 rounded-sm hover:shadow-sm slick-border dark-text"
          >
            <div class="flex-grow">
              <p class="font-medium">
                {{ topic }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import techs from '../assets/data/topics.json'

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
  data() {
    return {
      techs,
      primaryTechs: [],
      secondaryTechs: [],
    }
  },
  computed: {
    primaryCount() {
      return this.primaryTechs.length
    },
  },

  created() {
    this.splitTechList()
  },

  methods: {
    getImagePath(name) {
      return require(`../assets/images/svg/techs/${name}.svg`)
    },
    splitTechList() {

      let technos = []

      this.techs.forEach((tech) => {
        technos = [...technos, ...tech.techs]
      })

      this.topics.forEach((topic) => {
        // remove .svg extension and compare with techs.json
        const tech = technos.find((t) => t.image.split(".")[0] === topic)
        if (tech && tech.primary) {
          this.primaryTechs.push(topic)
        } else {
          this.secondaryTechs.push(topic)
        }
      })
    }
  },
}
</script>
