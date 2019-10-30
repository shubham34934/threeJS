import React from 'react';
import Scene from './threeJS/scene/scene';

export default class Three extends React.Component {

  render() {
    // console.log(this.props.bgTexture)
    return (
      <Scene intialBoxDim={this.props.intialBoxDim} boxTexture = {this.props.boxTexture} bgTexture={this.props.bgTexture} boxDim={this.props.boxDim}/>
    );
  }
}