import * as THREE from 'three';


 const addCamera=()=>{
     var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
      return camera
 }

 export default addCamera ;