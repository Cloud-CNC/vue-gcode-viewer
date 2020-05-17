/**
 * @fileoverview Vue GCODE Viewer
 */

//Components
import gcodeViewer from './gcode-viewer.vue';

//Export
export default {
  /**
   * @function Install Vue GCODE Viewer
   * @param {Vue} Vue
   */
  install: Vue =>
  {
    //Register component
    Vue.mixin({
      components: {
        'gcode-viewer': gcodeViewer
      }
    });
  }
};