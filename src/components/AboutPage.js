import MirrorPic from "../assets/tyler_mirror.jpg";
import BlurredPic from "../assets/tyler_blur.webp";
import Swirl from "../assets/Swirl.png";
import React, { useEffect, useState, useRef } from "react";

import gsap from "gsap";

import useIntersect from "../utils/useIntersect";
import { MaxEquation } from "three";

export default function AboutPage() {
  const [offset, setOffset] = useState(200);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    var textPath = document.querySelector("#text-path");
    textPath.setAttribute("startOffset", offset);
  });

  const ref = useRef();
  const onScreen = useIntersect(ref, "-100px");

  useEffect(() => {
    const DOM = {
      section: document.querySelector(".about-section"),
      get firstImage() {
        return this.section.querySelectorAll(".first-image");
      },
      get secondImage() {
        return this.section.querySelectorAll(".second-image");
      },
      get swirl() {
        return this.section.querySelectorAll(".swirl");
      },
      get rightPane() {
        return this.section.querySelectorAll(".right-pane");
      },
    };
    const tl = new gsap.timeline({ paused: true });
    tl.set(DOM.firstImage, { y: "-200", opacity: 0 })
      .set(DOM.secondImage, { x: "200", opacity: 0 })
      .set(DOM.swirl, { y: "200", x: "-100", opacity: 0 })
      .set(DOM.rightPane, { x: "100", opacity: 0 })

    tl.to(
      DOM.firstImage,
      2,
      {
        y: "0",
        opacity: 1,
        ease: "Power3.easeOut",
      },
      0
    )
      .to(
        DOM.secondImage,
        2,
        {
          x: "0",
          opacity: 1,
          ease: "Power3.easeOut",
        },
        0
      )
      .to(
        DOM.swirl,
        2,
        { y: "0", x: "0", opacity: 1, ease: "Power3.easeOut" },
        0
      );

    tl.staggerTo(
      DOM.rightPane,
      2,
      {
        x: 0,
        opacity: 1,
        ease: "slow",
      },
      0.2,
      0
    );
    if (visible) return;
    if (onScreen) {
      setVisible(onScreen);
      tl.play();
    }
  }, [visible, onScreen]);

  window.addEventListener("scroll", () => {
    requestAnimationFrame(function () {
      var textContainer = document.querySelector("#svg-container");
      var rect = textContainer.getBoundingClientRect();
      var scrollPercent = rect.y / window.innerHeight;
      setOffset((window.scrollY - window.innerHeight) / scrollPercent);
    });
  });

  return (
    <div>
      <div style={containerStyle} ref={ref} className="about-section">
        <div style={leftPane} className="fade-in">
          <div style={imageContainer}></div>
          <img style={firstImage} className="first-image" src={MirrorPic} />
          <img style={secondImage} className="second-image" src={BlurredPic} />
          <img style={swirl} src={Swirl} className="swirl" />
        </div>
        <div style={rightPane}>
          <div style={title} className="right-pane">
            ABOUT
          </div>
          <div style={bodyText} className="right-pane">
            Tyler Gregory Okonma (born March 6, 1991), better known as Tyler,
            the Creator, is an American rapper, singer, songwriter, record
            producer, music video director, actor, comedian, visual artist, and
            fashion designer. He rose to prominence in the early 2010s as the
            co-founder and de facto leader of alternative hip hop group Odd
            Future, and has performed on and produced songs for nearly every Odd
            Future release.
          </div>
        </div>
      </div>
      <div>
        <svg
          width="1"
          style={svgContainer}
          id="svg-container"
          viewBox="0 0 1000 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="curve"
            d="M0.5 107C55.3333 68.1666 200.7 -7.30002 343.5 1.49998C522 12.5 660 124.5 891 107C1122 89.5 1135.5 1.49998 1445.5 1.49998"
            fill="none"
          />

          <text
            dominantBaseline="hanging"
            style={movingText}
            y="40"
            fontSize="32"
          >
            <textPath id="text-path" href="#curve" startOffset="200">
              You live in my dream state{" "}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
const containerStyle = {
  height: "100vh",
  width: '100%',
  display: "flex",
  flexWrap: 'wrap'
};
/* Rectangle 2 */

const rightPane = {
  width: "50%",
  paddingTop: "15em",
  // paddingRight: "15em",
  float: "right",
  textAlign: "right",
};

const leftPane = {
  position: "relative",
  width: "40%",
  height: "80vh",
  display: "flex",
  top: 0,
  left: 0,
  // overflow: 'hidden'
};

const imageContainer = {

}

const title = {
  fontFamily: "roc-grotesk-extrawide, sans-serif",
  fontSize: "4em",
  opacity: 0,
};

const bodyText = {
  fontFamily: "roc-grotesk-wide, sans-serif",
  fontSize: "min(2rem, 1.5vw)",
  width: "80%",
  float: "right",
  opacity: 0,
};

const firstImage = {
  opacity: 0,
  width: "30rem",
  position: "absolute",
  top: "10em",
  left: "5em",
};
const secondImage = {
  opacity: 0,

  width: "20rem",
  left: '30rem',
  top: "25em",
  position: "absolute",
};
const swirl = {
  opacity: 0,
  position: "absolute",
  left: "25rem",
  top: "28em",
  width: "10rem",
};

const movingText = {
  fontFamily: "Otto Attac Type",
  letterSpacing: "0.2em",
  fontSize: "1em",
  // overflow: 'hidden',
};

const svgContainer = {
  position: "relative",
  top: "-20em",
  width: "100%",
  height: "50%",
};
