<template>
    <CModal
      title="Nuevo Rol"
      :show.sync="Show"
      color="primary"
    
      footer="false" 
    >
    <CInput
            label="Rol"
            placeholder="Ingrese Nombre"
            v-model="model.nombre_rol"
      />
       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton  color="success" @click="RegistrarElemento" >Guardar</CButton>
      </template>
   
    </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
 name: 'Modals',
 props: {},
  data () {
    return {    
       primaryModal1: false,
       Show : false   ,
       model:{nombre_rol:''},      
    }
  },
  mounted () {
    EventBus.$on('ModalRol', () => {
      this.Show = true;    
    });
  },
   watch: {     
    },
    computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      RegistrarElemento(){
        let me =this;  
        if (me.model.nombre_rol=="") {
          alert("poner nombre");
        }else{
        
          let data=me.model;    
          let url = me.url_base + "rols";
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
                alert(response.data.message)
              /// Swal.fire({ icon: 'error', text: 'A ocurrido un error e', timer: 3000,})
              }
              
            }).catch((error) => {
                console.log(error)
            }); 
        }
                  
      }, 
      listar(){
        this.$emit("ListRol");
      }

  }
}
</script>

<style>

</style>