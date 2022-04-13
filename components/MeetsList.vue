<template>
  <div>
    <h5 class="">Lives ({{ meets.length }})</h5>

    <div class="flex flex-wrap my-4">
      <div v-for="meet in meets" :key="meet.number" class="p-2 md:w-1/2 w-full">
        <div class="h-full flex flex-col slick-border p-6 rounded-sm">
          <div class="flex-grow">
            <p class="darker-text text-base sm:text-lg font-medium mb-2">
              {{ meet.title }}
            </p>
            <p class="dark-text opacity-80 text-sm sm:text-base">
              {{ meet.description || '' }}
            </p>
          </div>

          <div class="flex">
            <div class="mt-2">
              <button
                class="px-3 py-2 text-sm flex items-center justify-center transition duration-500 ease-in-out hover:bg-dark-high hover:text-white focus:outline-none focus:shadow-outline dark-low-bg slick-border"
              >
                <a
                  target="_blank"
                  :href="'https://meet.loopbin.dev/' + meet.code"
                  >details</a
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
import meets from '~/assets/data/meets.json'

export default {
  name: 'MeetsList',

  data() {
    return { meets: meets.reverse() }
  },
}
</script>

<style scoped></style>
