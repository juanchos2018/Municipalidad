<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center"/>
        <strong>Elementos de la Configuracion </strong>
        <div class="card-header-actions">       
             <CButton  @click="modalProducts" block color="primary">Nuevo</CButton>         
        </div>
      </CCardHeader>

  
    </CCard>
     <CRow>
      <CCol sm="6" md="4" v-for="item in items" :key="item.id_elemento">
         <CCard accent-color="info">
          <CCardHeader>Elemento</CCardHeader>
          <CCardBody>{{item.nombre_elemento}}</CCardBody>
        </CCard>
      </CCol>    
    </CRow>

    <ModalElement  @CerrarModal="CerrarModal"   v-on:ListElement="ListElement" />

  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import ModalElement from './components/ModalElement'

export default {
  name: 'Cards',
  components:{
    ModalElement
  },
  data: function () {
    return {
      show: true,
      isCollapsed: true,
      modal:false,
      primaryModal:false,
      

      items:[]  
   }
  },
  mounted() {
    this.ListElement();
  },
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
     modalProducts() {
        EventBus.$emit('ModalProductsShow');
    },
    CerrarModal() {
      this.primaryModal = false;      
    },
    ListElement(){  
     let me=this;
     let url = this.url_base + "elemento";
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
