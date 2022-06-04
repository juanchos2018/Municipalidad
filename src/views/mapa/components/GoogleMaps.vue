<template>
  <div>
    <gmap-map :center="center" :zoom="13" style="width: 100%; height: 555px">
      <gmap-marker
        :key="index"
        v-for="(gmp, index) in array"
        :position="gmp"
        :title="gmp.title"
        @click="openInfoWindowTemplate(index)"
      ></gmap-marker>
      <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: -35 }
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open=false">
        <div v-html="infoWindow.template"></div>
    </gmap-info-window>
    </gmap-map>

    <!-- <GmapMap
      :center="{ lat: -18.0317588, lng: -70.2556131 }"
      :zoom="14"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
    >
    <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :title="m.title"
    :clickable="true"
    :draggable="true"
  />
    </GmapMap> -->
  </div>
</template>

<script>
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCM8Ig4QP2vkHy8ln4l5lvjtloSH8AU50Q",
    libraries: "places",
  },
});
export default {
  props: ["array"],
  data() {
    return {
      center: {
        lat: -18.0317588,
        lng: -70.2556131,
      },
      locations: [],
      currentLocation: null,
      infoWindow: {
          position: {lat: 0, lng: 0},
          open: false,
          template: ''
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
  mounted() {
    this.setLocationLatLng();
  },
  methods: {
    setPlace(loc) {
      this.currentLocation = loc;
    },
    openInfoWindowTemplate(index) {
            const { lat, lng, name, title, desrciption } = this.array[index]
            this.infoWindow.position = { lat: lat, lng: lng }
            this.infoWindow.template = `<b>${title}</b><br>${desrciption}<br>`
            this.infoWindow.open = true
    },
    setLocationLatLng: function () {
      navigator.geolocation.getCurrentPosition((geolocation) => {
        this.center = {
          lat: geolocation.coords.latitude,
          lng: geolocation.coords.longitude,
        };
      });

      this.locations = [
        {
          lat: -18.0287232,
          lng: -70.2675,
          label: "United States",
          title: "United States",
        },
        {
          lat: -18.0287232,
          lng: -70.2175,
          label: "St. Louis",
          title: "Louis",
        },
        {
          lat: -18.0287232,
          lng: -70.2375,
          label: "Barcelona",
          title: "Barcelona",
        },
      ];
    },
  },
};
</script>

<style>
</style>