<template>
    <CModal
      title="Nueva Tarea"
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
      <CInput
            label="Titulo"
            placeholder="Ingrese titulo"
            v-model="model.titulo"
      />
        </CCol> 
       <CCol sm="12">
      <CInput
            label="descripcion"
            placeholder="Ingrese descripcion"
            v-model="model.descripcion"
      />
      </CCol> 
       <CCol sm="12">
          <label for="">Fecha Inicio</label>
          <b-form-input type="date" ref="broadcast_date"   v-model="model.fecha_inicio" ></b-form-input>
      </CCol>
      <CCol sm="12">
          <label for="">Fecha Fin</label>
          <b-form-input type="date" ref="broadcast_date"  v-model="model.fecha_termino" ></b-form-input>
      </CCol> 

   </CRow>    
       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton  color="success" @click="RegistrarTarea" >Guardar</CButton>
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
       model:{titulo:'',descripcion:'',fecha_inicio:'',fecha_termino:'',estado:'Nuevo',estado1:'Nuevo',porcentaje:0,id_miembro_proyecto:0,id_version:0}, 
       nombre_usuario:''     
    }
  },
  mounted () {
    EventBus.$on('ModalTarea', (obj) => {
      this.Show = true;   
      this.model.id_miembro_proyecto=obj.id_miembro_proyecto;
      this.model.id_version=obj.id_version; 
      this.nombre_usuario=obj.nombre_usuario;
    });
  },   
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      RegistrarTarea(){
        let me =this;  
        let data=me.model;    
        let url = me.url_base + "tarea";
       axios({
          method: "POST",
          url: url,
          data: data,
        })
          .then(function (response) {          
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
        this.$emit("ListTareaVersion",this.model.id_version);
      }

  }
}
</script>

<style>

</style>