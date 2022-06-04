<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center"/>
        <strong>Usuarios </strong>
        <div class="card-header-actions">       
             <CButton  @click="modalUsuario" block color="primary">Nuevo Usuario</CButton>         
        </div>
      </CCardHeader>  
    </CCard>
     <CRow>
      <CCol sm="6" md="4" v-for="item in items" :key="item.id_elemento">
         <CCard accent-color="info">
          <CCardHeader>Usuario</CCardHeader>
          <CCardBody>
              <label for="">  {{item.nombre_usuario}}</label> <br>
              <label for="">  {{item.nombre_tipo}}</label>
            </CCardBody>
        </CCard>
      </CCol>    
    </CRow>

    <ModalUsuario  v-on:ListUsuario="ListUsuario"  />

  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import ModalUsuario from './components/ModalUsuario'

export default {
  name: 'Cards',
  components:{
    ModalUsuario
  },
  data: function () {
    return {        
      modal:false,  
      items:[]  
   }
  },
  mounted() {
    this.ListUsuario();
  },
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
     modalUsuario() {
       EventBus.$emit('ModalUsuario');
    },
    CerrarModal() {
      this.primaryModal = false;      
    },
    ListUsuario(){  
     let me=this;
     let url = this.url_base + "usuario-all";
        axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {
            //console.log(response)
        if (response.data.status == 200) {
            //me.rows = response.data.result.total;
            me.items = response.data.result;
        } else {
        // Swal.fire({ icon: 'error', text: 'A Ocurrido un error', timer: 2000,})
            alert("error");
            
        }
        })
    }
   
  },
}
</script>
