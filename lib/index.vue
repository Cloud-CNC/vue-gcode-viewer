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
    raw: 'String',
    theme: 'Object'
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
  mounted: function ()  {
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
      50
    );
    this.camera.position.set(0, 12, -12);

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
    this.scene.background = new Color(this.backgroundColor);

    //Ground plane
    this.plane = new Mesh(
      new PlaneBufferGeometry(10, 10),
      new MeshBasicMaterial({color: new Color(theme.accent)})
    );
    this.plane.rotation.x = -Math.PI / 2;
    this.scene.add(this.plane);

    //Parse object
    const parser = new GCodeParser(theme.primary, theme.secondary, 0.1);
    parser.parse(this.raw).then(object =>    {
      //Set position
      object.extrusion.position.set(11.15, 0, -11.15);
      object.path.position.set(11.15, 0, -11.15);

      //Set rotation
      object.extrusion.rotation.set(-Math.PI / 2, 0, Math.PI);
      object.path.rotation.set(-Math.PI / 2, 0, Math.PI);

      //Set scale
      object.extrusion.scale.set(0.1, 0.1, 0.1);
      object.path.scale.set(0.1, 0.1, 0.1);

      //Store for later manipulation
      this.object = object;

      //Add to scene
      this.scene.add(object.extrusion);
      this.scene.add(object.path);
    });

    //Subscribe resize function to resize event
    window.addEventListener('resize', this.resize);

    //Start
    this.animate();
  },
  //Cleanup
  destroyed: function ()  {
    //Unsubscribe resize function to resize event
    window.removeEventListener('resize', this.resize);

    //Clean everything in the scene
    this.scene.children.forEach(object =>    {
      //Geometry
      if (
        object.geometry != null &&
        typeof object.geometry.dispose == 'function'
      )      {
        object.geometry.dispose();
      }

      //Material
      if (
        object.material != null &&
        typeof object.material.dispose == 'function'
      )      {
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
    //Add light
    addLight: function (x, y, z, color, intensity)    {
      const light = new DirectionalLight(color, intensity);
      light.castShadow = true;
      light.position.set(x, y, z);
      this.scene.add(light);
    },
    //Animate motion
    animate: function ()    {
      if (!this.destroyed)      {
        this.controls.update();
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      }
    },
    //Resize function
    resize: function ()    {
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
  },
  watch: {
    //Update theme
    theme: (oldTheme, newTheme) =>    {
      //Update extrusion color
      this.object.extrusion.material.color.set(newTheme.extrusionColor);

      //Update path color
      this.object.path.material.color.set(newTheme.pathColor);

      //Update plane color
      this.plane.material.color.set(newTheme.planeColor);

      //Update background color
      this.scene.background.set(newTheme.backgroundColor);
    }
  }
};
</script>

<style>
#canvas {
  position: fixed;
  width: 100%;
}
</style>