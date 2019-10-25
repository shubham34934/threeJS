import React from 'react';
// import ResizeObserver from "resize-observer-polyfill";
import * as THREE from 'three';
import createBox from '../objects/box/box';
import addCamera from '../camera/camera';
import addLight from '../lights/lights';
// import {OrbitControls} from 'three-orbit-controls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

var camera = addCamera();

var lights = addLight();

export default class Scene extends React.Component {

  constructor(props){
    super(props)
    this.state={
      width:512,
      height:512,
      bg:this.props.bgTexture,
      boxScale:1
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps!==this.props){
      this.setState({
        bg: nextProps.bgTexture,
        boxScale:nextProps.boxDim.length/this.props.boxDim.length     
      });
    }
     console.log(this.state.boxScale)
    this.renderThree()
  }
  componentDidMount=()=>{
    this.renderThree()
  }

  renderThree=()=> {
    var scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
    // camera
    var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 1000, 50, 1500 );
    // lights
    scene.add( new THREE.AmbientLight( 0x666666 ) );

    var light = new THREE.DirectionalLight( 0xdfebff, 1 );

    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    var d = 300;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;
    scene.add( light );

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.three.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;


    // this.renderer = new THREE.WebGLRenderer({antialias: true});
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor (0xfffff0, 1);
    // this.three.appendChild(this.renderer.domElement);
    // this.scene.add(lights[0]);
    // this.scene.add(lights[1]);
    this.cube = createBox(this.props.boxDim.length,this.props.boxDim.width, this.props.boxDim.height)
    this.cube= this.scaleY(this.cube,this.state.boxScale);
    this.cube.updateMatrix()
    scene.add(this.cube);

    var loader = new THREE.TextureLoader(); 
    // texture.minFilter = THREE.LinearFilter;
    // var groundTexture = loader.load(require(`${this.state.bg}`), function () {
    //   var tex = groundTexture.clone();    //maybe useless ?
    //   tex.minFilter = THREE.LinearFilter;
    //   tex.needsUpdate = true; //maybe useless too ?
    //   tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    //   tex.repeat.set( 25, 25 );
    //   tex.anisotropy = 16;
    //   var groundMaterial = new THREE.MeshLambertMaterial( { map: tex } );
    //   var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    //   mesh.position.y = - 250;
    //   mesh.rotation.x = - Math.PI / 2;
    //   mesh.receiveShadow = true;
    //   scene.add( mesh );
    // });



    var groundTexture = loader.load(require(`${this.state.bg}`));
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 25, 25 );
    groundTexture.anisotropy = 16;
    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );


    scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
    scene.add( new THREE.AmbientLight( 0x666666 ) );


    var controls = new OrbitControls( camera, renderer.domElement );
    camera.position.z = 5;
    controls.update();

    this.animate(scene,camera,renderer,controls);
  }

  scaleY =( mesh, scale ) => {
    mesh.scale.y = scale ;
    if( ! mesh.geometry.boundingBox ) mesh.geometry.computeBoundingBox();
    var height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
    //height is here the native height of the geometry
    //that does not change with scaling. 
    //So we need to multiply with scale again
    mesh.position.y = height * scale / 2 ;
    return mesh
}


  animate(scene,camera,renderer,controls) {
    requestAnimationFrame(this.animate.bind(this,scene,camera,renderer));
    this.cube.rotation.x += 0.006;
    this.cube.rotation.y += 0.006;
    renderer.render(scene, camera);
    renderer.autoUpdateObjects = true;

    // requestAnimationFrame( animate );
    // render();
    // controls.update();
  }

  render() {
    console.log(this.props)
    return (
      <div className='three' ref={(el) => { this.three = el }}></div>
    );
  }

}
