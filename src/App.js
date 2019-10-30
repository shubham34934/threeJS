import React from 'react';
import './App.scss';
import Three from './components/threeContainer';
import Control from './components/control';

export default class App extends React.Component {
 constructor(props){
   super(props)
   this.state={
     bgTexture:1,
     boxTexture:1,
     intialBoxDim:{
       length:120,
       width:120,
       height:120
     },
     boxSize:{
       length:10,
       width:10,
       height:10
     }
   }
 }

bgTextureChange=(index)=>{
  this.setState({
    bgTexture: index
  }) 
}

boxTextureChange=(index)=>{
  this.setState({
    boxTexture: index
  }) 
}

boxSizeController=(value,type)=>{
  console.log(this.state.boxSize)
  if(type==="length")
  this.setState(prevState=>({
    boxSize:{
      length: value,
      width:  prevState.boxSize.width,
      height: prevState.boxSize.height
    }
  }))


  if(type==="width")
  this.setState(prevState=>({
    boxSize:{
      length: prevState.boxSize.length,
      width:  value,
      height: prevState.boxSize.height
    }
  }))

  if(type==="height")
  this.setState(prevState=>({
    boxSize:{
      length: prevState.boxSize.length,
      width:  prevState.boxSize.width,
      height: value
    }
  }))

}
render(){
  return (
    <div className="App">
        <Three intialBoxDim={this.state.intialBoxDim}  boxTexture={`./../../../assets/box-textures/img${this.state.boxTexture}.jpg`} bgTexture={`./bg-textures/img${this.state.bgTexture}.jpg`} boxDim={this.state.boxSize}/>
        <Control intialBoxDim={this.state.intialBoxDim} boxSizeController={this.boxSizeController} bgTextureChange={this.bgTextureChange} boxTextureChange={this.boxTextureChange} />
    </div>
  );
}

}
