<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Proyectos </strong>
      </CCardHeader>
    </CCard>
    <CRow>
      <CCol sm="6" md="6" v-for="item in items" :key="item.id_proyecto">
        <b-card border-variant="primary">
          <b-card-title>{{ item.nombre_proyecto }}</b-card-title>
          <br />
          <b-card-text>
            Fecha Inicio : {{ item.fecha_ini }} <br />
            Fecha Termino: {{ item.fecha_fin }}<br />
            Estado: <span class="badge badge-success">Activo</span> <br />
            <br />
            <label for="">{{ item.nombre_rol }}</label>
            <div class="row" style="margin-left: 4px; margin-top: 2px">
              <br />
            </div>
            <b-button
              type="button"
              style="float: right"
              variant="primary"
              @click="Tareas(item.id_miembro_proyecto)"
              class="p-2 px-4 btn-xs"
            >
              Tareas
            </b-button>
          </b-card-text>
        </b-card>
      </CCol>
    </CRow>
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
//import ModalMiembro from "./components/ModalMiembro";

export default {
  name: "list",
  props: {
    id: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  components: {},
  data: function () {
    return {
      items: [],
      id_usuario: 1,
      modelo: {
        id_usuario: 0,
      },
    };
  },
  mounted() {
    if (localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
    this.ListProyecto();
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    ListProyecto() {
      let me = this;
      let url = me.url_base + "proyecto-menber/" + me.modelo.id_usuario;
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {
          //    console.log(response);
          if (response.data.status == 200) {
            me.items = response.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Tareas(id_miembro_proyecto) {
      this.$router.push({
        name: "tarasmenber",
        params: { id_miembro_proyecto: id_miembro_proyecto },
      });
    },
  },
};
</script>
