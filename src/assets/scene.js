/**
 * @fileoverview ThreeJS scene management
 */

//Imports
import
{
  Color,
  GammaEncoding,
  MOUSE,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  WebGLRenderer
} from 'three';
import OrbitControls from 'three-orbitcontrols';
import utils from './utils';

//State
const state = {
  camera: null,
  canvas: null,
  controls: null,
  destroyed: false,
  renderer: null,
  scene: null
};

//Window resize event handler
const resize = () =>
{
  //Update renderer size
  state.renderer.setSize(
    state.canvas.clientWidth,
    state.canvas.clientHeight
  );

  //Update camera aspect ratio
  state.camera.aspect = state.canvas.clientWidth / state.canvas.clientHeight;
  state.camera.updateProjectionMatrix();
};

/**
 * @function Setup scene
 * @param {Element} canvas HTML canvas element
 * @param {Object} bed Bed dimensions
 * @param {Object} theme Theme
 * @param {String} gcode Raw GCODE
 * @param {Object} position Position
 * @param {Object} rotation Rotation
 * @param {Object} scale Scale
 */
const setup = async (canvas, bed, theme, gcode, position, rotation, scale) =>
{
  //Renderer
  state.renderer = new WebGLRenderer({antialias: true});
  state.renderer.setPixelRatio(window.devicePixelRatio);
  state.renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight
  );
  state.renderer.encoding = GammaEncoding;
  state.renderer.outputEncoding = GammaEncoding;
  state.renderer.shadowMap.enabled = true;
  canvas.appendChild(state.renderer.domElement);

  //Camera
  const camera = new PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    200
  );
  camera.position.set(0, bed.X / 2, -bed.Y);

  //Orbit controls
  state.controls = new OrbitControls(camera, canvas);
  state.controls.rotateSpeed = 0.7;
  state.controls.minDistance = 1;
  state.controls.maxDistance = 100;
  state.controls.minPolarAngle = 0;
  state.controls.maxPolarAngle = Math.PI;
  state.controls.mouseButtons = {
    LEFT: MOUSE.PAN,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.ROTATE
  };

  //Scene
  state.scene = new Scene();
  state.scene.background = new Color(theme.backgroundColor);

  //Plane
  const plane = new Mesh(
    new PlaneBufferGeometry(),
    new MeshBasicMaterial({color: new Color(theme.bedColor)})
  );
  plane.rotation.x = -Math.PI / 2;
  plane.scale.set(bed.X, bed.Y, 1);
  state.scene.add(plane);

  //GCODE
  if (gcode != null)
  {
    const object = await utils.update.gcode(gcode, theme, state.scene);
    utils.update.position(object, position);
    utils.update.rotation(object, rotation);
    utils.update.scale(object, scale);
  }

  //Subscribe to resize event
  window.addEventListener('resize', resize);

  //Start
  const animate = () =>
  {
    if (!state.destroyed)      
    {
      state.controls.update();
      requestAnimationFrame(animate);
      state.renderer.render(state.scene, camera);
    }
  };
  animate();
};

/**
 * @function Tear down scene
 */
const teardown = () =>
{
  //Unsubscribe to resize event
  window.removeEventListener('resize', resize);

  //Clean everything in the scene
  state.scene.children.forEach(object =>    
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
  state.destroyed = true;

  //Delete scene and camera
  delete state.scene;
  delete state.camera;

  //Dispose of controls and renderer
  state.controls.dispose();
  state.renderer.dispose();
};

//Export
export {setup, teardown};