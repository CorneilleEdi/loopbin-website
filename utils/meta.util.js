import config from './config.util';


const siteUrl = config.baseUrl;

export const simpleDescription = "Les tutoriels et articles pour les fans de technologies et de programmation et de développement."
export default (meta) => {
  return [
    {property: 'og:site_name', content: 'Loopbin'},
    {hid: 'og:type', property: 'og:type', content: 'website'},
    {
      hid: 'title',
      name: 'title',
      content: (meta && meta.title) || 'Loopbin',
    },
    {
      hid: 'description',
      name: 'description',
      content: (meta && meta.description) || simpleDescription,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: (meta && meta.url) || siteUrl,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: (meta && meta.title) || 'Loopbin',
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'article',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: (meta && meta.description) || simpleDescription
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: (meta && meta.image) || `${siteUrl}/images/logo/logo.png`,
    },
    {property: 'og:image:width', content: '1240'},
    {property: 'og:image:height', content: '545'},
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: (meta && meta.url) || siteUrl,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: (meta && meta.title) || 'Loopbin',
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: (meta && meta.description) || simpleDescription
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: (meta && meta.image) || `${siteUrl}/images/logo/logo-small.png`,
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@CorneilleEdi',
    },
  ]
}
