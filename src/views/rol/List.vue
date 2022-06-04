<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center"/>
        <strong>Roles</strong>
        <div class="card-header-actions">       
             <CButton  @click="modalRol" block color="primary">Nuevo</CButton>         
        </div>
      </CCardHeader>
    </CCard>
     <CRow>
      <CCol sm="6" md="4" v-for="item in items" :key="item.id_rol">
         <CCard accent-color="info">
          <CCardHeader>Rol</CCardHeader>
          <CCardBody>{{item.nombre_rol}}</CCardBody>
        </CCard>
      </CCol>    
    </CRow>

    <ModalRol  v-on:ListRol="getRol"    />

  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import ModalRol from './components/ModalRol'

export default {
  name: 'Cards',
  components:{
    ModalRol
  },
  data: function () {
    return {  
      items:[]  
   }
  },
  mounted() {
    this.getRol();
  },
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
     modalRol() {
       EventBus.$emit('ModalRol');
    },
    CerrarModal() {
      this.primaryModal = false;      
    },
     getRol() {
      let me = this;
      let url = me.url_base + "rols";
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {
          let temp = [];
          me.items = response.data;
        //   temp.map(function (x) {
        //     me.rols.push({ text: x.nombre_rol, value: x.id_rol });
        //   });
        })
        .catch((error) => {
          console.log(error);
          //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
        });
    },
   
  },
}
</script>
