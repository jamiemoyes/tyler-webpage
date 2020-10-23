import React, { Component } from "react";
import { TimelineMax } from "gsap";
export class AlbumWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksShowing: false,
    };
    this.DOM = {
      section: {},
      title: {},
      images: [],
    };
    this.observer = null;
    this.timeline = null;
    this.onScreen = false;
  }

  componentDidMount() {
    // this.ref = useRef();
    // this.onScreen = useIntersect(this.ref, "-100px");
    // this.DOM = {
    //   section: document.querySelector(".album-container"),
    //   get title() {
    //     return this.section.querySelectorAll(".album-title");
    //   },
    //   get images() {
    //     return this.section.querySelectorAll(".image-row");
    //   },
    // };
    this.timeline = new TimelineMax({ paused: true });

    this.timeline
      .set(this.DOM.title, {
        x: -100,
        y: -100,
        opacity: 0,
      })
      .set(this.DOM.images, {
        x: 100,
        y: 200,
        opacity: 0,
      })
      .to(
        this.DOM.title,
        1,
        {
          x: 0,
          y: 0,
          opacity: 1,
          ease: "Power3.easeIn",
        },
        0
      )
      .staggerTo(
        this.DOM.images,
        1,
        {
          x: 0,
          y: 0,
          opacity: 1,
          ease: "Power3.easeIn",
        },
        0.2,
        0
      );

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!this.onScreen) {
            this.timeline.play();
            this.onScreen = true;
          }
        }
      });
    }, {});

    this.observer.observe(this.DOM.section);
  }
  componentWillUnmount() {
    this.observer.disconnect();
  }

  renderTracklist(tracks) {
    return (
      <div>
        <table>
          {tracks.map((t, i) => {
            return (
              <tr style={trackContainer}>
                <td>{i + 1}.</td>
                <td>{t.name}</td>
                <td>{t.time}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  updateState() {
    this.setState((state) => {
      return { tracksShowing: !state.tracksShowing };
    });
  }

  render() {
    const album = this.props.album;
    const trackChildren = this.state.tracksShowing ? (
      this.renderTracklist(album.tracklist)
    ) : (
      <div></div>
    );

    return (
      <div
        style={containerStyle}
        ref={(div) => (this.DOM.section = div)}
        className="album-container"
      >
        <div
          style={title}
          ref={(div) => (this.DOM.title = div)}
          className="album-title"
        >
          {album.name}
        </div>
        <div style={middleRow}>
          {album.artwork.map((a) => (
            <img
              style={rowItem}
              ref={(img) => this.DOM.images.push(img)}
              className="image-row"
              src={a}
            />
          ))}
          <div
            onClick={this.updateState.bind(this)}
            style={infoButton(this.props.icon)}
            ref={(div) => this.DOM.images.push(div)}
          >
            <span className="link">
              {this.state.tracksShowing ? "LESS INFO" : "MORE INFO"}
            </span>
          </div>
        </div>
        <div>{trackChildren}</div>
      </div>
    );
  }
}

const containerStyle = {
  padding: "3em 7vw",
};
const title = {
  textAlign: "left",
  fontFamily: "Otto Attac Type",
  fontSize: "5em",
  opacity: 0,
};
const middleRow = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
};

const rowItem = {
  width: "25rem",
  padding: "2em",
  opacity: 0,
};
const infoButton = (icon) => {
  return {
    background: `url(${icon})`,
    backgroundSize: "30%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "15em",
    maxHeight: "15em",
    minHeight: "5em",
    fontFamily: "roc-grotesk-extrawide, sans-serif",
    textDecoration: "underline",
    fontSize: "2em",
    transform: "translateY(25%)",
    alignSelf: "flex-end",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 2,
    cursor: "none",
  };
};

const trackContainer = {
  textAlign: "left",
  fontFamily: "roc-grotesk-wide, sans-serif",
  textTransform: "uppercase",
  padding: "0.5em 1em",
  fontSize: "2em",
};

export default AlbumWidget;
