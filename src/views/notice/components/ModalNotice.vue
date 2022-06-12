<template>
  <CModal
    title="Registrar Noticia"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
    size="lg"
  >
    <gmap-map :center="center" :zoom="14" style="width: 100%; height: 400px">
      <gmap-marker
        ref="mapRef"
        :clickable="true"
        :draggable="true"
        :position="marker"
        @dragend="getMarkerPosition($event)"
      ></gmap-marker>
    </gmap-map>
    <CInput
      label="Direccion"
      placeholder="direccion"
      v-model="model.location"
    />
    <CInput label="Titulo" v-model="model.title" />
    <CInput label="Descripcion" v-model="model.description" />

    <b-form-file
      @change="onFileChange"
      v-model="photo"
      placeholder="Seleccione un foto..."
      drop-placeholder="Suelta la imagen aquí..."
    ></b-form-file>

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
      <CButton color="success" @click="Registrar">Guardar</CButton>
    </template>
  </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCM8Ig4QP2vkHy8ln4l5lvjtloSH8AU50Q",
    libraries: "places",
  },
});

export default {
  name: "Modals",
  props: {},
  data() {
    return {
      marker: { lat: -18.0119127, lng: -70.2539776 },
      key: "AIzaSyCM8Ig4QP2vkHy8ln4l5lvjtloSH8AU50Q",
      center: {
        lat: -18.0119127,
        lng: -70.2539776,
      },
      primaryModal1: false,
      Show: false,
      model: {
        title: null,
        description: null,
        photo: null,
        location: null,
        department_id: null,
        province_id: null,
        district_id: null,
      },
      photo: null,
    };
  },
  mounted() {
    EventBus.$on("ModalNoticeShow", () => {
      this.Show = true;
    });
  },
  computed: {
    ...mapState(["url_base","url_maps"]),
  },
  methods: {
    CerrarModal() {
      this.Show = false;
    },
    getMarkerPosition(event) {    
      this.getPositionAddress(event.latLng.lat(), event.latLng.lng());      
    },
    getPositionAddress(lat, lng) {
      console.log(lat,lng);
      let me = this;
      let url =me.url_maps+"json?address="+lat+","+lng+"&key="+me.key;    
      axios({
        method: "GET",
        url: url,
      }).then(function (response) {
          //console.log(response);
         me.model.location=response.data.results[0].formatted_address;
      });
    },
    Registrar() {
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
       
        if (this.model.title==null) {
                alert("llenar campo title")
              }else if (this.model.description==null){
                   alert("llenar campo description")
              }                       
              else {                    
                 let me=this;
                 let url = me.url_base + "notice";
                 let data = new FormData();
                 data.append("title", me.model.title);
                 data.append("description", me.model.description);              
                 data.append("photo", me.model.photo);
                 data.append("date",date);
                 data.append("location", me.model.location);
                 axios.post(url,data).then(response => {   
                          console.log(response)  
                          me.listar();
                          alert("Registrado ");
                        }).catch(function (error) {
                            console.log(error);
                        }) .finally(() => {                     
                  })
            } 
    },
    onFileChange(e) {
      this.model.photo = e.target.files[0];
    },
    listar() {
      this.$emit("get");
    },
  },
};
</script>

<style>
</style>