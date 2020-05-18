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
  watch: {
    //Update plane
    bed: {
      deep: true,
      handler: function ()
      {
        utils.update.bed(this.bed);
      }
    },
    //Update model
    gcode: async function (raw)    
    {
      await utils.update.gcode(raw, this.theme);
      utils.update.position(this.position);
      utils.update.rotation(this.rotation);
      utils.update.scale(this.scale);
    },
    //Update position
    position: {
      deep: true,
      handler: function (value)
      {
        utils.update.position(value);
      }
    },
    //Update rotation
    rotation: {
      deep: true,
      handler: function (value)
      {
        utils.update.rotation(value);
      }
    },
    //Update scale
    scale: {
      deep: true,
      handler: function (value)
      {
        utils.update.scale(value);
      }
    },
    //Update theme
    theme: {
      deep: true,
      handler: function (value)
      {
        utils.update.theme(value);
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
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>