window.renderMesh = function renderMesh(elem, meshData) {
      function createGeometry(obj) {
        var geometry = new THREE.BufferGeometry();

        geometry.setIndex(new THREE.BufferAttribute(new Int16Array(obj.triangles), 1));
        geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(obj.vertices), 3));
        geometry.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(obj.normals), 3));
        var material =  new THREE.MeshNormalMaterial()
        material.side = THREE.DoubleSide;
        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
      }

      var three = THREE.Bootstrap({ // With given options
        init: true, // Initialize on creation
        element: document.getElementById(elem), // Containing element
        plugins: [ // Active plugins
          'core', // Use all core plugins
        ],
        size: {
          width: 700,
          height: 500
        },
        renderer: {
          parameters: { // Parameters passed to Three.js renderer
            depth: true,
            stencil: true,
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true,
          },
        }
      });

      three.renderer.setClearColor(0xffffff, 0);
      console.log("doing it")
      var mesh = createGeometry(meshData);
      console.log(meshData);
      console.log(mesh);
      three.scene.add(mesh);
      var bbox = new THREE.BoundingBoxHelper(mesh);
      bbox.update();
      var box = bbox.box;
      var center = new THREE.Vector3(
        (box.max.x - box.min.x) / 2,
        (box.max.y - box.min.y) / 2,
        (box.max.z - box.min.z) / 2
      );
      var height = box.max.x - box.min.x;
      var width = box.max.y - box.min.y;
      var dist = Math.max(height, width) * 2.5;
      var fov = 2 * Math.atan(height / (2 * dist * 1.5)) * (180 / Math.PI); // in degrees
      three.camera.fov = fov;

      // Orbit the camera
      three.on('update', function() {
        var t = three.Time.now;
        three.camera.position.set(center.x + dist * Math.cos(t), center.y + dist, center.z + dist * Math.sin(t));
        three.camera.lookAt(center);
      });
    }
