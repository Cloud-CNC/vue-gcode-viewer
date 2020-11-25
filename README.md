# Vue GCODE Viewer
![status](https://img.shields.io/badge/status-discontinued-red)

A Vue component for displaying GCODE via Three.JS (100% client-side).

# THIS PACKAGE IS DISCONTINUED AND NO LONGER RECEIVES UPDATES!
Please switch to Vue 3D Viewer ([vue-3d-viewer](https://github.com/cloud-cnc/vue-3d-viewer)) which adds support for many more file formats, multithreading, and more.

## Documentation
### Props
Name | Type | Description | Example
--- | --- | --- | ---
`bed` | Object | Bed size | `{X: 22.3, Y: 22.3}`
`gcode` | String | Raw GCODE | `G0 X0 Y0 Z0`
`position` | Object | GCODE Position | `{X: 11.15, Y: 0, Z: 11.15}`
`rotation` | Object | GCODE Rotation | `{X: -90, Y: 0, Z: 180}`
`scale` | Object | GCODE Scale | `{X: 0.1, Y: 0.1, Z: 0.1}`
`theme` | Object | Theme colors | `{extrusionColor: "#4287f5", pathColor: "#0a2f6b",bedColor: "#586375", backgroundColor: "#dfe4ed"}`

### Examples
* [Demo](./src/demo)
* [Cloud CNC](https://github.com/Cloud-CNC/frontend/blob/development/src/views/file.vue#L43)

*Note: These examples might use an outdated version of `vue-gcode-viewer`.*

## Reuse
If you're interested in reusing primarily the non-Vue code from this module, you may be interested in [gcode-parser.js](./src/assets/gcode-parser.js), [scene.js](./src/assets/scene.js), and [utils.js](./src/assets/utils.js).

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCloud-CNC%2Fvue-gcode-viewer.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FCloud-CNC%2Fvue-gcode-viewer?ref=badge_large)
