import React, { Component } from "react";
import { gsap } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

export class AnimatedTitle extends Component {
  constructor(props) {
    super(props);
    this.DOM = null;
    this.timeline = null;

    this.timelineSettings = null;
  }

  componentDidMount() {

    Splitting();


    console.log(
      "chars = " +
        document.querySelectorAll(
          ".content__paragraph .word > .char, .whitespace"
        )
    );

    this.DOM = {
      content: {
        home: {
          section: document.querySelector(".content__item--home"),
          get chars() {
            return this.section.querySelectorAll(
              ".content__paragraph .word > .char, .whitespace"
            );
          },
          isVisible: true,
        },
        about: {
          section: document.querySelector(".content__item--about"),
          get chars() {
            return this.section.querySelectorAll(
              ".content__paragraph .word > .char, .whitespace"
            );
          },
          isVisible: false,
        },
      },
      links: {
        about: {
          anchor: document.querySelector("a.frame__about"),
          get stateElement() {
            return this.anchor.children;
          },
        },
        home: document.querySelector("a.frame__home"),
      },
    };
    this.timelineSettings = {
      staggerValue: 0.014,
      charsDuration: 0.5,
    };

 this.timeline = gsap
  .timeline({ paused: true })
  .addLabel("start")
  // Stagger the animation of the home section chars
  .staggerTo(
    this.DOM.content.home.chars,
    this.timelineSettings.charsDuration,
    {
      ease: "Power3.easeIn",
      y: "-100%",
      opacity: 0,
    },
    this.timelineSettings.staggerValue,
    "start"
  )
  // Here we do the switch
  // We need to toggle the current class for the content sections
  .addLabel("switchtime")
  .add(() => {
    this.DOM.content.home.section.classList.toggle("content__item--current");
    this.DOM.content.about.section.classList.toggle("content__item--current");
  })
  // Change the body's background color
  .to(
    document.body,
    {
      duration: 0.8,
      ease: "Power1.easeInOut",
      backgroundColor: "#c3b996",
    },
    "switchtime-=timelineSettings.charsDuration/4"
  )
  // Start values for the about section elements that will animate in
  .set(
    this.DOM.content.about.chars,
    {
      y: "100%",
    },
    "switchtime"
  )
  .set(
    this.DOM.content.about.picture,
    {
      y: "40%",
      rotation: -4,
      opacity: 0,
    },
    "switchtime"
  )
  // Stagger the animation of the about section chars
  .staggerTo(
    this.DOM.content.about.chars,
    this.timelineSettings.charsDuration,
    {
      ease: "Power3.easeOut",
      y: "0%",
    },
    this.timelineSettings.staggerValue,
    "switchtime"
  )
  // Finally, animate the picture in
  .to(
    this.DOM.content.about.picture,
    0.8,
    {
      ease: "Power3.easeOut",
      y: "0%",
      opacity: 1,
      rotation: 0,
    },
    "switchtime+=0.6"
  );

    const switchContent = () => {
      console.log("Switching content");
      this.DOM.links.about.stateElement[0].classList[
        this.DOM.content.about.isVisible ? "add" : "remove"
      ]("frame__about-item--current");


      // links for state 2/2, makes them visible
      this.DOM.links.about.stateElement[1].classList[
        this.DOM.content.about.isVisible ? "remove" : "add"
      ]("frame__about-item--current");
      console.log("Starting timeline");
      this.timeline[this.DOM.content.about.isVisible ? 'reverse' : 'play']();

      this.DOM.content.about.isVisible = !this.DOM.content.about.isVisible;
      this.DOM.content.home.isVisible = !this.DOM.content.home.isVisible;
    };

    this.DOM.links.about.anchor.addEventListener("click", () =>
      switchContent()
    );
    this.DOM.links.home.addEventListener("click", () => {
      console.log("Clicked home");
      if (this.DOM.content.home.isVisible) return;
      switchContent();
    });

  }

  render() {
    return (
      <div>
        <div className="frame">
          <a className="frame__home" href="#">
            <span className="frame__home-title">JF</span>
            <span className="frame__home-sub">2020</span>
          </a>
          <a className="frame__about" href="#">
            <span className="frame__about-item frame__about-item--current">
              About
            </span>
            <span className="frame__about-item">Close</span>
          </a>
        </div>
        <section className="content__item content__item--home content__item--current">
          <p className="content__paragraph" data-splitting="">
            Something
          </p>
          <p className="content__paragraph" data-splitting="">
            More
          </p>
          ...
        </section>
        <section className="content__item content__item--about">
          <p className="content__paragraph" data-splitting="">
            Something
          </p>
          <p className="content__paragraph" data-splitting="">
            Else
          </p>
          ...
        </section>
      </div>
    );
  }
}

export default AnimatedTitle;
