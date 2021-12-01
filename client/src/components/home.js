// home.js
import React, { Component } from "react";
import Button from "./button.js";
import asa from "./../img/asa-logo.png";

export default class MembersList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Content home">
        <div class="row">
          <div class="col-sm-8">
            <div class="">
              <img class="home-img" src={asa} alt="ASA Logo"></img>
            </div>

            <h3 class="home-heading">In the bleak midwinter.</h3>

            <p class="home-text">
              In the bleak midwinter Frosty wind made moan Earth stood hard as
              iron Water like a stone Snow had fallen Snow on snow on snow In
              the bleak midwinter Long, long ago
            </p>
          </div>
          <div class="col-sm-4">
            <Button label="View Database" link="/" />
            <Button label="something" link="/" />
          </div>
        </div>
      </div>
    );
  }
}
