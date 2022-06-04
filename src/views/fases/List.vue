<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Fases  de {{ metologia.nombre }}</strong>
        <div class="card-header-actions">
          <CButton @click="modalfase" block color="primary">Nueva Fase</CButton>
        </div>
      </CCardHeader>
    </CCard>
    <CRow>
      <CCol sm="6" md="6" v-for="item in items" :key="item.id_fase">
        <CCollapse :show="collapse">
          <CCard body-wrapper>
            <p class="card-text">{{ item.nombre_fase }}</p>
            <div style="display: flex; justify-content: space-between">
              <CButton
                @click="item.innerCollapse = !item.innerCollapse"
                size="sm"
                color="secondary"
              >
                Ver elementos de configuracion
              </CButton>
              <CButton color="primary" @click="modalElemento(item.id_fase)" >Agregar</CButton>
            </div>

            <CCollapse :show="item.innerCollapse" class="mt-2">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th width="3%" class="text-center">#</th>
                    <th width="10%" class="text-center">Elemento</th>     
                  </tr>
                </thead>
                <tbody v-for="(item2, it) in item.elementos" :key="item2.id_input">
                  <tr>
                    <td class="text-center">{{ it + 1 }}</td>
                    <td class="text-center"> {{ item2.nombre_elemento }}</td>       
                  </tr>
                </tbody>
              </table>
            </CCollapse>
          </CCard>
        </CCollapse>
      </CCol>
    </CRow>

    <modal-fase @CerrarModal="CerrarModal"      v-on:ListarFase="ListFases"/>
    <modal-elemento @CerrarModal="CerrarModal"  v-on:ListElementos="ListFases"  />
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
import ModalFase from "./components/ModalFase";
import ModalElemento from './components/ModalElemento.vue';

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
    ModalFase,
    ModalElemento,
  },
  data: function () {
    return {
      show: true,
      isCollapsed: true,
      modal: false,
      primaryModal: false,
      items: [],
      itemElementos: [],
      metologia: {},
      collapse: true,
      innerCollapse: false,
    };
  },
  mounted() {
    this.ListFases();
    this.ViewMetodologia();
    //console.log(this.id);
    //var tipi= typeof this.id
    //  console.log(tipi);
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    modalfase() {
      EventBus.$emit("ModalFase", this.id);
    },
    modalElemento(id_fase){
      EventBus.$emit("ModalElemento",id_fase);
    },
    CerrarModal() {
      this.primaryModal = false;
    },
    ViewMetodologia() {
      let me = this;
      let url = this.url_base + "metodologia-view/" + this.id;
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {
      //    console.log(response);
          if (response.data.status == 200) {
            //me.rows = response.data.result.total;
            me.metologia = response.data.result;
          } else {
            // Swal.fire({ icon: 'error', text: 'A Ocurrido un error', timer: 2000,})
            alert("error");
          }
        })
        .catch((error) => {
          console.log(error);
          //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
        });
    },
    ListFases() {
      let me = this;
      let url = this.url_base + "fases/" + this.id;
      axios({
        method: "GET",
        url: url,
      })
        .then(function (response) {
        //    console.log(response);
          if (response.data.status == 200) {
            //me.rows = response.data.result.total;
             me.items = response.data.result;
          } else {
            // Swal.fire({ icon: 'error', text: 'A Ocurrido un error', timer: 2000,})
            alert("lsita vacia");
          }
        })
        .catch((error) => {
          console.log(error);
          //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
        });
    },
  },
};
</script>
