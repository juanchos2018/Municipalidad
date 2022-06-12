<template>
  <CModal
    title="Registrar Numero de Ayuda"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
  >
    <CInput label="Grupo" placeholder="Ingrese grupo" v-model="model.grupo" />
    <CInput label="Unidad" placeholder="Ingrese Unidad" v-model="model.unid" />
    <CInput
      label="Telefono"
      placeholder="Ingrese Telefono"
      v-model="model.phone"
    />
    <b-form-file
      @change="onFileChange"
      v-model="photo"
      placeholder="Seleccione un foto..."
      drop-placeholder="Suelta la imagen aquí..."
    ></b-form-file>

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
      <CButton color="success" @click="Registrar">Guardar</CButton>
    </template>
  </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
  name: "Modals",
  props: {},
  data() {
    return {
      primaryModal1: false,
      Show: false,
      model: { grupo: null, unid: null, phone: null, photo: null },
      photo: null,
    };
  },
  mounted() {
    EventBus.$on("ModalNumberShow", () => {
      this.Show = true;
    });
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    CerrarModal() {
      this.Show = false;
    },
    Registrar() {
      let me = this;
      if (me.model.grupo == null) {
        alert("poner nombre");
      } else {
        let url = me.url_base + "helpnumber";
        let data = new FormData();
        data.append("grupo", me.model.grupo);
        data.append("unid", me.model.unid);
        data.append("phone", me.model.phone);
        data.append("photo", me.model.photo);
        axios
          .post(url, data)
          .then((response) => {           
            me.listar();
            alert("Registrado");
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {});
      }
    },
    onFileChange(e) {
      this.model.photo = e.target.files[0];
    },
    listar() {
      this.$emit("get");
    },
  },
};
</script>

<style>
</style>