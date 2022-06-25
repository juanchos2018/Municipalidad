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
import EventBus from '@/assets/js/EventBus';
import { mapState } from "vuex";
const axios = require("axios").default;
export default {
  data() {
    return {
      points: [ ],
      center: {
        lat: -18.0317588,
        lng: -70.2556131,
      },      
    };
  },
  computed: {
    ...mapState(["url_base"])  
  },
  mounted () {
    this.get();   
  },
  methods: {    
       get(){
        let me=this;
        let url = me.url_base + "incidence-calor";
          axios({
              method: "GET",
              url: url, 
          })
          .then(function (response) {
              console.log(response)
          if (response.data.status == 200) {        
              me.points = response.data.result;
          } else {        
              alert("lista vacia");            
          }
        })
    },
  }
};
</script>

<style>
</style>