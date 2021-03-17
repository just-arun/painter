export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'spa',
  head: {
    title: 'Data Painter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Under Construction' }
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
    '~/plugins/composition-api.js',
    // '~/plugins/vue-apollo.js'
  ],


  apollo: {
    // Sets up the apollo client endpoints
    clientConfigs: {
      // recommended: use a file to declare the client configuration (see below for example)
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
        credentials: "include"
      },
 
      // you can setup multiple clients with arbitrary names
      alternativeClient: {
        // required
        httpEndpoint: 'http://localhost:4000/graphql',
 
        // override HTTP endpoint in browser only
        browserHttpEndpoint: 'http://localhost:4000/graphql',
 
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'includes'
        },
 
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: 'ws://localhost:4000/sub',
 
        // LocalStorage token
        tokenName: 'apollo-token',
 
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false,
 
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false
      },
    },
    
  },

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
    '@nuxtjs/composition-api',
    "@nuxtjs/apollo"
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
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|gql|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
