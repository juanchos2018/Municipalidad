<template>
  <div>
    <div>
      <h4 style="float: left">fecha Actual</h4>
      <br /><br />
      <b-form inline>
        <b-form-input class="mb-2 mr-sm-2 mb-sm-0" type="date"></b-form-input>
        <CButton color="info" style="float: left"> &nbsp;Mostrar Todo </CButton>
        <h4 style="margin-left:20%">Incidencias</h4>
      </b-form>
    </div>
    <div>
      <GoogleMap :array="locations" />
    </div>
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMaps";
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";

import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
window.Echo = new Echo({
  broadcaster: "pusher",
  host: "192.168.1.209:8000/",
  wsPort: 8000,
  key: "82e50670bca8ae634294",
  cluster: "us2",
  forceTLS: true,
});

import { mapState } from "vuex";
export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      locations: [],
    };
  },
  computed: {
    ...mapState(["url_base"]),
  },
  mounted() {
    this.ListIncidences();
    window.Echo.channel("pizza-tracker").listen("MessageEvent", (e) => {
      console.log(e);
      console.log("llega dede app");
      this.ListIncidences();
    });
  },
  methods: {
    ListIncidences() {
      let me = this;
      let url = this.url_base + "incidence";
      axios({
        method: "GET",
        url: url,
      }).then(function (response) {
        let result = response.data.result;
        result.map(function (x) {
          me.locations.push({
            lat: parseFloat(x.lat),
            lng: parseFloat(x.lon),
            label: x.location,
            title: x.location,
            desrciption: x.descrition,
          });
        });
      });
    },
  },
};
</script>

<style>
</style>