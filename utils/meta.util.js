export default (meta) => {
  return [
    {
      hid: 'title',
      name: 'title',
      content: (meta && meta.title) || 'Loopbin',
    },
    {
      hid: 'description',
      name: 'description',
      content: (meta && meta.description) || 'Les tutoriels et articles pour les fans de technologies et de programmation et de développement.',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: (meta && meta.url) || '',
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
      content: (meta && meta.description) || 'Les tutoriels et articles pour les fans de technologies et de programmation et de développement.',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: (meta && meta.image) || '',
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: (meta && meta.url) || '',
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
      content: (meta && meta.description) || 'Les tutoriels et articles pour les fans de technologies et de programmation et de développement.',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: (meta && meta.image) || '',
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@CorneilleEdi',
    },
  ]
}
