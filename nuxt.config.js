import generateMeta from "./utils/meta.util";
import config from "./utils/config.util";

const siteUrl = config.baseUrl;

const generateSitemapRoutes = async () => {
  const routes = []
  const {$content} = require('@nuxt/content')
  const posts = await $content('posts', {deep: true}).fetch()

  for (const post of posts) {
    routes.push(`/tutos/${post.slug}`)
  }
  return routes
}
const meta = generateMeta();

export default {
  target: 'static',

  server: {
    host: '0.0.0.0',
  },
  head: {
    htmlAttrs: {
      lang: 'fr',
    },

    titleTemplate: '%s - Loopbin',
    title: 'Loopbin',

    meta: [
      ...meta,
      {name: "theme-color", media: "(prefers-color-scheme: light)", content: "white"},
      {name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#0c1518"},
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
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
      Inter: [400, 500, 700],
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
    fallback: true,
    async routes() {
      return await generateSitemapRoutes()
    },
  },

  build: {},
}
