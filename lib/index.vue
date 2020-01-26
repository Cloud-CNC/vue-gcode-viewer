<template>
  <div
    id="canvas"
    ref="canvas"
  />
</template>

<script>
import{
  WebGLRenderer,
  PerspectiveCamera,
  MOUSE,
  Scene,
  Color,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  DirectionalLight
} from 'three';
import OrbitControls from 'three-orbitcontrols';
import GCodeParser from './gcode-parser.js';

export default {
  props: {
    bed: Object,
    gcode: String,
    position: Object,
    rotation: Object,
    scale: Object,
    theme: Object
  },
  data: () => ({
    camera: null,
    controls: null,
    scene: null,
    plane: null,
    object: {
      extrusion: null,
      path: null
    },
    renderer: null,
    destroyed: false
  }),
  watch: {
    //Update model
    gcode: function () 
    {
      const parser = new GCodeParser(
        this.theme.extrusionColor,
        this.theme.pathColor
      );
      parser.parse(this.gcode).then(object => 
      {
        //Store for later manipulation
        this.object = object;

        this.setRotation();
        this.setScale();
        this.setPosition();

        //Add to scene
        this.scene.add(object.extrusion);
        this.scene.add(object.path);
      });
    },
    //Update plane
    bed: {
      deep: true,
      handler: 'setPlane'
    },
    //Update position
    position: {
      deep: true,
      handler: 'setPosition'
    },
    //Update rotation
    rotation: {
      deep: true,
      handler: 'setRotation'
    },
    //Update scale
    scale: {
      deep: true,
      handler: 'setScale'
    },
    //Update theme
    theme: {
      deep: true,
      handler: 'setTheme'
    }
  },
  //Setup
  mounted: function () 
  {
    //Renderer
    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.$refs.canvas.clientWidth,
      this.$refs.canvas.clientHeight
    );
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.$refs.canvas.appendChild(this.renderer.domElement);

    //Camera
    this.camera = new PerspectiveCamera(
      50,
      this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
      0.1,
      200
    );
    this.camera.position.set(0, this.bed.X / 2, -this.bed.Y);

    //Orbit controls
    this.controls = new OrbitControls(this.camera, this.$refs.canvas);
    this.controls.rotateSpeed = 0.7;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.mouseButtons = {
      LEFT: MOUSE.PAN,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    };

    //Scene
    this.scene = new Scene();
    this.scene.background = new Color(this.theme.backgroundColor);

    //Plane
    this.plane = new Mesh(
      new PlaneBufferGeometry(),
      new MeshBasicMaterial({color: new Color(this.theme.bedColor)})
    );
    this.plane.rotation.x = -Math.PI / 2;
    this.setPlane();
    this.scene.add(this.plane);

    //Subscribe resize function to resize event
    window.addEventListener('resize', this.resize);

    //Start
    this.animate();
  },
  //Cleanup
  destroyed: function () 
  {
    //Unsubscribe resize function to resize event
    window.removeEventListener('resize', this.resize);

    //Clean everything in the scene
    this.scene.children.forEach(object => 
    {
      //Geometry
      if (
        object.geometry != null &&
        typeof object.geometry.dispose == 'function'
      ) 
      {
        object.geometry.dispose();
      }

      //Material
      if (
        object.material != null &&
        typeof object.material.dispose == 'function'
      ) 
      {
        object.material.dispose();
      }
    });

    //Disable animation loop
    this.destroyed = true;

    //Delete scene and camera
    delete this.scene;
    delete this.camera;

    //Dispose of controls and renderer
    this.controls.dispose();
    this.renderer.dispose();
  },
  methods: {
    //Set plane size
    setPlane: function () 
    {
      const {X, Y} = this.bed;
      this.plane.scale.set(X, Y, 1);
    },
    //Set object position
    setPosition: function () 
    {
      const {X, Y, Z} = this.position;
      this.object.extrusion.position.set(X, Y, Z);
      this.object.path.position.set(X, Y, Z);
    },
    //Set object rotation
    setRotation: function () 
    {
      let {X, Y, Z} = this.rotation;
      X *= Math.PI / 180;
      Y *= Math.PI / 180;
      Z *= Math.PI / 180;
      this.object.extrusion.rotation.set(X, Y, Z);
      this.object.path.rotation.set(X, Y, Z);
    },
    //Set object scale
    setScale: function () 
    {
      const {X, Y, Z} = this.scale;
      this.object.extrusion.scale.set(Z, X, Y);
      this.object.path.scale.set(Z, X, Y);
    },
    //Set theme
    setTheme: function () 
    {
      this.object.extrusion.material.color.set(this.theme.extrusionColor);
      this.object.path.material.color.set(this.theme.pathColor);
      this.plane.material.color.set(this.theme.bedColor);
      this.scene.background.set(this.theme.backgroundColor);
    },
    //Animate motion
    animate: function () 
    {
      if (!this.destroyed) 
      {
        this.controls.update();
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      }
    },
    //Resize function
    resize: function () 
    {
      //Update renderer size
      this.renderer.setSize(
        this.$refs.canvas.clientWidth,
        this.$refs.canvas.clientHeight
      );

      //Update camera aspect ratio
      this.camera.aspect =
        this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  }
};
</script>

<style>
#canvas {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>