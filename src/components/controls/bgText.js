import React from 'react';
import './control.scss';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


export default class BgTexture extends React.Component{
    constructor(props){
        super(props)
    }
    
    imageClickHandler=(index)=>{
       this.props.bgTextureChange(index);
    }
    
    render(){
    return (
     <div className="bg-texture">
        <div className="img-item" >
            {imgData.map((img,index) => (          
                <img key={index} onClick={()=>this.imageClickHandler(index)} src={require(`./../threeJS/scene/bg-textures/img${index}.jpg`)} />
            ))}
         </div>
    </div>
        );
    }
}

  const imgData = [
      1,2,3,4
     ];