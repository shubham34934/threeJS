import React from 'react';
import './App.scss';
import Three from './components/threeContainer';
import Control from './components/control';


export default class App extends React.Component {
 constructor(props){
   super(props)
   this.state={
     bgTexture:1,
     boxTexture:"",
     boxSize:{
       length:60,
       width:60,
       height:60
     }
   }
 }
bgTextureChange=(index)=>{
  this.setState({
    bgTexture: index,
    boxSize:{
      length:index,
      width:index,
      height:index
    }
  },()=>console.log(this.state.bgTexture))
  
}
render(){
  return (
    <div className="App">
        <Three bgTexture={`./bg-textures/img${this.state.bgTexture}.jpg`} boxDim={this.state.boxSize}/>
        <Control bgTextureChange={this.bgTextureChange}  />
    </div>
  );
}

}
