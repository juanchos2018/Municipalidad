<template>
  <CModal
    title="Miembro Nuevo"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
  >
    <CRow>
      <CCol sm="12">
        <label for="">Usuario</label>
        <b-form-select v-model="user" :options="users"></b-form-select>
      </CCol>

      <CCol sm="12">
        <label for="">Rol</label>       
        <b-form-select v-model="rol" :options="rols"></b-form-select>
      </CCol>
    </CRow>

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
      <CButton color="success" @click="RegistrarMiembro" >Guardar</CButton>
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
      model: { id_usuario: 0,id_rol:0,id_proyecto:0},
      users: [],
      rols: [],
      rol: null,
      user: null,
      id_proyecto:0,
    };
  },
  mounted() {
    EventBus.$on("ModalMiembro", (id_proyecto) => {
      this.Show = true;
      this.id_proyecto=id_proyecto;
      this.model.id_proyecto=id_proyecto;
    });
    this.getUsuario();
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
    RegistrarMiembro() {
      let me = this;
      me.model.id_rol =me.rol;
      me.model.id_usuario =me.user;
      if (me.model.id_rol==null) {
        alert("elegir el rol");
      }else if (me.model.id_usuario==null){
        alert("elegir el  usuario");
      }else {
          let data = me.model;
          let url = me.url_base + "miembro";     
          axios({
            method: "POST",
            url: url,
            data: data,
          })
            .then(function (response) {            
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
       this.$emit("ListProyecto");
    },
  },
};
</script>

<style>
</style>