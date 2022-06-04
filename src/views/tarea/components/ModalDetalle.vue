<template>
  <CModal
    title="Detalle Tarea"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
  >
    <b-card :title="tarea.titulo" :sub-title="tarea.descripcion">
      <CRow>
        <CCol sm="12">
          <CProgress
            color="gradient-success"
            :value="tarea.porcentaje"
            class="progress-xs my-3 mb-0"
          />
        </CCol>
        <CCol sm="6">
          <label for="">Fecha Inicio</label>
        </CCol>
        <CCol sm="6">
          <label for="">{{ tarea.fecha_inicio }}</label>
        </CCol>
        <CCol sm="6">
          <label for="">Fecha Termino</label>
        </CCol>
        <CCol sm="6">
          <label for="">{{ tarea.fecha_termino }}</label>
        </CCol>

        <CCol sm="6">
          <label for="">Ultima Modificacion</label>
        </CCol>
        <CCol sm="6">
          <label for="">{{ tarea.updated_at }}</label>
        </CCol>
      </CRow>

      <a
        v-if="tarea.url_evidencia != null"
        :href="tarea.url_evidencia"
        target="_blank"
        class="card-link"
        >link Evidencia</a
      >
      <br> <br>
      <div v-if="tarea.porcentaje==100">
        <div v-if="tarea.estado2=='Revision'">
         <b-button variant="success" @click="AprobarTarea()" > Aprobar Tarea </b-button>
        </div>
        <div v-if="tarea.estado2=='Aprobado'">
          <h5>Aprobado</h5>
         </div>
      </div>
    </b-card>

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
    </template>
  </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
  name: "modal-tarea",
  props: {},
  data() {
    return {
      Show: false,
      model: {
        titulo: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_termino: "",
        estado: "Nuevo",
        estado1: "Nuevo",
        porcentaje: 0,
        id_miembro_proyecto: 0,
        id_version: 0,
      },
      nombre_usuario: "",
      tarea: {},
    };
  },
  mounted() {
    EventBus.$on("ModalDetalle", (id_tarea) => {
      this.Show = true;
      this.ViewInfo(id_tarea);   
    });
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    CerrarModal() {
      this.Show = false;
    },
    AprobarTarea(){
      let me = this;
      let data=me.tarea;
      let url = me.url_base + "tarea-ssucess";
      axios({
        method: "PUT",
        url: url,
        data:data,
      })
        .then(function (response) {        
           console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ViewInfo(id_tarea) {
      let me = this;
      let url = me.url_base + "tarea-view/" + id_tarea;
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {        
          if (response.data.status == 200) {
            me.tarea = response.data.result;         
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listar() {
    //  this.$emit("ListTareaVersion", this.model.id_version);
    },
  },
};
</script>

<style>
</style>