<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Miembros </strong>
        <div class="card-header-actions">
          
        </div>
      </CCardHeader>
    </CCard>
    <CRow>
      <CCol sm="6" md="4" v-for="item in items" :key="item.id_miembro_proyecto">
        <CCard color="warning"  text-color="white">
          <CCardBody>
            <CCallout color="info">
              <strong class="h4"> {{ item.nombre_usuario }}</strong> <br>
              <label for="">{{ item.nombre_rol }}</label>
            </CCallout>
          </CCardBody>
          <CCardFooter color="warning">
            <CRow>
              <CCol lg="3" class="py-1">
                <CButton color="primary" @click="EditarRol(item.id_rol,item.id_miembro_proyecto)" v-if="item.nombre_rol!='Jefe de Proyecto'">Editar</CButton>
              </CCol>              
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

    <!-- <modal-metodologia
      @CerrarModal="CerrarModal"
      v-on:ListMetodologia="ListMetodologia"
    /> -->
      <modal-rol  v-on:ListMember="ListMember"  />
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";

import { mapState } from "vuex";
//import ModalMetodologia from "./components/ModalMetodologia";
import ModalRol from "./components/ModalRol";
export default {
  name: "Cards",
   props: {
    id_proyecto: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  components: {
     ModalRol
  },
  data: function () {
    return {
      show: true,
      modal: false,
      primaryModal: false,      
      items: [],
    };
  },
  mounted() {
    this.ListMember();
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    modalMetodologia() {
     // EventBus.$emit("ModalMetodologia");
    },
    CerrarModal() {
      this.primaryModal = false;
    },
    ListMember() {
      let me = this;
      let url = this.url_base + "miembros/"+me.id_proyecto;
      axios({
        method: "GET",
        url: url,
      }).then(function (response) {
         // console.log(response);
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
    },
    EditarRol(id_rol,id_miembro_proyecto) {
      EventBus.$emit("ModalRol",id_rol,id_miembro_proyecto);
    },

  },
};
</script>
