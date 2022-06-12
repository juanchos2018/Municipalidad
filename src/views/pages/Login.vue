<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>

<!-- <GmapMap
 :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: true,
   disableDefaultUi: false
 }"
>
</GmapMap> -->

<!-- 
       <GmapMap :latitude= 13.7013266 :longitude= -89.226622 :title="'Titulo Marcador'" /> -->

<!-- 
  <GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>

</GmapMap> -->

      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
   
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Inicio de  Sesion</h1>
                  <p class="text-muted">Ingrese su Cuenta</p>
                  <CInput
                    placeholder="Correo"
                    autocomplete="username email"
                    v-model="model.correo_usuario"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Contraseña"
                    type="password"
                    autocomplete="curent-password"
                      v-model="model.password_usuario"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-center">
                      <CButton color="primary" class="px-4" @click="Login" >Ingresar</CButton>
                    </CCol>
                  
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>          
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

const axios = require("axios").default;
import { mapState } from "vuex";
import EventBus from "@/assets/js/EventBus";

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCM8Ig4QP2vkHy8ln4l5lvjtloSH8AU50Q',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

})

export default {
  name: 'Login',
  data(){
    return {
        model: {correo_usuario:'pedro@gmail.com',password_usuario:''}
    } 
  },
  computed: {
    ...mapState(["url_base"])  
  },
  created(){
   // window.location.reload()
  },
  mounted(){
    
    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({lat: 1.38, lng: 103.80})
    // })
     EventBus.$on('Reload', () => {
      this.reload(); 
      console.log("reload")
    });
  },
  methods:{
    reload(){
      window.location.reload()
    },
    Login(){
        let me =this;  
        if (me.model.correo_usuario=="") {
            alert("ingrear su correo")
        }
        else if(me.model.password_usuario==""){
            alert("ingrear su constraseña")
        }
        else{       
            let data=me.model;           
            let url = me.url_base + "authenticate";
            me.$session.start()
            me.$router.push({ name: "Home"})
          // axios({
          //     method: "POST",
          //     url: url,
          //     data: data,
          //   })
          // .then(function (response) {  
          //   if (response.data.status == 200) {
          //       window.localStorage.clear();
          //       window.localStorage.setItem("nombre", response.data.result.nombre_usuario);
          //       window.localStorage.setItem("id_tipo", response.data.result.id_tipo);
          //       window.localStorage.setItem("tipoUsuario", response.data.result.nombre_tipo);
          //       window.localStorage.setItem("id_usuario", response.data.result.id_usuario)      
          //       me.$session.start()
          //       me.$router.push({ name: "Home"})       
          //   } else {  
          //     alert(response.data.message);
          //   }        
          // }).catch((error) => {
          //     console.log(error)             
          // });   
        }
    }
  }
}
</script>
