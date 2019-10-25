import * as THREE from 'three';


const addLight=()=>{
    var directionalLight = new THREE.DirectionalLight(0x9090aa);
    directionalLight.position.set(-10, 10, -10).normalize();
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemisphereLight.position.set(1, 1, 1);
    return [directionalLight,hemisphereLight]
}

export default addLight;