<template>
    <CModal
      title="Nueva Fase"
      :show.sync="Show"
      color="primary"
      @hide="CerrarModal"
      footer="false" 
    >
 
    <CInput
            label="Nombre Fase"
            placeholder="Ingrese Nombre"
            v-model="model.nombre_fase"
      />

       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton  color="success" @click="RegistrarFase" >Guardar</CButton>
      </template>
   
    </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
 name: 'modal-fase',
 props: {},
  data () {
    return {    
       primaryModal1: false,
       Show : false   ,
       model:{nombre_fase:'',id_metodologia:0},      
    }
  },
  mounted () {
    EventBus.$on('ModalFase', (id) => {
      this.Show = true;    
      this.model.id_metodologia=id;
    });
  },  
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      RegistrarFase(){
          let me =this;  
        if (me.model.nombre_fase=="") {
            alert("nombre fase llenar")
        }else{
        let data=me.model;    
        let url = me.url_base + "fase";
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
              alert(response.data.message);
            }
          }).catch((error) => {
              console.log(error)
          });   
        }
             
      }, 
      listar(){
       this.$emit("ListarFase");
      }

  }
}
</script>

<style>

</style>