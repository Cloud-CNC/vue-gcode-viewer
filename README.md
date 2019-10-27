# Vue GCODE Viewer
A Vue component for displaying GCODE via Three.JS

## Demo
*Uses Ultimaker 2 dimensions for bed size*

[![Edit Vue GCODE Loader](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-gcode-loader-exvqi)

## Documentation
### Props
Name | Type | Description | Example
--- | --- | --- | --- | ---
`bed` | Object | Bed size | `{X: 22.3, Y: 22.3}`
`gcode` | String | Raw GCODE | `G0 X0 Y0 Z0`
`position` | Object | GCODE Position | `{X: 11.15, Y: 0, Z: 11.15}`
`rotation` | Object | GCODE Rotation | `{X: -90, Y: 0, Z: 180}`
`scale` | Object | GCODE Scale | `{X: 0.1, Y: 0.1, Z: 0.1}`
`theme` | Object | Theme colors | `{extrusionColor: "#4287f5", pathColor: "#0a2f6b",bedColor: "#586375", backgroundColor: "#dfe4ed"}`

### How it works
Vue GCODE Viewer works by first passing the user-supplied GCODE to the [parser](./lib/gcode-parser.js). The parser returns 2 THREE.JS Line objects, one containing the extruded material pathway and one containing the travel/jog pathway. The Vue [component](./lib/index.vue) then adds the two objects to a THREE.JS scene which is rendered via WebGL.