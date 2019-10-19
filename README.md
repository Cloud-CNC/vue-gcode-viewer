# Vue GCODE Viewer
A [Vue](https://github.com/vuejs/vue) component for displaying GCODE via [Three.JS](https://github.com/mrdoob/three.js)

## Usage
### Single File Component
```Vue
<template>
  <gcode-viewer fov="50" url="https://example.com/file.gcode"/>
</template>

<script>
import vueGcodeViewer from 'vue-gcode-viewer';
export default {
  components: {
    'gcode-viewer': vueGcodeViewer
  }
}
</script>
```

## Documentation
### Props
* `fov`: Field of view used for the virtual camera
* `url`: URL of the GCODE
