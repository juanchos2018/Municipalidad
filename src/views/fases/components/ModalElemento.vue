<template>
  <CModal
    title="Nueva Elemento de configuracion"
    :show.sync="Show"
    color="primary"
    @hide="CerrarModal"
    footer="false"
  >
    <v-select
      placeholder="Seleccione un Elemento"
      class="w-100"
      :filterable="false"
      label="nombre_elemento"
      v-model="elemento"
      @search="SearchElemento"
      :options="elementos"
    ></v-select>

    <template #footer>
      <CButton color="danger" @click="CerrarModal">Cerrar</CButton>
      <CButton color="success" @click="RegistrarPlantilla">Guardar</CButton>
    </template>
  </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue-select/src/scss/vue-select.scss";
export default {
  name: "modal-elemento",
  props: {},
  components: {
    vSelect,
  },
  data() {
    return {
      primaryModal1: false,
      Show: false,
      model: { id_fase: "", id_elemento: 0 },
      elemento: null,
      elementos: [],
    };
  },
  mounted() {
    EventBus.$on("ModalElemento", (id_fase) => {
      this.Show = true;
      this.model.id_fase = id_fase;
    });
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    SearchElemento,
    CerrarModal() {
      this.Show = false;
    },
    Guardar() {
      console.log(this.elemento);
    },
    RegistrarPlantilla() {
      let me = this;
      //
      if (me.elemento == null) {
        alert("elegir un elemento");
      } else {
        me.model.id_elemento = me.elemento.id_elemento;

        if (me.model.id_elemento == 0) {
          alert("elegir un elemento");
        } else {
          let data = me.model;
          let url = me.url_base + "plantilla";
          console.log(data);
          axios({
            method: "POST",
            url: url,
            data: data,
          })
            .then(function (response) {
              // console.log(response);
              if (response.data.status == 200) {
                me.Show = false;
                me.listar();
                //Swal.fire({ icon: 'success', text: 'Se ha registrado el nuevo establecimiento', timer: 3000,})
              } else {
                /// Swal.fire({ icon: 'error', text: 'A ocurrido un error e', timer: 3000,})
                alert(response.data.message);
              }
              ///me.isLoading = false;
            })
            .catch((error) => {
              console.log(error);
              //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
            });
        }
      }
    },
    listar() {
      this.$emit("ListElementos");
    },
  },
};

function SearchElemento(search, loading) {
  let me = this;
  let url = me.url_base + "search-elemento/" + search;
  if (search !== "") {
    loading(true);
    axios({
      method: "GET",
      url: url,
    })
      .then(function (response) {
        me.elementos = response.data.result;
        loading(false);
      })
      .catch((error) => {
        console.log(error);
        loading(false);
        //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
      });
  }
}
</script>

<style>
</style>