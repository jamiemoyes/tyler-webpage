import React from "react";
import GradientContainer from "./components/GradientContainer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import AlbumWidget from "./components/AlbumWidget";
import Cursor from "./components/Cursor";

import Albums from "./assets/Albums";
import Swirl from "./assets/Swirl.png";
import SplitStar from "./assets/Split-Star.png";
import PluckeredStar from "./assets/Pluckered-Star.png";
import Moon from "./assets/Moon.png";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.icons = [SplitStar, Moon, PluckeredStar, Swirl];
    this.mouseCoordinates = {
      x: 0,
      y: 0,
    };
  }


  render() {
    return (
      <div className="App">
        <Cursor />
        <GradientContainer
          gradient="radial-gradient(at left, #C259A0, #EBEBEB 50%)"
          children={[<LandingPage />, <AboutPage />]}
        />
        <GradientContainer
          gradient="radial-gradient(at bottom right, #FF5A36, #EBEBEB 50%)"
          children={Albums.map((a, i) => (
            <AlbumWidget album={a} icon={this.icons[i % this.icons.length]} />
          ))}
        />
      </div>
    );
  }
}

export default App;
