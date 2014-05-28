var scene, renderer, camera, cube = null, floor1, floor2, floor0, geometry, material, firebase;

var d = 500, dd;

jQuery(document).ready(function() {

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10*d );
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


floor0 = new THREE.Mesh(new THREE.PlaneGeometry(d, d), new THREE.MeshLambertMaterial({
color: 'white'
}));

floor0.rotation.x = Math.PI/2;
floor0.material.side = THREE.DoubleSide;

floor1 = new THREE.Mesh(new THREE.PlaneGeometry(d, d), new THREE.MeshLambertMaterial({
color: 'white'
}));

floor1.material.side = THREE.DoubleSide;

floor2 = new THREE.Mesh(new THREE.PlaneGeometry(d, d), new THREE.MeshLambertMaterial({
color: 'white'
}));

floor2.rotation.y = Math.PI/2;
floor2.material.side = THREE.DoubleSide;


var light = new THREE.AmbientLight( 0x333333); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(10, 8, 0).normalize();
scene.add( directionalLight );

//scene.add( cube );
scene.add( floor0);
scene.add( floor1);
scene.add( floor2);

// floor0.position.set(-d,-d,-1);
dd = d/2;

floor0.position.set(0,-dd,0);
floor2.position.set(-dd,0,0);
floor1.position.set(0,0,-dd);

// floor2.position.set(-1,-1,-1);

camera.position.set(d,d,d);

camera.lookAt(new THREE.Vector3(0,0,0));

firebase = new Firebase('https://eggbutty.firebaseio.com');
firebase.on('value', function(snapshot) {
	if(cube !== null) {
		cube.rotation.y = snapshot.val().angle;//applyMatrix(new THREE.Matrix4().makeRotationY(snapshot.val()));
		cube.position.x = d*snapshot.val().centre.x;
		cube.position.z = d*snapshot.val().centre.y;
		//cube.geometry.verticesNeedUpdate = true;
		console.log("firebase message");
		}
	});

render();

var jsonLoader = new THREE.JSONLoader();
jsonLoader.load( "output.js", createScene );

window.onresize = function() {
renderer.setSize( window.innerWidth, window.innerHeight );
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

}

});


function createScene( geometry, materials ) {
   cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
   cube.position = new THREE.Vector3(0,-dd,0);
   scene.add(cube);
   render();
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
