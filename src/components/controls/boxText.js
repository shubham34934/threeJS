import React from 'react';
import './control.scss';


export default class BoxTexture extends React.Component{
    constructor(props){
        super(props)
    }
    
    imageClickHandler=(index)=>{
       this.props.boxTextureChange(index);
    }
    
    render(){
    return (
     <div className="bg-texture">
        <div className="img-item" >
            {imgData.map((img,index) => (          
                <img key={index} onClick={()=>this.imageClickHandler(index)} src={require(`./../../assets/box-textures/img${index}.jpg`)} />
            ))}
         </div>
    </div>
        );
    }
}

  const imgData = [
      1,2,3,4,5,6
     ];