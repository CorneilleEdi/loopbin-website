import generateMeta from "./utils/meta.util";
import config from "./utils/config.util";

const siteUrl = config.baseUrl;
const generateSitemapRoutes = async () => {
  const routes = []
  const {$content} = require('@nuxt/content')
  const posts = await $content('posts', {deep: true}).fetch()

  for (const post of posts) {
    routes.push(`/posts/${post.slug}`)
  }
  return routes
}

export default {
  target: 'static',

  server: {
    host: '0.0.0.0',
  },

  head: {
    titleTemplate: '%s - Loopbin',
    title: 'Loopbin',
    description: "Les tutoriels et articles pour les fans de technologies et de programmation et de développement.",

    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      ...generateMeta({
        title: "Loopbin",
        description: "Les tutoriels et articles pour les fans de technologies et de programmation et de développement.",
      }),
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap',
      },
    ],
  },

  css: [
    './assets/styles/main.css',
    './assets/styles/typography.css',
    './assets/styles/content.scss',
  ],

  components: true,
  plugins: [],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
  ],

  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  content: {
    fullTextSearchFields: ['title', 'description', 'slug'],

    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  robots: config.inProduction ? [
    {
      UserAgent: '*',
      Allow: '/',
      Sitemap: `${siteUrl}/sitemap.xml`,
    }
  ] : [
    {
      UserAgent: '*',
      Disallow: '/',
    }
  ],

  sitemap: {
    hostname: siteUrl,
    gzip: true,
    routes: generateSitemapRoutes,
  },

  generate: {
    async routes() {
      return await generateSitemapRoutes()
    },
  },

  build: {},
}
