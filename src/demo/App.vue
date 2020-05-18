<template>
  <v-app>
    <v-navigation-drawer permanent width="400">
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Bed</v-list-item-title>
            <v-list-item-action-text>
              <slider label="X" v-model="viewer.bed.X" />
              <slider label="Y" v-model="viewer.bed.Y" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Position</v-list-item-title>
            <v-list-item-action-text>
              <slider label="X" :min="-20" :max="20" v-model="viewer.position.X" />
              <slider label="Y" :min="-20" :max="20" v-model="viewer.position.Y" />
              <slider label="Z" :min="-20" :max="20" v-model="viewer.position.Z" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Rotation</v-list-item-title>
            <v-list-item-action-text>
              <slider label="X" :min="-180" :max="180" v-model="viewer.rotation.X" />
              <slider label="Y" :min="-180" :max="180" v-model="viewer.rotation.Y" />
              <slider label="Z" :min="-180" :max="180" v-model="viewer.rotation.Z" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Scale</v-list-item-title>
            <v-list-item-action-text>
              <slider label="X" :min="0" :max="10" v-model="viewer.scale.X" />
              <slider label="Y" :min="0" :max="10" v-model="viewer.scale.Y" />
              <slider label="Z" :min="0" :max="10" v-model="viewer.scale.Z" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Theme</v-list-item-title>
            <v-list-item-action-text>
              <color-picker label="Extrusion Color" v-model="viewer.theme.extrusionColor" />
              <color-picker label="Path Color" v-model="viewer.theme.pathColor" />
              <color-picker label="Bed Color" v-model="viewer.theme.bedColor" />
              <color-picker label="Background Color" v-model="viewer.theme.backgroundColor" />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <gcode-viewer
      class="emulate-root"
      :bed="viewer.bed"
      :gcode="viewer.gcode"
      :position="viewer.position"
      :rotation="viewer.rotation"
      :scale="viewer.scale"
      :theme="viewer.theme"
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

.v-list {
  max-height: 80vh;
}

.v-navigation-drawer {
  z-index: 5;
}
</style>