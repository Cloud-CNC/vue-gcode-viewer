/**
 * @fileoverview ThreeJS scene utilities
 */

//Imports
import GCodeParser from '@/assets/gcode-parser';

/**
 * Update various scene properties
 */
const update = {
  /**
   * @function Update bed
   */
  bed: (plane, bed) =>
  {
    const {X, Y} = bed;
    plane.scale.set(X, Y, 1);
  },

  /**
   * @function Update GCODE
   * @param {String} raw Raw GCODE
   * @param {Object} theme Theme
   * @param {Scene} scene ThreeJS scene
   * @returns {Promise<Object>}
   */
  gcode: async (raw, theme, scene) =>
  {
    const parser = new GCodeParser(
      theme.extrusionColor,
      theme.pathColor
    );

    const object = await parser.parse(raw);

    //Add to scene
    scene.add(object.extrusion);
    scene.add(object.path);

    //Return for later manipulation
    return object;
  },

  /**
   * @function Update object position
   * @param {Object} object Object
   * @param {Object} position Position
   */
  position: (object, position) =>
  {
    const {X, Y, Z} = position;
    object.extrusion.position.set(X, Y, Z);
    object.path.position.set(X, Y, Z);
  },

  /**
   * @function Update object rotation
   * @param {Object} object Object
   * @param {Object} rotation Rotation
   */
  rotation: (object, rotation) =>
  {
    let {X, Y, Z} = rotation;
    X *= Math.PI / 180;
    Y *= Math.PI / 180;
    Z *= Math.PI / 180;
    object.extrusion.rotation.set(X, Y, Z);
    object.path.rotation.set(X, Y, Z);
  },

  /**
   * @function Update object scale
   * @param {Object} object Object
   * @param {Object} scale Scale
   */
  scale: (object, scale) =>
  {
    const {X, Y, Z} = scale;
    object.extrusion.scale.set(Z, X, Y);
    object.path.scale.set(Z, X, Y);
  },

  /**
   * @function Update scene theme
   * @param {Object} object Object
   * @param {Object} theme Theme
   * @param {PlaneGeometry} plane ThreeJS plane
   * @param {Scene} scene Scene
   */
  theme: (object, theme, plane, scene) =>
  {
    object.extrusion.material.color.set(theme.extrusionColor);
    object.path.material.color.set(theme.pathColor);
    plane.material.color.set(theme.bedColor);
    scene.background.set(theme.backgroundColor);
  }
};

//Export
export default {update};