import React from 'react';
// import ResizeObserver from "resize-observer-polyfill";
import * as THREE from 'three';
import createBox from '../objects/box/box';
import addCamera from '../camera/camera';
import addLight from '../lights/lights';
// import {OrbitControls} from 'three-orbit-controls';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import './scene.scss';
import ElfFile from './elf.dae';
import samba from './Samba Dancing.fbx';
// import city from './../scene/LittlestTokyo.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

      

var container, stats;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
export default class Scene extends React.Component {

  constructor(props){
    super(props)
    this.state={
      boxScale : {
         x : 1,
         y:1,
         z:1
      }
    }
  }
  
  updateBox=(nextProps)=>{
    if(nextProps.boxDim.length!==this.props.boxDim.length){
      this.setState({
        boxScale: {
          x: nextProps.boxDim.length/this.props.intialBoxDim.length
        } 
      },()=> this.cube.scale.x = this.state.boxScale.x)
    }

    if(nextProps.boxDim.width!==this.props.boxDim.width){
      this.setState({
        boxScale: {
          y: nextProps.boxDim.width/this.props.intialBoxDim.width
        } 
      },()=> this.cube.scale.y = this.state.boxScale.y)
    }

    if(nextProps.boxDim.height!==this.props.boxDim.height){
      this.setState({
        boxScale: {
          z: nextProps.boxDim.height/this.props.intialBoxDim.height
        } 
      },()=> this.cube.scale.z = this.state.boxScale.z)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.boxDim!==this.props.boxDim){
      this.updateBox(nextProps)
    }
    console.log(this.props.boxTexture)
    if(nextProps.bgTexture!== this.props.bgTexture)
    this.updateGround(nextProps)

    if(nextProps.boxTexture!== this.props.boxTexture)
    this.updateObject(nextProps)
  }

  createGround=(nextProps)=>{
    this.groundTexture = this.loader.load(require(`${nextProps.bgTexture}`));
    this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
    this.groundTexture.repeat.set( 25, 25 );
    this.groundTexture.anisotropy = 16;
    this.groundMaterial = new THREE.MeshLambertMaterial( { map: this.groundTexture } );
    this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), this.groundMaterial );
    this.mesh.position.y = - 250;
    this.mesh.rotation.x = - Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.scene.add( this.mesh );
  }

  updateGround=(nextProps)=>{
    this.groundTexture = this.loader.load(require(`${nextProps.bgTexture}`));
    this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
    this.groundTexture.repeat.set( 25, 25 );
    this.groundTexture.anisotropy = 16;
    this.groundMaterial.map= this.groundTexture
  }

  createObjects=(size)=>{
    var texture = THREE.ImageUtils.loadTexture(require(`${this.props.boxTexture}`))
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1);
    texture.anisotropy = 16;
    this.cubeGeometry = new THREE.BoxGeometry(size.length, size.width, size.height)
    this.cubeMaterial = new THREE.MeshBasicMaterial( {color: 0xf0f0f0, map: texture} );
    this.cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial)
    this.cube.position.set(0, -190, 0);
    this.cube.castShadow = true;
    this.scene.add(this.cube)
  }
  updateObject=(nextProps)=>{
    var texture = THREE.ImageUtils.loadTexture(require(`${nextProps.boxTexture}`))
    this.cubeMaterial.map=texture;
  }
  init=()=>{
    this.initGraphics()
    this.initPhysics()
    this.addObjects()   
  }

  initPhysics=()=>{

  }

  addObjects=()=>{

    this.clock = new THREE.Clock();

    var loader = new FBXLoader();
    loader.load( samba, ( object )=> {
      this.mixer = new THREE.AnimationMixer( object );
      var action = this.mixer.clipAction( object.animations[ 0 ] );
      action.play();
      object.traverse( ( child )=> {
        if ( child.isMesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      } );
      object.position.set(-200, -250, -200);
      object.scale.set(2, 2, 2);
      this.scene.add( object );
    } );

    // const gltfLoader = new GLTFLoader();
    // const url = 'https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/1.0/Duck/glTF/Duck.gltf';
    // gltfLoader.load(url, (gltf) => {
    //   const root = gltf.scene;
    //   scene.add(root);
    // });


    // var loadingManager = new THREE.LoadingManager( ()=> {
    //   this.scene.add( this.elf );
    // } );
    // // collada
    // var loader = new ColladaLoader( loadingManager );
    // loader.load( ElfFile, ( collada )=> {
    //   this.elf = collada.scene;
    //   this.elf.scale.set(90, 90, 90);
    //   var my_material = new THREE.MeshPhongMaterial() //or any other material
    //   //set map, shininess, etc. if needed
    //   this.elf.material = my_material
    // } );

    // var dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath();
    // var loader = new GLTFLoader();
    // loader.setDRACOLoader( dracoLoader );
    // loader.load( city, ( gltf )=> {
    //   var model = gltf.scene;
    //   model.position.set( 1, 1, 0 );
    //   model.scale.set( 0.01, 0.01, 0.01 );
    //   // model.traverse( ( child )=> {
    //   //   if ( child.isMesh ) child.material.envMap = envMap;
    //   // } );
    //   this.scene.add( model );
    //   this.mixer = new THREE.AnimationMixer( model );
    //   this.mixer.clipAction( gltf.animations[ 0 ] ).play();
    //   this.animate();
    // }, undefined, ( e )=> {
    //   console.error( e );
    // } );



    this.loader = new THREE.TextureLoader();
    this.createObjects(this.props.intialBoxDim)
    this.createGround(this.props)
  }


  initGraphics=()=>{
    let width = this.mount.clientWidth
    let height = this.mount.clientHeight   
    //scene

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xcce0ff );
    this.scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
    // camera
    this.camera = new THREE.PerspectiveCamera( 30, width / height, 1, 10000 );
    this.camera.position.set( 1000, 50, 1500 );
    // lights
    this.scene.add( new THREE.AmbientLight( 0x666666 ) );
    this.light = new THREE.DirectionalLight( 0xdfebff, 1 );
    this.light.position.set( 50, 200, 100 );
    this.light.position.multiplyScalar( 1.3 );
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    var d = 300;
    this.light.shadow.camera.left = - d;
    this.light.shadow.camera.right = d;
    this.light.shadow.camera.top = d;
    this.light.shadow.camera.bottom = - d;
    this.light.shadow.camera.far = 1000;
    this.scene.add( this.light );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( this.renderer.domElement );
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;

    var controls = new OrbitControls( this.camera, this.renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.5;
				controls.minDistance = 1000;
        controls.maxDistance = 5000;
        
    window.addEventListener('resize', this.handleResize)
    this.start()
  }

  componentDidMount=()=>{   
    this.init(); 
  }

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderScene()
  }
  
  animate = () => {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
    
    var delta = this.clock.getDelta();
    if ( this.mixer ) this.mixer.update( delta );


  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
    this.frameId = null
  }
 
  
  render() {
    // console.log(this.props)
    return (
      <div className='three' ref={(el) => { this.mount = el }}></div>
    );
  }

}
