let app = new Vue({
  el: "#app",
  data: {
    shapes: [{
        id: 0,
        x: 20,
        y: 20,
        height: 50,
        width: 50,
        link: []
      },
      {
        id: 1,
        x: 190,
        y: 20,
        height: 50,
        width: 50,
        link: [2, 4]
      },
      {
        id: 2,
        x: 80,
        y: 190,
        height: 50,
        width: 50,
        link: []
      },
      {
        id: 3,
        x: 290,
        y: 220,
        height: 50,
        width: 50,
        link: []
      },
      {
        id: 4,
        x: 490,
        y: 220,
        height: 50,
        width: 50,
        link: []
      },
    ],
    paths: [],
    canvas: {
      height: 700,
      width: 700
    },
    move: false
  },
  created() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    let path = this.createRect();
    this.paths = path.map(res => {
      return this.drawPath(
        res.from.x + (res.from.w / 2),
        res.from.y + (res.from.h / 2),
        res.to.x + (res.to.width / 2),
        res.to.y + (res.to.height / 2))
    });
    for (let i = 5; i < 8; i++) {
      // this.shapes.push({
      //     id: i,
      //     x: Math.floor(Math.random() * this.canvas.width),
      //     y:  Math.floor(Math.random() * this.canvas.height),
      //     height: 50,
      //     width: 50,
      //     link: [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)]
      // })
    }
  },
  watch: {
    shapes() {
      let path = this.createRect();
      this.paths = path.map(res => {
        return this.drawPath(
          res.from.x + (res.from.w / 2),
          res.from.y + (res.from.h / 2),
          res.to.x + (res.to.width / 2),
          res.to.y + (res.to.height / 2))
      });
    }
  },
  methods: {
    signum(x) {
      return (x < 0) ? -1 : 1;
    },
    absolute(x) {
      return (x < 0) ? -x : x;
    },
    mouseDown(id) {
      this.id = id;
      this.move = true;
    },
    mouseMove(e) {
      if (this.move) {
        this.shapes = this.shapes.map((res) => {
          let data = res;
          if (data.id == this.id) {
            data.x = e.clientX - 25;
            data.y = e.clientY - 25;
            return data;
          }
          return data;
        })
      }
    },
    mouseUp() {
      this.id = null,
        this.move = false;
    },
    drawPath(startX, startY, endX, endY) {
      const signum = (x) => {
        return (x < 0) ? -1 : 1;
      }
      const absolute = (x) => {
        return (x < 0) ? -x : x;
      }
      // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
      var stroke = 2;

      let startXR = startX;
      let startYR = startY;
      let endXR = endX;
      let endYR = endY;

      if ((startY > endY)) {
        startX = endXR;
        startY = endYR;
        endX = startXR;
        endY = startYR;
      }

      var deltaX = (endX - startX) * 0.15;
      var deltaY = (endY - startY) * 0.15;
      var delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);
      var arc1 = 0;
      var arc2 = 1;
      if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
      }
      // draw tha pipe-like path
      // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
      let path = "M" + startX + " " + startY +
        " V" + (startY + delta) +
        " A" + delta + " " + delta + " 0 0 " + arc1 + " " + (startX + delta * signum(deltaX)) + " " + (startY + 2 * delta) +
        " H" + (endX - delta * signum(deltaX)) +
        " A" + delta + " " + delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3 * delta) +
        " V" + endY;
      return path;
    },
    createRect() {
      let path = this.shapes.map(res => {
          if (!!res.link.length) {
            let ft = res.link.map((pa) => {
              return {
                from: {
                  x: res.x,
                  y: res.y,
                  h: res.height,
                  w: res.width,
                },
                to: this.shapes.find((res) => (res.id == pa))
              }
            });
            return ft;
          } else {
            return null;
          }
        }).filter(res => res)
        .reduce((p, n) => p.concat(n));
      return path;
    }
  }
})
