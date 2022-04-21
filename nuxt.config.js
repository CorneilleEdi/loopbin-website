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
        hid: 'canonical',
        rel: 'canonical',
        href: siteUrl,
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
    '@nuxtjs/google-fonts',
    '@nuxtjs/google-analytics'
  ],

  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  content: {
    fullTextSearchFields: ['title', 'description', 'slug'],

    markdown: {
      prism: {
        // theme: 'prism-themes/themes/prism-material-oceanic.css',
        theme: false
      },
    },
  },

  googleFonts: {
    display: 'swap',
    families: {
      Poppins: [400, 500, 700],
    }
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
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
