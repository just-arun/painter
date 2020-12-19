let path = `M660 267 L654 270 L648 273 L640 278 L633 282 L628 287 L622 292 L617 296 L613 300 L610 304 L608 307 L605 309 L603 312 L601 315 L600 318`

let dime = {
    x: 0,
    y: 0,
    w: 0,
    h: 0
};


let newPa = path.split(" ").filter((res) => {
    if (/[a-z]/i.test(res)) {
        return res;
    }
}).map((res) => {
    return Number(res.replace(/[a-z]/i, ''))
}).sort((x, y) => (x > y) ? 1 : -1);
let newPaY = path.split(" ").filter((res) => {
    if (!/[a-z]/i.test(res)) {
        return res;
    }
}).map((res) => {
    return Number(res.replace(/[a-z]/i, ''))
}).sort((x, y) => (x > y) ? 1 : -1);
dime.x = newPa[0];
dime.w = Math.abs(newPa[newPa.length - 1] - newPa[0]);
dime.y = newPaY[0];
dime.h = Math.abs(newPaY[newPaY.length - 1] - newPaY[0]);

console.log(newPa);
console.log(dime);
