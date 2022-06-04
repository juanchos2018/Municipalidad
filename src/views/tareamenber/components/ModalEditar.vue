<template>
    <CModal
      title="Editar Tarea"
      :show.sync="Show"
      color="primary"
      @hide="CerrarModal"
      footer="false" 
    >
     <CRow>
          <CCol sm="12">
         <label for="">{{nombre_usuario}}</label>
        </CCol> 
      <CCol sm="12">
      
          <h5>{{model.titulo}}</h5>
    
        </CCol> 
       <CCol sm="12">
     
      </CCol> 
       <CCol sm="12">
          <label for="">Porcentaje Avance</label>
           <input type="range" style="width:100%" v-model="avance" :disabled="estado=='Terminado'?true:false">
           <label for="">{{avance}}</label>
             <!-- <CFormLabel for="customRange1">Example range</CFormLabel>
            <CFormRange id="customRange1"/> -->
      </CCol>
      <CCol sm="12">
     
            <CInput
                label="Url Evidencia"
                placeholder=""
                v-model="model.url_evidencia"
        />
      </CCol> 

   </CRow>    
       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton  color="success" @click="EditarTarea" >Guardar</CButton>
      </template>   
    </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
 name: 'modal-tarea',
 props: {},
  data () {
    return {           
       Show : false   ,
       model:{id_tarea:0,titulo:'',url_evidencia:'',estado:'Proceso',estado1:'',estado2:'',porcentaje:0,id_miembro_proyecto:0,id_version:0}, 
       nombre_usuario:''   ,
       avance:0,  
       estado:'',
    }
  },
  mounted () {
    EventBus.$on('ModalEditar', (titulo,id_tarea,porcentaje,url_evidencia,estado) => {
      this.avance=porcentaje; 
      this.Show = true;   
      this.model.titulo=titulo;
      this.model.id_tarea=id_tarea; 
      this.estado=estado;
      this.model.url_evidencia=url_evidencia; 
      //this.nombre_usuario=obj.nombre_usuario;
    });
  },   
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      EditarTarea(){
        let me =this;  
        me.model.porcentaje=me.avance;
        if (me.model.url_evidencia=="" ||me.model.url_evidencia==null ) {
            alert("llegar ulr evidendica");
            return;
        }
        let data=me.model;            
        let url = me.url_base + "tarea-menber";
       axios({
          method: "PUT",
          url: url,
          data: data,
        })
          .then(function (response) {
            //console.log(response);
            if (response.data.status == 200) {
              me.Show = false; 
              me.listar();
            } else {
            }
          
          }).catch((error) => {
              console.log(error)
          });             
      }, 
      listar(){
        this.$emit("ListTarea");
      }

  }
}
</script>

<style>

</style>