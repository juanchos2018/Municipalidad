<template>
    <CModal
      title="Modal title"
      :show.sync="Show"
      color="primary"
      @hide="CerrarModal"
      footer="false" 
    >
    <CInput
            label="Nombres"
            placeholder="Ingrese Nombre"
            v-model="model.nombre"
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
 name: 'modal-metodologia',
 props: {},
  data () {
    return {    
       primaryModal1: false,
       Show : false   ,
       model:{nombre:''},      
    }
  },
    mounted () {
    EventBus.$on('ModalMetodologia', () => {
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
        if (me.model.nombre=="") {
          alert("llenar nombre");
        }else{
          let data=me.model;    
          let url = me.url_base + "metodologia";
          axios({
            method: "POST",
            url: url,
            data: data,
          })
            .then(function (response) {       
              if (response.data.status == 201) {
                me.Show = false; 
                me.listar();
                //Swal.fire({ icon: 'success', text: 'Se ha registrado el nuevo establecimiento', timer: 3000,})
              } else {
              /// Swal.fire({ icon: 'error', text: 'A ocurrido un error e', timer: 3000,})}
                alert(response.data.message);
              }
              ///me.isLoading = false;
            }).catch((error) => {
                console.log(error)
                //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
            });   
          }                  
      }, 
      listar(){
        this.$emit("ListMetodologia");
      }

  }
}
</script>

<style>

</style>