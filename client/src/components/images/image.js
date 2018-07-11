import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./image.css";

class Image extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired
  };
  render() {
    return <img className="Image" src={this.props.content} alt="" />;
  }
}

export default Image;