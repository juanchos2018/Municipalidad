<template>
  <CModal
    title="Nueva Version"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
  >
    <CRow>
      <CCol sm="12">
        <label for="">Elemento de Configuracion</label> <br>
        <label for="">{{nombre_elemento}}</label>
      </CCol>
      <CCol sm="12">
        <label for="">Usuario Responsable</label>
        <b-form-select v-model="menber" :options="miembros"></b-form-select>
      </CCol>
      <CCol sm="12">
          <label for="">Fecha Inicio</label>
          <b-form-input type="date" ref="broadcast_date"   v-model="modelo.fecha_inicio" ></b-form-input>
      </CCol>
      <CCol sm="12">
          <label for="">Fecha Fin</label>
          <b-form-input type="date" ref="broadcast_date"  v-model="modelo.fecha_termino" ></b-form-input>
      </CCol>   
      <CCol sm="12">
        <CInput
            label="Numero de version"
            v-model="modelo.version"                  
        />
        </CCol>    
    </CRow>    

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
      <CButton color="success" @click="RegistrarVersion">Guardar</CButton>
    </template>
  </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
  name: "modal-version",
  props: {},
  data() {
    return {    
      Show: false,
      miembros: [],
      menber: null,
      modelo: { fecha_inicio:'',fecha_termino:'',id_cronograma_elemento:0,id_miembro_proyecto:0,version:''},     
      id_proyecto:0,
      nombre_elemento:''
    };
  },
  mounted() {
    EventBus.$on("ModalVersion", (id_proyecto,nombre_elemento,id_cronograma_elemento) => {
      this.Show = true;
      this.id_proyecto=id_proyecto;
      this.nombre_elemento=nombre_elemento;
      this.modelo.id_cronograma_elemento=id_cronograma_elemento;
      this.getMenbers();
    });   
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    getMenbers() {
      let me = this;
      let url = me.url_base + "miembros/"+me.id_proyecto;
      me.miembros=[];
      axios({
        method: "GET",
        url: url,
        })
        .then(function (response) {        
          let temp = [];
          if (response.data.status == 200) {   
           // console.log(response)        
            temp = response.data.result;
            temp.map(function (x) {
              if (x.nombre_rol!="Jefe de Proyecto") {
                    me.miembros.push({ text: x.nombre_usuario, value: x.id_miembro_proyecto });

              }
            });
          }         
        })
        .catch((error) => {
          console.log(error);         
        });
    },  
    CerrarModal() {
      this.Show = false;
    },
    RegistrarVersion() {
      let me = this;
      me.modelo.id_miembro_proyecto =me.menber;
      if (me.modelo.id_miembro_proyecto==null) {
          alert("elegir responsable")
      }
      else if (me.modelo.fecha_inicio=="") {
         alert("elegir fecha inicio")
      }else if (me.modelo.fecha_inicio=="") {
         alert("elegir fecha fin")
      }   
      else if (me.modelo.version=="") {
         alert("llenar  la version")
      }     
      else{
          let data = me.modelo;
          let url = me.url_base + "version";
          //console.log(data);
          axios({
            method: "POST",
            url: url,
            data: data,
          })
            .then(function (response) {
             // me.Show = false;
              if (response.data.status==200) {
                me.listar();
                me.Show = false;
              }else{
                alert(response.data.message);
              } 
              //console.log(response);
                    
            })
            .catch((error) => {
              console.log(error);       
            });
        }  
    },
    listar() {
        this.$emit("ListarFaes");
    },
  },
};
</script>

<style>
</style>