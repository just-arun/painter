import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Replace this with your project's endpoint
const GRAPHCMS_API = 'http://localhost:4000/graphql'

export default () => ({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache(),
  defaultHttpLink: false,
  cors: true,
  credentials: "include"
})
