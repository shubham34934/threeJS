import React from 'react';
import './control.scss';
import Slider from '@material-ui/core/Slider';



export default class BoxSize extends React.Component{
    constructor(props){
        super(props)
    }
    
    // imageClickHandler=(index)=>{
    //    this.props.bgTextureChange(index);
    // }
    valuetext(value) {
        return `${value}°C`;
    }

    render(){
    return (
     <div className="box-size">
       <div className="prop-name">
           Length
       </div>
       <div className="slider">
            <Slider
                    defaultValue={this.props.intialBoxDim.length}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={50}
                    max={150}
                    onChangeCommitted={ (e,val) => this.props.sizeHandler(e,val,"length") } 
            />
       </div>
       <div className="prop-name">
           width
       </div>
       <div className="slider">
            <Slider
                    defaultValue={this.props.intialBoxDim.width}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={50}
                    max={150}
                    onChangeCommitted={ (e,val) => this.props.sizeHandler(e,val,"width") } 
            />
       </div>
       <div className="prop-name">
           Height
       </div>
       <div className="slider">
            <Slider
                    defaultValue={this.props.intialBoxDim.height}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={50}
                    max={150}
                    onChangeCommitted={ (e,val) => this.props.sizeHandler(e,val,"height") } 
            />
       </div>
    </div>
        );
    }
}

