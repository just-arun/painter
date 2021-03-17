import ApolloClient from 'apollo-client';
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

const GRAPHCMS_API = 'http://localhost:4000/graphql'

Vue.use(new VueApollo({
    
}));
