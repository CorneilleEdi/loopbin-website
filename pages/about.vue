<template>
  <div class="page-bg">
    <div class="container">
      <div class="flex flex-col md:flex-row items-center">
        <img
          class="mx-auto h-40 w-40 md:h-48 md:w-48 flex-shrink-0 rounded-full bg-green dark:bg-green border border-dark-low"
          src="../assets/images/me-s.png"
          alt="profile"
        />
        <div class="mt-8 md:ml-8 md:mt-0 text-sm md:text-base">
          <h3>Hey 👋, salut</h3>
          <p class="mt-8">
            Je m'appelle
            <span class="hightlighted">Corneille</span> ,étudiant en Ingénierie
            Informatique et je suis agé de 22 ans. Je suis un grand passionné de
            programmation et des nouvelles techs. J'adore tout ce qui touche au
            <span class="hightlighted"
              >developpement Web (specialement le backend)</span
            >, à l'architecture et au
            <span class="hightlighted">developpement Cloud</span>, à
            <span class="hightlighted">l'algorithmique 📊</span>, et au
            <span>backend engineering</span> ⚙️.
          </p>

          <p class="mt-4">
            Je suis aussi la personne derrière le projet
            <span class="hightlighted">Loopbin</span>. Je maintiens ce site web
            ,j'écris les tutoriels et je publie des articles.
          </p>

          <p class="mt-4">
            Je suis l'un des coachs de la communauté Flutter Togo, specialisé en
            tout ce qui est backend, testing et gestion de projet.
          </p>

          <p class="mt-4">
            Je suis le fondateur de la start-up
            <span class="hightlighted">BytesLabs</span>
            <!-- (<a
              href="https://byteslabs.dev"
              target="_blank"
              class="underline"
              >https://byteslabs.dev</a
            >)  -->
            dans laquelle moi et mes collègues traivaillont sur des projects de
            développement d'applications mobiles , de sites web et
            d'architecture de système Informatique.
          </p>
        </div>
      </div>

      <about-contact-list />

      <div class="mt-12">
        <h4 class="my-4">Profile Github</h4>
        <img
          src="https://github-readme-stats.vercel.app/api?username=CorneilleEdi&&show_icons=true&title_color=0c1518&icon_color=0c1518&text_color=0c1518&bg_color=15DB95"
          alt="profile"
        />
      </div>
      <div class="mt-12">
        <h4>Mes Centres d'interets</h4>

        <div class="my-4">
          <div
            v-for="tech in techs"
            :key="tech.title"
            class="w-full slick-border rounded-sm p-2 mb-5"
          >
            <p class="mx-2 text-gray-600">{{ tech.title }}</p>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
            >
              <div
                v-for="item in tech.techs"
                :key="item.title"
                class="p-2 w-full"
              >
                <div
                  class="h-full flex items-center slick-border rounded-sm hover:shadow-sm cursor-pointer"
                >
                  <div class="bg-dark-low m-2 p-2 mr-2 rounded-sm">
                    <img
                      class="mx-auto h-6 w-6 md:h-8 md:w-8 flex-shrink-0"
                      :src="getImagePath(item.image)"
                    />
                  </div>
                  <div class="flex-grow py-2 pr-2">
                    <p class="darker-text text-sm font-medium">
                      {{ item.name }}
                    </p>
                    <p class="dark-text text-xs">
                      {{ item.description || '' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import techs from '../assets/data/techs.json'

export default {
  name: 'About',
  data() {
    return {
      techs,
    }
  },
  methods: {
    getImagePath(name) {
      return require(`../assets/images/svg/techs/${name}`)
    },
  },
}
</script>

<style scoped></style>
