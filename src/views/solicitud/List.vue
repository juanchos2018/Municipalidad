<template>
  <div>

 <CCard>
   <CCardBody>
            <CRow>
              <CCol sm="6">
                  <label for="">Proyecto</label>
                  <b-form-select v-model="proyectoId" @change="handleChange" :options="itemPro"></b-form-select>
           
              </CCol>  
 </CRow> 
               </CCardBody>
  </CCard>


    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="items">
          <template #header>
            <CIcon name="cil-grid"/> Solicitudes de Proyecto
            <div class="card-header-actions">
              <a 
                href="https://coreui.io/vue/docs/components/nav" 
                class="card-header-action" 
                rel="noreferrer noopener" 
                target="_blank"
              >
                <small class="text-muted">docs</small>
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
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
import CTableWrapper from './components/Table'
import usersData from '../users/UsersData'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data(){
      return {
        items:[],
        itemPro:[],  
        proyectoId:null, 
        modelo:{                
                id_proyecto:0,             
                id_usuario:0,           
            },      
      }
  },
  mounted(){
        //this.ListarMetodologias();
        if(localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
        this.ListProyecto();
    },
     computed: {
    ...mapState(["url_base"]),
    },
  methods: {
    handleChange(){

    },
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
     ListProyecto() {
            let me = this;
            let url = me.url_base + "proyecto-menber/" + me.modelo.id_usuario;
            axios({
                method: "GET",
                url: url,
            }).then(function (response) {              
                    if (response.data.status == 200) {
                        let temp=[];
                        temp=response.data.result;
                        temp.map(function(x){
                             //me.itemPro = response.data.result;
                             me.itemPro.push({text: x.nombre_proyecto,value:x.id_proyecto});
                         });
                       // me.items = response.data.result;
                    }
                })
                .catch((error) => {
                console.log(error);
                });
      }, 
  }
}
</script>
