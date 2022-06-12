<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Usuarios </strong>
        <div class="card-header-actions">
          <!-- <CButton  @click="modalUsuario" block color="primary">Nuevo Usuario</CButton>          -->
        </div>
      </CCardHeader>

      <CCardBody>
        <CDataTable
          :hover="hover"
          :striped="striped"
          :border="border"
          :small="small"
          :fixed="fixed"
          :items="items"
          :fields="fields"
          :items-per-page="small ? 10 : 5"
          :dark="dark"
          pagination
        >
          <template #accion="{ item }">
            <td>            
              <b-button variant="danger" @click="ver(item)">
                <b-icon icon="trash-fill"></b-icon>
              </b-button>          
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>

    <!-- <ModalUsuario  v-on:ListUsuario="ListUsuario"  /> -->
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
//import ModalUsuario from './components/ModalUsuario'

export default {
  name: "Cards",
  props: {
    caption: {
      type: String,
      default: "usuarios",
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean,
  },
  components: {
    //ModalUsuario
  },
  data() {
    return {
      modal: false,
      items: [],
      fields: [
        "name",
        "last_name",
        "location",
        "phone",
        "email",
        "number_document",
        "accion",
      ],
    };
  },
  mounted() {
    this.get();
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    modalUsuario() {
      EventBus.$emit("ModalUsuario");
    },
    CerrarModal() {
      this.primaryModal = false;
    },
    ver(id) {},
    get() {
      let me = this;
      let url = this.url_base + "user";
      axios({
        method: "GET",
        url: url,
      }).then(function (response) {
        //console.log(response)
        if (response.data.status == 200) {
          me.items = response.data.result;
        } else {
          alert("error");
        }
      });
    },
  },
};
</script>
