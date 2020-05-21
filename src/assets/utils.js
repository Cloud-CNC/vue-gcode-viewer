/**
 * @fileoverview ThreeJS scene utilities
 */

//Imports
import {state} from '@/assets/scene';
import GCodeParser from '@/assets/gcode-parser';

/**
 * Update various scene properties
 */
const update = {
  /**
   * @function Update bed
   */
  bed: bed =>
  {
    const {X, Y} = bed;
    state.plane.scale.set(X, Y, 1);
  },

  /**
   * @function Update GCODE
   * @param {String} raw Raw GCODE
   * @param {Object} theme Theme
   * @returns {Promise<void>}
   */
  gcode: async (raw, theme) =>
  {
    const parser = new GCodeParser(
      theme.extrusionColor,
      theme.pathColor
    );

    const object = await parser.parse(raw);

    //Add to scene
    state.scene.add(object.extrusion);
    state.scene.add(object.path);

    //Save for later manipulation
    state.object = object;
  },

  /**
   * @function Update object position
   * @param {Object} position Position
   */
  position: position =>
  {
    const {X, Y, Z} = position;
    state.object.extrusion.position.set(X, Y, Z);
    state.object.path.position.set(X, Y, Z);
  },

  /**
   * @function Update object rotation
   * @param {Object} rotation Rotation
   */
  rotation: rotation =>
  {
    let {X, Y, Z} = rotation;
    X *= Math.PI / 180;
    Y *= Math.PI / 180;
    Z *= Math.PI / 180;
    state.object.extrusion.rotation.set(X, Y, Z);
    state.object.path.rotation.set(X, Y, Z);
  },

  /**
   * @function Update object scale
   * @param {Object} scale Scale
   */
  scale: scale =>
  {
    const {X, Y, Z} = scale;
    state.object.extrusion.scale.set(Z, X, Y);
    state.object.path.scale.set(Z, X, Y);
  },

  /**
   * @function Update scene theme
   * @param {Object} theme Theme
   */
  theme: theme =>
  {
    state.object.extrusion.material.color.set(theme.extrusionColor);
    state.object.path.material.color.set(theme.pathColor);
    state.plane.material.color.set(theme.bedColor);
    state.scene.background.set(theme.backgroundColor);
  }
};

//Export
export default {update};