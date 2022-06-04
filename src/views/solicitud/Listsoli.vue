<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="items">
          <template #header>
            <CIcon name="cil-grid"/> Solicitudes
            <div class="card-header-actions">
              <a 
                href="https://coreui.io/vue/docs/components/nav" 
                class="card-header-action" 
                rel="noreferrer noopener" 
                target="_blank"
              >
                <small class="text-muted">algo</small>
              </a>
            </div>
          </template>
        </CTableWrapper>
      </CCol>    
    </CRow> 

    
  </div>
</template>

<script>

const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import CTableWrapper from './components/Table'
import usersData from '../users/UsersData'

export default {
  name: 'Tables',
  components: { CTableWrapper },

  data(){
      return{
          items:[],
          modelo:{id_usuario:0}
      }
  },
  computed: {
    ...mapState(["url_base"])  
  },
   mounted(){
        
        if(localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
          this.ListSolicitud();
    },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },

    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    },
    ListSolicitud(){  
     let me=this;
     let url = this.url_base + "solicitud-jefe/"+me.modelo.id_usuario;
        axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {
            //console.log(response)
        if (response.data.status == 200) {       
            me.items = response.data.result;
        } else {      
            alert("lista vacia");            
           }
        })
    }
  }
}
</script>
