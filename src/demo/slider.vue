<template>
  <v-slider :label="label" @input="input" :min="min" :max="max" :step="step" :value="value">
    <template v-slot:append>
      <v-text-field dense :label="label" @change="input" :value="value" />
    </template>
  </v-slider>
</template>

<script>
export default {
  name: 'slider',
  props: {
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 20,
      type: Number
    },
    label: {
      required: true,
      type: String
    },
    step: {
      default: 0.1,
      type: Number
    },
    value: {
      required: true,
      type: Number
    }
  },
  methods: {
    input: function(value)
    {
      value = parseFloat(value);

      //Clip number
      if (value > this.max)
      {
        value = this.max;
      }
      else if (value < this.min)
      {
        value = this.min;
      }

      //Emit event
      this.$emit('input', value);
    }
  }
};
</script>

<style>
</style>