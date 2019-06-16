import React, { Component } from "react";
import "../styles/Pokemon.css";

class Pokemon extends Component {
  render() {
    return (
      <div>
        <div className="uk-flex uk-flex-column uk-flex-middle">
          <img
            src={this.props.image}
            alt={this.props.name}
            className="uk-height-small uk-width-auto"
          />
          <div>{this.props.name}</div>
          <div className="uk-flex">
            {this.props.types.map(type => (
              <span className={"uk-label " + type.toLowerCase()}>{type}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
