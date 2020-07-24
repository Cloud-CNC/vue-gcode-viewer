<template>
  <v-app>
    <v-navigation-drawer dark temporary data-e2e="menu" v-model="drawer" width="400">
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Bed</v-list-item-title>
            <v-list-item-action-text>
              <slider data-e2e="bed-x" label="X" v-model="viewer.bed.X" />
              <slider data-e2e="bed-y" label="Y" v-model="viewer.bed.Y" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Position</v-list-item-title>
            <v-list-item-action-text>
              <slider data-e2e="position-x" label="X" :min="-20" :max="20" v-model="viewer.position.X" />
              <slider data-e2e="position-y" label="Y" :min="-20" :max="20" v-model="viewer.position.Y" />
              <slider data-e2e="position-z" label="Z" :min="-20" :max="20" v-model="viewer.position.Z" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Rotation</v-list-item-title>
            <v-list-item-action-text>
              <slider data-e2e="rotation-x" label="X" :min="-180" :max="180" v-model="viewer.rotation.X" />
              <slider data-e2e="rotation-y" label="Y" :min="-180" :max="180" v-model="viewer.rotation.Y" />
              <slider data-e2e="rotation-z" label="Z" :min="-180" :max="180" v-model="viewer.rotation.Z" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Scale</v-list-item-title>
            <v-list-item-action-text>
              <slider data-e2e="scale-x" label="X" :min="0" :max="10" v-model="viewer.scale.X" />
              <slider data-e2e="scale-y" label="Y" :min="0" :max="10" v-model="viewer.scale.Y" />
              <slider data-e2e="scale-z" label="Z" :min="0" :max="10" v-model="viewer.scale.Z" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Theme</v-list-item-title>
            <v-list-item-action-text>
              <color-picker data-e2e="extrusion-color" label="Extrusion Color" v-model="viewer.theme.extrusionColor" />
            </v-list-item-action-text>
            <v-list-item-action-text>
              <color-picker data-e2e="path-color" label="Path Color" v-model="viewer.theme.pathColor" />
            </v-list-item-action-text>
            <v-list-item-action-text>
              <color-picker data-e2e="bed-color" label="Bed Color" v-model="viewer.theme.bedColor" />
            </v-list-item-action-text>
            <v-list-item-action-text>
              <color-picker data-e2e="background-color" label="Background Color" v-model="viewer.theme.backgroundColor" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-btn icon class="menu-icon" @click="drawer = !drawer" data-e2e="toggle-menu">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <gcode-viewer
      :bed="viewer.bed"
      :gcode="viewer.gcode"
      :position="viewer.position"
      :rotation="viewer.rotation"
      :scale="viewer.scale"
      :theme="viewer.theme"
      class="emulate-root"
      data-e2e="gcode-viewer"
    />
  </v-app>
</template>

<script>
//Imports
import gcode from './Benchy.gcode';
import colorPicker from './color-picker';
import slider from './slider.vue';

export default {
  data: () => ({
    drawer: false,
    viewer: {
      bed: {
        X: 10,
        Y: 10
      },
      gcode,
      position: {
        X: 5,
        Y: 0,
        Z: -5
      },
      rotation: {
        X: -90,
        Y: 0,
        Z: 180
      },
      scale: {
        X: 0.1,
        Y: 0.1,
        Z: 0.1
      },
      theme: {
        extrusionColor: '#4287f5',
        pathColor: '#0a2f6b',
        bedColor: '#586375',
        backgroundColor: '#dfe4ed'
      }
    }
  }),
  components: {
    'color-picker': colorPicker,
    slider
  }
};
</script>

<style>
:root {
  overflow-y: auto;
}

.emulate-root {
  background: var(--foreground);
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.menu-icon {
  left: 5px;
  position: absolute !important;
  top: 5px;
  z-index: 5;
}

.v-list {
  max-height: 80vh;
}

.v-navigation-drawer {
  z-index: 10;
}
</style>