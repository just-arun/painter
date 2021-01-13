import VueSocketIO from 'vue-socket.io'
import Vue from 'vue';


Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:9000'),
}))
