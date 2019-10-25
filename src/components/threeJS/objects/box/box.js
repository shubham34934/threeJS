import * as THREE from 'three';


const createBox = (length,width,height)=>{
    var geometry = new THREE.BoxGeometry(length, width, height);
    var material = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0.15});
    var cube = new THREE.Mesh(geometry, material);
    return cube
}


export default createBox;