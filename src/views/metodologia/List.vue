<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Metodologias </strong>
        <div class="card-header-actions">
          <CButton @click="modalMetodologia" block color="primary"
            >Nuevo</CButton
          >
        </div>
      </CCardHeader>
    </CCard>
    <CRow>
      <CCol sm="6" md="4" v-for="item in items" :key="item.id_metodologia">
        <CCard color="warning"  text-color="white">
          <CCardBody>
            <CCallout color="info">
              <strong class="h4"> {{ item.nombre }}</strong>
            </CCallout>
          </CCardBody>

          <CCardFooter color="warning">
            <CRow>
              <CCol lg="3" class="py-1">
                <CButton color="primary">Editar</CButton>
              </CCol>
              <CCol md="2" class="py-1">
                <CButton color="primary" @click="Listfases(item.id_metodologia)">Fases</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

    <modal-metodologia
      @CerrarModal="CerrarModal"
      v-on:ListMetodologia="ListMetodologia"
    />
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";

import { mapState } from "vuex";
import ModalMetodologia from "./components/ModalMetodologia";

export default {
  name: "Cards",
  components: {
    ModalMetodologia,
  },
  data: function () {
    return {
      show: true,
      isCollapsed: true,
      modal: false,
      primaryModal: false,      
      items: [],
    };
  },
  mounted() {
    this.ListMetodologia();
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    modalMetodologia() {
      EventBus.$emit("ModalMetodologia");
    },
    CerrarModal() {
      this.primaryModal = false;
    },
    ListMetodologia() {
      let me = this;
      let url = this.url_base + "metodologia";
      axios({
        method: "GET",
        url: url,
      }).then(function (response) {
        //console.log(response);
        if (response.data.status == 200) {
          //me.rows = response.data.result.total;
          me.items = response.data.result;
        } else {
          // Swal.fire({ icon: 'error', text: 'A Ocurrido un error', timer: 2000,})
          alert("error");
        }
      }).catch((error) => {
              console.log(error)
              //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
        }); 
    },
    Listfases(id){
        this.$router.push({name:"fases" ,params:{id:id}});
    }

  },
};
</script>
