<template>
  <div>
    <h5>mapa de calor</h5>
    <vue-google-heatmap
      :lat="-18.0098285"
      :lng="-70.2426874"
      :points="points"
      :width="1290"
      :height="600"
    />
  </div>
</template>

<script>
import Vue from "vue";

import VueGoogleHeatmap from "vue-google-heatmap";

Vue.use(VueGoogleHeatmap, {
  apiKey: "AIzaSyCM8Ig4QP2vkHy8ln4l5lvjtloSH8AU50Q",
});

export default {
  data() {
    return {
      points: [
        { lat: -18.0098285, lng: -70.2426874 },
        { lat: -18.0098285, lng: -70.2426874 },
        { lat: -18.0099295, lng: -70.2426884 },
        { lat: -18.0099296, lng: -70.2426884 },
        { lat: -18.0098297, lng: -70.2426894 },
        { lat: -18.0098298, lng: -70.2426894 },
        { lat: -18.0098299, lng: -70.2426895 },
      ],
      center: {
        lat: -18.0317588,
        lng: -70.2556131,
      },
      markers: [
        {
          position: { lat: -18.0287232, lng: -70.2675 },
          weight: 100,
          title: "aquie stoy weee",
        },
        {
          position: { lat: -18.0587232, lng: -70.6675 },
          weight: 100,
          title: "AYUDA WEEEE",
        },
        {
          position: { lat: -18.0557232, lng: -70.6675 },
          weight: 100,
          title: "AYUDA WEESDSDFEE",
        },
      ],
    };
  },
  computed: {},
};
</script>

<style>
</style>