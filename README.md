# Vue GCODE Viewer
A [Vue](https://github.com/vuejs/vue) component for displaying GCODE via [Three.JS](https://github.com/mrdoob/three.js)

## Usage
```Vue
<template>
  <gcode-viewer :raw="gcode" :theme="theme"/>
</template>

<script>
import vueGcodeViewer from 'vue-gcode-viewer';
export default {
  components: {
    'gcode-viewer': vueGcodeViewer
  },
  data: {
    gcode: `
      G0 X0 Y0 Z0
    `,
    theme: {
      "extrusionColor": "#4287f5",
      "pathColor": "#0a2f6b",
      "planeColor": "#b4c3db",
      "backgroundColor": "#586375"
    }
  }
}
</script>
```

## Documentation
### Props
* `raw`: String containing raw GCODE (Such as from an API). Read [gcode-parser.js](lib/gcode-parser.js#L66) for all supported GCODE commands.
* `theme`: Object containing 4 properties, see below for example.

*Colors can be any of the constructors parameters for a [Three.JS color](https://threejs.org/docs/#api/en/math/Color)*
```JavaScript
{
  "extrusionColor": "<string>",
  "pathColor": "<string>",
  "planeColor": "<string>",
  "backgroundColor": "<string>"
}
```
