<template>
  <div>
    <br /><br />
    <gmap-map :center="center" :zoom="13"    style="width: 100%; height: 500px">
      <gmap-marker
        ref="mapRef"
        :key="index"
        v-for="(gmp, index) in array"
        :position="gmp"
        :title="gmp.title"
        @click="openInfoWindowTemplate(index)"
     
      ></gmap-marker>
      <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: -35 },
        }"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open = false"
      >
        <div v-html="infoWindow.template"></div>
      </gmap-info-window>
    </gmap-map>
    <br />
    <br />
    <CRow>
      <CCol sm="3" md="3">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4">
                <img src="../../../assets/bandalismo.png" alt="" width="80" />
              </CCol>
              <CCol sm="6" md="6">
                <p>Vandalismo</p> 
                <h5>5</h5>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
       <CCol sm="3" md="3">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4">
                <img src="../../../assets/robo.png" alt="" width="80" />
              </CCol>
              <CCol sm="6" md="6">
                <p>Robo o Hurto</p>
                 <h5>5</h5>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
       <CCol sm="3" md="3">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4">
                <img src="../../../assets/extorsion.png" alt="" width="80" />
              </CCol>
              <CCol sm="6" md="6">
                <p>Extorsion</p>
                 <h5>5</h5>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
       <CCol sm="3" md="3">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4">
                <img src="../../../assets/acoso.png" alt="" width="80" />
              </CCol>
              <CCol sm="6" md="6">
                <p>Acoso Sexual</p>
                 <h5>5</h5>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
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
      marker: { lat:-18.0317548, lng: -70.2556121 },
      center: {
        lat: -18.0317588,
        lng: -70.2556131,
      },
      currentLocation: null,
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: "",
      },
      show: true,
      isCollapsed: true,
      loremIpsum: "Lorem ipsum dolor sit amet.",
    };
  },
  mounted() {
    // this.setLocationLatLng();
    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({lat: 1.38, lng: 103.80})
    // })
      // this.$refs.mapa.event.addListener(this.map, 'click', e => {       
      //   console.log(e.latLng);       
      // })
  },
  methods: {
    setPlace(loc) {
      this.currentLocation = loc;
    },
      getMarkerPosition (event) {
        console.log(event);
            // this.markerSelected = {
            //       lat: event.latLng.lat(),
            //       lng: event.latLng.lng()
            // }
      },
    openInfoWindowTemplate(index) {
      const { lat, lng, name, title, desrciption } = this.array[index];
      this.infoWindow.position = { lat: lat, lng: lng };
      this.infoWindow.template = `<b>${title}</b><br>${desrciption}<br>`;
      this.infoWindow.open = true;
    },
  },
};
</script>

<style>
svg {
  color: "red";
}
</style>