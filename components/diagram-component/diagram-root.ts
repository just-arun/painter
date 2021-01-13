import { Vue, Component } from 'vue-property-decorator'
import { Socket } from 'socket.io-client'


@Component({})
export default class DiagramRoot extends Vue {
    socket!: Socket;
}