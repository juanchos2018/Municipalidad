<template>
    <CModal
      title="Modal title"
      :show.sync="Show"
      color="primary"
      @hide="CerrarModal"
      footer="false" 
    >
     <CRow>        
         <CCol sm="12">
             <CInput
                label="Nombres"
                placeholder="Ingrese Nombre"
                v-model="model.nombre_usuario"
            />
        </CCol>
         <CCol sm="12">
             <CInput
                label="Apellido"
                placeholder="Ingrese Nombre"
                v-model="model.apellido_usuario"
            />
        </CCol>
          <CCol sm="12">
             <CInput
                label="Correo"
                placeholder="Ingrese Correo"
                v-model="model.correo_usuario"
            />
          </CCol>
          <CCol sm="12">
             <CInput
                label="Pasword"
                placeholder="Ingrese password"
                type="password"
                v-model="model.password_usuario"
            />
          </CCol>
         <CCol sm="12">
                  <label for="">Tipo Usuario</label>
                  <b-form-select v-model="tipouser"  :options="tipoUser"></b-form-select>
          </CCol>
        </CRow>

       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton  color="success" @click="RegistrarUsuario"  >Guardar</CButton>
      </template>
   
    </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
 name: 'modal-usuario',
 props: {},
  data () {
    return {    
       primaryModal1: false,
       Show : false   ,
       model:{nombre_usuario:'',apellido_usuario:'',correo_usuario:'',password_usuario:'',id_tipo:0},    
       tipoUser:[]  ,
       tipouser:null,
     }
   },
   mounted () {
    EventBus.$on('ModalUsuario', () => {
      this.Show = true;    
    });
    this.getTipoUsuario();
  },  
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      RegistrarUsuario(){
        let me =this;  
        //consolel.log()
        if (me.model.nombre_usuario=="") {
          alert("llenar nombre");
        }
        else if (me.model.correo_usuario==""){
            alert("llenar correo_usuario");
        }
        else if(me.model.password_usuario==""){
             alert("llenar password_usuario");
        }     
        else if (me.model.id_tipo==0){
            alert("llenar tipo usuarui");
        }
        else{
           me.model.id_tipo=me.tipouser;
          let data=me.model;    
          let url = me.url_base + "usuario";
          axios({
            method: "POST",
            url: url,
            data: data,
          })
            .then(function (response) {         
            if (response.data.status == 200) {
                let message =response.data.message
                if (message=="Registrado") {
                      me.Show = false; 
                      me.listar();   
                }else{
                  alert(message);            
                }                     
              }      
            }).catch((error) => {
                console.log(error)
            });    
        }
      
                  
      }, 
      listar(){
        this.$emit("ListUsuario");
      },
      getTipoUsuario(){      
        let me =this; 
        let url = me.url_base + "tipo-usuario";
        axios({
            method: "GET",
            url: url  })
          .then(function (response) {         
              let temp=[];
                temp=response.data;
                temp.map(function(x){
                    if (x.id_tipo!=1) {
                         me.tipoUser.push({text: x.nombre_tipo,value:x.id_tipo});
                    }                   
              });   
      
          }).catch((error) => {
              console.log(error)
          }); 
      }

  }
}
</script>

<style>

</style>