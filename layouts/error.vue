<template>
  <div
    class="flex h-screen justify-center items-center bg-white dark:bg-dark-high text-dark-high dark:text-white"
  >
    <div v-if="error.statusCode === 404">
      <div class="flex text-11xl font-bold justify-center items-center">
        <p class="transform -rotate-45 mr-3 text-blue">4</p>
        <p class="transform rotate-6">0</p>
        <p class="transform rotate-12 text-green">4</p>
      </div>
      <p class="mt-24 text-center font-bold text-lg">
        Desole mais le page est introuvable.
      </p>
      <p class="mt-2 text-center">
        Ne pleurer pas, explorer les autres contenus disponibles.
      </p>

      <div class="mt-12 flex justify-center items-center">
        <nuxt-link to="/">
          <button
            class="px-6 py-3 bg-dark-high dark:bg-green hover:bg-green text-white rounded-sm"
          >
            Yay, explorer
          </button>
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <div
        class="flex text-8xl md:text-11xl font-bold justify-center items-center"
      >
        <p class="text-blue transform rotate-12">Oups!</p>
      </div>
      <p class="mt-16 md:mt-32 text-center font-bold text-lg">
        Une erreur s'est produite.
      </p>
      <p class="mt-2 text-center">
        Ne pleurer pas, explorer les autres contenus disponibles.
      </p>

      <div class="mt-12 flex justify-center items-center">
        <nuxt-link to="/">
          <button
            class="px-6 py-3 bg-dark-high dark:bg-green hover:bg-green text-white rounded-sm"
          >
            Yay, explorer
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'],
}
</script>
