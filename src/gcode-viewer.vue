<template>
  <div id="canvas" ref="canvas" />
</template>

<script>
import {setup, teardown} from '@/assets/scene';
import utils from '@/assets/utils';

export default {
  props: {
    bed: {
      default: () => ({
        X: 10,
        Y: 10
      }),
      type: Object
    },
    gcode: {
      required: true,
      type: String
    },
    position: {
      default: () => ({
        X: 5,
        Y: 0,
        Z: -5
      }),
      type: Object
    },
    rotation: {
      default: () => ({
        X: -90,
        Y: 0,
        Z: 180
      }),
      type: Object
    },
    scale: {
      default: () => ({
        X: 0.1,
        Y: 0.1,
        Z: 0.1
      }),
      type: Object
    },
    theme: {
      default: () => ({
        extrusionColor: '#4287f5',
        pathColor: '#0a2f6b',
        bedColor: '#586375',
        backgroundColor: '#dfe4ed'
      }),
      type: Object
    }
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
    //Update plane
    bed: {
      deep: true,
      handler: function ()
      {
        utils.update.bed(this.plane, this.bed);
      }
    },
    //Update model
    gcode: function (raw)    
    {
      utils.update.gcode(raw, this.theme, this.scene);
      utils.update.position(this.object, this.position);
      utils.update.rotation(this.object, this.rotation);
      utils.update.scale(this.object, this.scale);
    },
    //Update position
    position: {
      deep: true,
      handler: function (value)
      {
        utils.update.position(this.object, value);
      }
    },
    //Update rotation
    rotation: {
      deep: true,
      handler: function (value)
      {
        utils.update.rotation(this.object, value);
      }
    },
    //Update scale
    scale: {
      deep: true,
      handler: function (value)
      {
        utils.update.scale(this.object, value);
      }
    },
    //Update theme
    theme: {
      deep: true,
      handler: function (value)
      {
        utils.update.theme(this.object, value, this.plane, this.scene);
      }
    }
  },
  mounted: function ()  
  {
    //Setup scene
    setup(this.$refs.canvas, this.bed, this.theme, this.gcode, this.position, this.rotation, this.scale);
  },
  destroyed: function ()  
  {
    //Teardown scene
    teardown();
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