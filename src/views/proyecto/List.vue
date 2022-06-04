<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Proyectos  </strong>
        <div class="card-header-actions">
          <CButton @click="nuevoProyecto" block color="primary">Nuevo Proyecto</CButton>
        </div>
      </CCardHeader>
    </CCard>
    <CRow>
      <CCol sm="6" md="6" v-for="item in items" :key="item.id_proyecto">
          <b-card  border-variant="primary" >
            <b-dropdown no-caret  variant="#FFFFF" style="float:right;font-weight: 400" right >      
                 <template slot="button-content">
                    <i class="py-0 fa fa-cog"></i>                  
                </template>      
                    <b-dropdown-item @click="NuevoMiembro(item.id_proyecto)">Nuevo Miembro</b-dropdown-item>
                    <b-dropdown-item @click="Menber(item.id_proyecto)">Miembros</b-dropdown-item>  
                </b-dropdown>             
            <b-card-title>{{item.nombre_proyecto}}</b-card-title>  
            <br>    
             
            <b-card-text>
                Fecha Inicio :  {{item.fecha_ini}} <br>
                Fecha Termino:  {{item.fecha_fin}}<br>
                Estado:  <span class="badge badge-success">Activo</span>  <br>
                 <br>
                <div class="row"  style="margin-left:4px;margin-top:2px" >
                    <br>                 
                  <div   v-for="item1 in item.listaMiembros" :key="item1.id_usuario"> 
                  
                  <div style="margin-left:8px;margin-right:5px">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" role="img" class="c-icon c-icon-custom-size" height="25"><path d="M16.005 0c2.13-0.026 4.188 0.802 5.708 2.302s2.375 3.547 2.375 5.682c0 2.135-0.854 4.182-2.375 5.682s-3.578 2.328-5.708 2.302c-4.37-0.057-7.885-3.615-7.885-7.984s3.516-7.927 7.885-7.984zM28.969 17.37h-0.042l-6.036-2.99c-0.422-0.208-0.932-0.052-1.167 0.354-1.552 2.599-3.49 4.943-5.745 6.958-2.24-2.010-4.167-4.349-5.714-6.932-0.234-0.411-0.745-0.568-1.167-0.359l-6.047 2.969h-0.042c-0.417 0.245-0.563 0.776-0.328 1.203 1.672 2.885 3.708 5.547 6.068 7.906l-0.005 0.005c0.031 0.031 0.068 0.063 0.099 0.094 0.448 0.448 0.901 0.885 1.37 1.307 0.109 0.099 0.219 0.193 0.328 0.292 0.422 0.37 0.844 0.74 1.281 1.094 0.193 0.156 0.396 0.302 0.589 0.453 0.37 0.286 0.734 0.578 1.115 0.854 0.589 0.422 1.188 0.833 1.797 1.219 0.406 0.26 0.927 0.271 1.344 0.026 0.646-0.417 1.281-0.854 1.901-1.307 0.094-0.068 0.177-0.141 0.271-0.203 0.474-0.354 0.948-0.719 1.411-1.094 0.313-0.255 0.615-0.521 0.917-0.786 0.229-0.193 0.453-0.385 0.677-0.589 0.391-0.359 0.771-0.724 1.151-1.099 0.078-0.083 0.167-0.156 0.25-0.24h-0.005c2.365-2.37 4.411-5.036 6.083-7.932 0.229-0.432 0.073-0.969-0.354-1.203z"></path></svg>   
                          <div  v-c-tooltip="item1.nombre_rol"
                            color="primary"   >{{item1.nombre_usuario}}</div>  
                  </div>
                                               
                  </div>
                 </div>    
                  <b-button type="button"  style="float:right" variant="primary" @click="ViewProyect(item.id_proyecto)" class="p-2 px-4 btn-xs">
                        Detalle               
                     </b-button>           
            </b-card-text>               
            </b-card>
       
      </CCol>
    </CRow>

  <modal-miembro v-on:ListProyecto="ListProyecto"  />
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
import ModalMiembro from "./components/ModalMiembro";


export default {
  name: "list",
  props: {
    id: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  components: {
    ModalMiembro  
  },
  data: function () {
    return {     
      items: [],        
      id_usuario:1,
      nobres:0,
      apelisdsd:'',
      darta:[],

      
    };
  },
  mounted() {
    this.ListProyecto();  
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    ListProyecto(){
      let me = this;
      let url = me.url_base + "proyecto-user/" + me.id_usuario;
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {      
          // console.log(response);
          if (response.data.status == 200) {     
             me.items = response.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    NuevoMiembro(id_proyecto) {
      EventBus.$emit("ModalMiembro",id_proyecto);
    },
    nuevoProyecto(){
        this.$router.push({name:"proyectonuevo"})
    },  
    Menber(id_proyecto) {
      this.$router.push({name:"member",params:{id_proyecto:id_proyecto}});     
    },
    ViewProyect(id_proyecto){
         this.$router.push({name:"viewproyect",params:{id_proyecto:id_proyecto}});
    },
  
  },
};
</script>
