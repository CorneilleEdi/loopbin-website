<template>
  <div>
    <transition name="slide-in-up">
      <div
        role="dialog"
        class="flex w-full fixed z-50 left-0 top-0 h-screen  bg-light-dark antialiased overflow-auto"
      >
        <div
          class=" md:w-2/3 mx-auto "

        >
          <div class="relative h-full md:h-auto w-full">
            <div class="w-full px-8 py-4 md:px-16 md:py-8  h-full md:h-auto">
              <div class="text-lg mb-5">
                <!--              <div class="flex w-full justify-center items-center">
                  <i class="ri-mail-line text-6xl p-0 font-regular"></i>
                </div>-->
                <div class="mt-4">
                  <div class=" mb-4">
                    <div class="mb-8 flex space-x-4 items-center justify-between dark-text">
                      <h3 class=" font-bold text-2xl">
                        Recherche
                      </h3>

                      <div class="cursor-pointer slick-hover p-2 rounded-full" @click="closeDialog">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path
                            fill="currentColor"
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/>
                        </svg>
                      </div>

                    </div>

                    <input
                      id="modal_search_input"
                      v-model="query" type="search" autocomplete="off"
                      placeholder="Recherche"
                      class="slick-border px-6 py-3 md:py-4 w-full shadow-sm border-dark bg-light-dark-low"
                    />
                    <p class="mt-2 text-xs md:text-sm dark-text ">
                      Recherchez les posts par titre ou description
                    </p>
                  </div>
                </div>

              </div>

              <div class="">

                <section class="space-y-4 mt-8">
                  <post-item
                    v-for="post in posts"
                    :key="post.slug"
                    :post="post"
                  />
                </section>
              </div>
            </div>
          </div>


        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import events from "~/utils/events";

export default {
  name: "SearchModal",
  data() {
    return {
      query: '',
      posts: []
    }
  },
  watch: {
    async query(query) {
      if (!query || query?.trim().length < 4) {
        this.posts = []
        return
      }

      this.posts = await this.$content('posts', {deep: true})
        .only(['slug',
          'title',
          'description',
          'date',
          'path',
          'tags', 'topics',])
        .sortBy('date', 'desc')
        .search('title', query.trim())
        .fetch()

      // Searching on the indexed fields returning some strange results.
      // I had to limit the search to the title for now
    },
    $route(){
      this.closeDialog();
    }
  },
  methods: {
    closeDialog() {
      this.$nuxt.$emit(events.SEARCH.HIDE)
    }
  }
}
</script>

<style scoped>

</style>
