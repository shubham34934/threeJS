import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import './controls/control.scss'; 
import BgTexture from './controls/bgText';
import BoxTexture from './controls/boxText';
import BoxSize from './controls/boxSize';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .6)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    borderBottom: '1px solid rgba(0, 0, 0, .8)',
    color:"white",
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '1px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    padding:"10px 0px 3px 10px"
  },
}))(MuiExpansionPanelDetails);

export default function Control(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onChangeHandler=(e,val,type)=>{
    props.boxSizeController(val,type)
  }

  return (
    <div className="control">
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Background Texture</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          
          <BgTexture bgTextureChange={props.bgTextureChange} />

        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Box Texture</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <BoxTexture boxTextureChange={props.boxTextureChange} />

        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Box size</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="size-slider">
             
            <BoxSize intialBoxDim={props.intialBoxDim} sizeHandler={onChangeHandler} />

          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Create Geometry</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="size-slider">

           

          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}