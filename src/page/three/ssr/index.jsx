import React, { Component } from 'react';
import './ssr.scss';

class Ssr extends Component {
  render() {
    return (
      <div className="ssr">
        <img className="ssr-float" />
        <img className="ssr-img" />
        hellow ssr
      </div>
    )
  }
}

export default Ssr;
