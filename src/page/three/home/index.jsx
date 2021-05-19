import React, { Component } from 'react';
import './home.scss';

class Home extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="threejs-home">
        {children}
      </div>
    )
  }
}

export default Home;
