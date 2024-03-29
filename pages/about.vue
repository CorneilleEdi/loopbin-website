<template>
  <div class="page-bg">
    <div class="container">
      <div class="flex flex-col md:flex-row items-center">
        <img
          class="mx-auto h-40 w-40 md:h-56 md:w-56 flex-shrink-0 rounded-full bg-green dark:bg-green border border-dark-low"
          src="../assets/images/me-s.png"
          alt="profile"
        />
        <div class="mt-8 md:ml-8 md:mt-0 text-sm md:text-base">
          <h3>Hey 👋, salut</h3>
          <p class="mt-8">
            Je m'appelle
            <span class="hightlighted">Ayao Corneille ALLOGBALO</span> (Corneille Edi).
          </p>

          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li><p class="mt-4">
              Ingénieur Système et Cloud avec une forte affinité pour les fournisseurs de Cloud public (GCP, AWS, Azure)
              et une bonne expérience dans le domaine de l'applicatif.
            </p></li>
            <li><p class="mt-4">
              Je suis aussi la personne derrière le projet
              <span class="hightlighted">Loopbin</span>. Je maintiens ce site web. J'écris des tutoriels et des
              articles. Je fais aussi des Lives occasionnellement.
            </p></li>

            <li><p class="mt-4">
              J'ai commencé à m'intéresser au Cloud depuis 2019. Maintenant je suis certifié Google Cloud <span> <a
              class="underline"
              href="https://www.credential.net/ccfbc629-c59a-4160-8376-5be9f414c130" target="_blank">Associate Cloud Engineer</a></span>
              et
              <span>
              <a
                class="underline"
                href="https://google.accredible.com/95d7650d-6868-4ebe-abe0-dc12fead5380">Professional Cloud Architect.</a>
              </span>
              <span class="hightlighted"><a
                href="https://google.accredible.com/profile/ayaocorneilleallogbalo" target="_blank"
                class="underline">(Mon profile)</a></span>
            </p></li>

            <li><p class="mt-4">
              J'interviens dans <span class="hightlighted">la communauté togolaise des développeurs TDev </span> en tant
              que <span class="hightlighted">Lead Cloud</span>.
            </p></li>

            <li><p class="mt-4">
              Je suis l'un des coachs de la communauté <span class="hightlighted">Flutter Togo</span>, spécialisé en
              tout ce qui touche au backend.
            </p></li>

          </ul>


          <h6 class="mt-4 font-medium">Cursus</h6>
          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>Bachelor en Computer Science Engineering 🇮🇳</li>
            <li>Master en Ingénierie Systèmes et Logiciels 🇫🇷</li>
          </ul>

          <h6 class="mt-4 font-medium">Expériences professionnelles</h6>
          <ul class="mt-4 list-disc ml-4 md:ml-6">
            <li>Apprenti Ingénieur Public Cloud chez <span class="hightlighted"><a
              href="https://worldline.com/" target="_blank"
              class="underline">Worldline</a></span></li>
            <li>Ingénieur Système & Cloud chez <span class="hightlighted"><a
              href="https://worldline.com/" target="_blank"
              class="underline">Worldline</a></span></li>
          </ul>

        </div>
      </div>

      <about-contact-list/>

      <div class="mt-12 md:mt-16 flex flex-col md:flex-row md:justify-between  space-y-4 md:space-x-20">
        <div class="md:w-1/2">
          <h4 class="my-4">Profile Github</h4>
          <a href="https://github.com/CorneilleEdi" target="_blank">
            <img
              src="https://github-readme-stats.vercel.app/api?username=CorneilleEdi&&show_icons=true&title_color=0c1518&icon_color=0c1518&text_color=0c1518&bg_color=15DB95"
              alt="profile"
            />
          </a>
        </div>
        <div class="md:w-1/2">
          <h4 class="my-4">Badges</h4>
          <div class="flex space-x-2">
            <a href="https://www.credential.net/ccfbc629-c59a-4160-8376-5be9f414c130" target="_blank">
              <img src="../assets/images/gcp-ace-badge.png" alt="gcp ace" class="h-28 md:h-32 lg:h-44">
            </a>
            <a href="https://google.accredible.com/95d7650d-6868-4ebe-abe0-dc12fead5380" target="_blank">
              <img src="../assets/images/gcp-pca-badge.png" alt="gcp pca" class="h-28 md:h-32 lg:h-44">
            </a>
          </div>
        </div>
      </div>
      <div class="mt-12 md:mt-16">
        <h4>Mes Centres d'intérêts</h4>

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
                  <div class="bg-dark-low m-2 p-2 mr-4 rounded-sm">
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
import generateMeta from "~/utils/meta.util";

export default {
  name: 'About',
  data() {
    return {
      techs,
    }
  },
  head() {
    return {
      title: 'A propos',
      meta: generateMeta({
        title: "A propos",
      }),
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
