<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center"/>
        <strong>Tareas </strong>
        <div class="card-header-actions">       
                  
        </div>
      </CCardHeader>  
    </CCard>
     <CRow>
      <CCol sm="6" md="4" v-for="item in items" :key="item.id_tarea">
          <b-card no-body class="overflow-hidden"  footer-tag="footer">
                <b-row no-gutters>
                <b-col md="3">
                    <div align-v="center" >
                        <center> 
                      <svg xmlns="http://www.w3.org/2000/svg" style="margin-top:40px" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="42"><polygon fill="var(--ci-primary-color, currentColor)" points="408 432 376 432 376 464 112 464 112 136 144 136 144 104 80 104 80 496 408 496 408 432" class="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M176,16V400H496V153.373L358.627,16ZM464,368H208V48H312V200H464Zm0-200H344V48h1.372L464,166.627Z" class="ci-primary"></path></svg>
                        </center>
                    </div>     
                </b-col>
                <b-col md="8">
              <b-card-body >                   
                    <b-card-title> <h5> {{item.titulo}}</h5> </b-card-title>                    
                    <b-card-text>
                        <h5>{{item.estado1}}</h5>
                          <div>
                            <CProgress
                              color="gradient-success"
                              :value="item.porcentaje"
                              class="progress-xs my-3 mb-0"
                            />                                 
                        </div>
                        <h5>Res. : {{item.nombre_usuario}}</h5>
                        <div v-if="item.estado2=='Revision'" >
                           <i class="fas fa-hourglass  fa-lg"  style=" float:right;"></i> 
                        </div>
                         <div v-else-if="item.estado2=='Aprobado'" >
                           <i class="fas fa-check fa-lg"  style=" float:right;"></i> 
                        </div>
                    </b-card-text>                
                    </b-card-body>                
                </b-col>      
                  </b-row>      
                      <template #footer  footer-class="myDiv">
                        <div  style="background-color: white; float:right;">                       
                        <b-button variant="success" @click="modalEditar(item.titulo,item.id_tarea,item.porcentaje,item.url_evidencia,item.estado)" > 
                         Editar </b-button>
                        </div>                                          
                    </template>
            </b-card>         
      </CCol>    
    </CRow>
   
    <modal-editar   v-on:ListTarea="ListTareas" />

  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import ModalEditar from './components/ModalEditar.vue';

export default {
  name: 'Cards',
  props:{
     id_miembro_proyecto:{ type: Number}
  },
  components:{
    ModalEditar
  },
  data: function () {
    return {     
      modal:false,       
      items:[],
      modelo:{id_miembro_proyecto:0,id_version:0,nombre_usuario:''}  
   }
  },
  mounted() {   
  //  if (this.id_miembro_proyecto) {
          // var array = this.obj.split("-");
          // this.modelo.id_miembro_proyecto= array[0];
          // this.modelo.id_version=array[1];
          // this.modelo.nombre_usuario=array[2];
          this.ListTareas();
   //  }
  },
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
    modalEditar(titulo,id_tarea,porcentaje,url_evidencia,estado) {
        EventBus.$emit('ModalEditar',titulo,id_tarea,porcentaje,url_evidencia,estado);
    },    
    ListTareas(){  
     let me=this;
     let url = this.url_base + "tarea-menber/"+me.id_miembro_proyecto;
        axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {       
          console.log(response);    
          if (response.data.status == 200) {            
              me.items = response.data.result;
          } 
        })
    }
   
  },
}
</script>
