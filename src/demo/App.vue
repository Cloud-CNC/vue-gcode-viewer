<template>
  <gcode-viewer class="emulate-root" :gcode="gcode" />
</template>

<script>
//Imports
import gcode from './Benchy.gcode';

export default {
  data: () => ({
    gcode
  })
};
</script>

<style>
.emulate-root {
  background: var(--foreground);
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>