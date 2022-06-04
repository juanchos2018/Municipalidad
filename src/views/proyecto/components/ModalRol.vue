<template>
  <CModal
    title="EditarRol"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
  >
    <CRow>    

      <CCol sm="12">
        <label for="">Rol</label>       
        <b-form-select v-model="rol" :options="rols"></b-form-select>
      </CCol>
    </CRow>

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
      <CButton color="success" @click="UpdateRol" >Guardar</CButton>
    </template>
  </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
  name: "modal-miembro",
  props: {},
  data() {
    return {
      primaryModal1: false,
      Show: false,
      model: { id_rol:0,id_miembro_proyecto:0},
      users: [],
      rols: [],
      rol: null,
      user: null,
      id_proyecto:0,
    };
  },
  mounted() {
    EventBus.$on("ModalRol", (id_rol,id_miembro_proyecto) => {
      this.Show = true;
      //this.id_proyecto=id_proyecto;
      this.rol=id_rol;
      this.model.id_miembro_proyecto=id_miembro_proyecto;
    });
   // this.getUsuario();
    this.getRol();
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    getUsuario() {
      let me = this;
      let url = me.url_base + "usuario";
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {        
          let temp = [];
          if (response.data.status == 200) {
            // me.users = response.data.result;
            temp = response.data.result;
            temp.map(function (x) {
              me.users.push({ text: x.nombre_usuario, value: x.id_usuario });
            });
          }
          ///me.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
        });
    },
    getRol() {
      let me = this;
      let url = me.url_base + "rols";
      axios({
        method: "GET",
        url: url,
      })
       .then(function (response) {
          let temp = [];
          temp = response.data;
          temp.map(function (x) {
            if (x.nombre_rol!="Jefe de Proyecto") {
                me.rols.push({ text: x.nombre_rol, value: x.id_rol });
            }            
          });
        })
        .catch((error) => {
          console.log(error);
          //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
        });
    },
    CerrarModal() {
      this.Show = false;
    },
    UpdateRol() {
      let me = this;
      me.model.id_rol =me.rol;    
      if (me.model.id_rol==null) {
        alert("elegir el rol");
      }else {
          let data = me.model;
          let url = me.url_base + "miembros/editrol";     
          axios({
            method: "PUT",
            url: url,
            data: data,
          })
            .then(function (response) {            
                console.log(response);
              if (response.data.status==200) {
                me.listar();
                me.Show = false;
              }else{
                alert(response.data.message);
              }                    
            })
            .catch((error) => {
              console.log(error);       
          });
      }      
    },
    listar() {
       this.$emit("ListMember");
    },
  },
};
</script>

<style>
</style>