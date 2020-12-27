export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'static',
  head: {
    title: 'painter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/styles/style.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/composition-api.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-socket-io',
    '@nuxtjs/proxy',
    '@nuxtjs/composition-api'
  ],

  io: {
    // module options
    // sockets: [{
    //   name: 'main',
    //   url: 'http://localhost:8000'
    // }]
  },
  proxy: {
    '/api': {
      target: 'http://localhost:9000',
    },
  },

  env: {
    baseUrl: process.env.BASE_URL
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },

  privateRuntimeConfig: {
    apiSecret: process.env.BASE_URL
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
