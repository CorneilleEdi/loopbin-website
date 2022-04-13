<template>
  <div>
    <h5 class="">Projets ({{ projects.length }})</h5>

    <div class="flex flex-wrap my-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="p-2 lg:w-1/3 md:w-1/2 w-full"
      >
        <div class="h-full flex flex-col slick-border p-6 rounded-sm">
          <div class="flex-grow">
            <p class="darker-text text-base sm:text-lg font-medium mb-2">
              {{ project.title }}
            </p>
            <p class="dark-text opacity-80 text-sm sm:text-base">
              {{ project.description || '' }}
            </p>

            <div class="flex flex-grow flex-wrap space-x-2 mt-2">
              <p
                v-for="tag in project.tags"
                :key="tag"
                class="mt-1 text-xs py-1 px-2 bg-dark-low dark:bg-dark dark:bg-opacity-50 slick-border rounded-sm dark-text"
              >
                {{ tag }}
              </p>
            </div>
          </div>
          <div class="flex">
            <div v-if="project.github" class="mt-6">
              <button
                class="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base flex items-center justify-center transition duration-500 ease-in-out hover:bg-dark-high hover:text-white focus:outline-none focus:shadow-outline dark-low-bg slick-border rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"
                  />
                </svg>

                <span class="ml-1 text-sm leading-5"
                  ><a :href="project.github" target="_blank">Github</a></span
                >
              </button>
            </div>
            <div v-if="project.preview" class="mt-6 ml-2">
              <button
                class="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base flex items-center justify-center transition duration-500 ease-in-out text-dark-high focus:outline-none focus:shadow-outline bg-green dark:bg-green rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"
                  />
                </svg>
                <span class="ml-1 text-sm leading-5"
                  ><a :href="project.preview" target="_blank">Preview</a></span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from '~/assets/data/projects.json'

export default {
  name: 'ProjectsList',

  data() {
    return { projects }
  },

  methods: {
    createClassTag(tag) {
      const tagsArray = tag.trim().split()

      if (tagsArray.length === 1 || tagsArray.length === 0) {
        return `tag-${tag}`
      } else {
        const newTag = tag.replace(/\s+/g, '-').toLowerCase()
        return `tag-${newTag}`
      }
    },
  },
}
</script>

<style scoped></style>
