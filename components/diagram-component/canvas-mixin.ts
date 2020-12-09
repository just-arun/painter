import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class CanvasMixin extends Vue {
    canvas = {
        height: 0,
        width: 0,
    };

    matrix = {
        s: 1,
        b: 0,
        c: 0,
        tx: 0,
        ty: 0
    }

    scale = 100;

    @Watch("scale")
    updateMatrix() {
        this.matrix.s = this.scale / 100;
    }

    updateScale(e: number) {
        this.scale = e;
    }

    get matrixValue() {
        const {
            s, b,
            c, tx, ty
        } = this.matrix;
        return `matrix(${s} ${b} ${c} ${s} ${tx} ${ty})`;
    }

    mounted() {
        this.initCanvas();
        this.monitorResize(() => {
            this.initCanvas();
        })
    }

    monitorResize(cb: Function) {
        window.addEventListener("resize", () => {
            cb();
        })
    }

    initCanvas() {
        this.canvas = {
            height: innerHeight,
            width: innerWidth
        }
    }

}