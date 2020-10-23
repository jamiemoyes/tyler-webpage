import React, { Component } from "react";

export class Cursor extends Component {
  constructor() {
    super();
    this.coordinates = { x: -100, y: -100 };
    this.lastX = 0;
    this.lastY = 0;
    this.isStuck = false;
    this.stuckX = 0;
    this.stuckY = 0;
    this.innerCursor = null;
    this.canvasCursor = null;
    this.links = [];
  }

  componentDidMount() {
    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b;
    };
    const initCursor = () => {
      this.innerCursor = document.querySelector(".cursor--small");
      this.canvasCursor = document.querySelector(".cursor--canvas");
      const render = () => {
        if (!this.isStuck) {
          this.lastX = lerp(this.lastX, this.coordinates.x, 0.2);
          this.lastY = lerp(this.lastY, this.coordinates.y, 0.2);
          this.canvasCursor.style.left = `${this.lastX}px`;
          this.canvasCursor.style.top = `${this.lastY}px`;
        } else if (this.isStuck) {
          this.lastX = lerp(this.lastX, this.stuckX, 0.2);
          this.lastY = lerp(this.lastY, this.stuckY, 0.2);
          this.canvasCursor.style.left = `${this.lastX}px`;
          this.canvasCursor.style.top = `${this.lastY}px`;
        }

        requestAnimationFrame(render);
      };
      document.addEventListener("mousemove", (e) => {
        this.innerCursor.style.left = `${this.coordinates.x}px`;
        this.innerCursor.style.top = `${this.coordinates.y}px`;
        
        requestAnimationFrame(render);
        this.coordinates.x = e.clientX;
        this.coordinates.y = e.clientY;
      });
    };
    const initEvents = () => {
      let prevWidth = this.canvasCursor.style.width;
      const handleMouseDown = (e) => {
        prevWidth = this.canvasCursor.style.width;

        this.canvasCursor.style.width = "2em";
        this.canvasCursor.style.height = "2em";
      };
      const handleMouseUp = (e) => {
        this.canvasCursor.style.width = prevWidth;
        this.canvasCursor.style.height = "3rem";
      };
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
    };
    const initHovers = () => {
      this.links = document.querySelectorAll(".link");

      const handleMouseEnter = (e) => {
        this.innerCursor.style.opacity = 0;
        const navItem = e.currentTarget;
        const navItemBox = navItem.getBoundingClientRect();
        this.stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
        this.stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
        this.isStuck = true;
        console.log("Nav width = " + navItemBox.width);
        this.canvasCursor.style.width = `${navItemBox.width}px`;
      };

      const handleMouseLeave = (e) => {
        this.canvasCursor.style.width = "3rem";
        this.innerCursor.style.opacity = 1;
        this.isStuck = false;
      };

      this.links.forEach((e) =>
        e.addEventListener("mouseenter", handleMouseEnter)
      );
      this.links.forEach((e) =>
        e.addEventListener("mouseleave", handleMouseLeave)
      );
    };
    initCursor();
    initEvents();
    initHovers();
  }
  render() {
    return (
      <div>
        <div class="cursor cursor--small"></div>
        <canvas class="cursor cursor--canvas"></canvas>
      </div>
    );
  }
}

export default Cursor;

// export function Cursor() {
//   const coordinates = { x: -100, y: -100 };
//   let lastX = 0;
//   let lastY = 0;
//   let isStuck = false;
//   let showCursor = false;
//   let group, stuckX, stuckY, fillOuterCursor;
//   let innerCursor;
//   let canvasCursor;
//   let links;

//   return (
//     <div>
//       <div class="cursor cursor--small"></div>
//       <canvas class="cursor cursor--canvas"></canvas>
//     </div>
//   );
// }

// export default Cursor;
