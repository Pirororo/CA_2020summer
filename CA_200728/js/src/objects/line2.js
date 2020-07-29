export default class Line extends THREE.Object3D {
    　　 /**
        * コンストラクターです。
        * @constructor
        */
        constructor() {
            super();

            // Build an array of points
            const segmentLength = 50;
            const nbrOfPoints = 10;
            const points = [];
            for (let i = 0; i < nbrOfPoints; i++) {
            points.push(i * segmentLength, 0, 0);
            }

            // Build the geometry
            const line = new MeshLine();
            line.setGeometry(points);
            const geometry = line.geometry;

            // Build the material with good parameters to animate it.
            const material = new MeshLineMaterial({
            transparent: true,
            lineWidth: 10,
            color: 0xff0000,
            dashArray: 20,     // always has to be the double of the line
            dashOffset: 0,    // start the dash at zero
            dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
            });

            // Build the Mesh
            this.lineMesh = new THREE.Mesh(geometry, material);
            this.lineMesh.position.x = -0.5;

            // ! Assuming you have your own webgl engine to add meshes on scene and update them.
            this.add(this.lineMesh);
        }

        // ! Call each frame
        update() {
            // Check if the dash is out to stop animate it.
            if (this.lineMesh.material.uniforms.dashOffset.value < -2) return;

            // Decrement the dashOffset value to animate the path with the dash.
            this.lineMesh.material.uniforms.dashOffset.value -= 0.01;
        }
}