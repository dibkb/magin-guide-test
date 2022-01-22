/**
CanvasGuide has methods that help display guides on a container
We assume that canvas and container overlaps
*/
class CanvasGuide {
  canvas;
  container;
  constructor(canvas, container) {
    this.canvas = canvas;
    this.container = container;
  }
  // helper function
  _calculateCords(orientation, length) {
    const X = Math.cos((orientation * Math.PI) / 180) * length;
    const Y = Math.sin((orientation * Math.PI) / 180) * length;
    return { X: X, Y: Y };
  }
  // helper function
  // orientation in degrees
  _drawLineGuide(top, left, orientation, length, color = "#000") {
    const ctx = this.canvas.getContext("2d");
    const coords = this._calculateCords(orientation, length);
    ctx.strokeStyle = color;
    ctx.moveTo(left, top);
    ctx.lineTo(left + coords.X, top + coords.Y);
    ctx.stroke();
  }
  drawVerticalLineGuide(top, left, height) {
    this._drawLineGuide(top, left, 90, height);
  }
  drawHorizontalLineGuide(top, left, width) {
    this._drawLineGuide(top, left, 0, width);
  }
  drawArrowHead(top, left, orientation, length, color = "#6ced21") {
    const ctx = this.canvas.getContext("2d");
    const coords = this._calculateCords(orientation, length);
    const coordsFirst = this._calculateCords(orientation + 135, 10);
    const coordsSecond = this._calculateCords(orientation - 135, 10);
    ctx.strokeStyle = color;
    const X = left + coords.X;
    const Y = top + coords.Y;
    ctx.moveTo(X, Y);
    ctx.lineTo(X + coordsFirst.X, Y + coordsFirst.Y);
    ctx.moveTo(X, Y);
    ctx.lineTo(X + coordsSecond.X, Y + coordsSecond.Y);
    ctx.stroke();
  }
  _drawArrowFeather(top, left, orientation) {
    this._drawLineGuide(top, left, orientation - 90, 10);
    this._drawLineGuide(top, left, orientation + 90, 10);
  }
  drawArrow(top, left, orientation, length) {
    this._drawLineGuide(top, left, orientation, length);
    // arrow feather
    this._drawArrowFeather(top, left, orientation);
    this.drawArrowHead(top, left, orientation, length);
  }
  drawChip(left, top, value) {
    const ctx = this.canvas.getContext("2d");
    ctx.font = "14px Arial";
    ctx.fillText(`${value} px`, top, left);
    ctx.fillStyle = "rgba(27, 150, 209, 0.50)";
    ctx.fillRect(top - 10, left - 20, 50, 30);
  }
  /**
  * type Area = {
  *               top: number,
                  left: number,
                  width: number,
                  height: number
  *             }
  */
  drawRectangle(top, left, width, height) {
    this.drawVerticalLineGuide(top, left, height);
    this.drawVerticalLineGuide(top, left + width, height);
    this.drawHorizontalLineGuide(top, left, width, color);
    this.drawHorizontalLineGuide(top + height, left, width);
  }
  drawShades(shadedArea, cutArea) {
    const ctx = this.canvas.getContext("2d");
    // draw shaded area
    let top = shadedArea.top;
    let left = shadedArea.left;
    for (let i = 0; i < shadedArea.height; ) {
      let length = i * Math.sqrt(2);
      let capLength = shadedArea.width * Math.sqrt(2);
      if (length > capLength) {
        length = capLength;
      }
      this._drawLineGuide(top + i, left, -45, length);
      i = i + 10;
    }
    for (let i = 0; i < shadedArea.width; ) {
      let length = (shadedArea.width - i) * Math.sqrt(2);
      let capLength = shadedArea.height * Math.sqrt(2);
      if (length > capLength) {
        length = capLength;
      }
      this._drawLineGuide(top + shadedArea.height, left + i, -45, length);
      i = i + 10;
    }
    // cut area
    ctx.clearRect(cutArea.x, cutArea.y, cutArea.width, cutArea.height);
  }
}

// experimentation code below
const container = document.getElementById("container");
const mycanvas = document.getElementById("mycanvas");
const canvasGuide = new CanvasGuide(mycanvas, container);
// rectangle 1
// canvasGuide.drawVerticalLineGuide(50, 50, 70);
// canvasGuide.drawVerticalLineGuide(50, 50 + 50, 70);
// canvasGuide.drawHorizontalLineGuide(50, 50, 50);
// canvasGuide.drawRectangle(50, 50, 400, 300);

canvasGuide.drawArrow(200, 900, 90, 200);
canvasGuide.drawArrow(70, 900, 120, 200);
canvasGuide.drawChip(100, 800, 50);
canvasGuide.drawShades(
  { top: 50, left: 50, width: 500, height: 300 },
  {
    x: 100,
    y: 150,
    width: 400,
    height: 160,
  }
);

// rectangle 2
// canvasGuide.drawVerticalLineGuide(50, 150, 50);
// canvasGuide.drawHorizontalLineGuide(50, 150, 70);
// canvasGuide.drawShades({ top: 50, left: 150, width: 70, height: 50 }, {});
// setTimeout(() => {
//   const container = document.getElementById("container");
//   container.style.height = "300px";
// }, 3000);
