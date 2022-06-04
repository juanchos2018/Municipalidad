<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center" />
        <strong>Tareas </strong>
        <div class="card-header-actions">
          <CButton @click="modalTarea" block color="primary"
            >Nueva Tarea</CButton
          >
        </div>
      </CCardHeader>
    </CCard>

    <CCard>
      <CCardBody>
        <CTabs variant="pills" :active-tab="0">
          <CTab title="Nuevo">
            <br />
            <CRow>
              <CCol sm="6" md="4" v-for="item in items" :key="item.id_tarea">
                <b-card no-body class="overflow-hidden" footer-tag="footer">
                  <b-row no-gutters>
                    <b-col md="3">
                      <div align-v="center">
                        <center>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style="margin-top: 40px"
                            viewBox="0 0 512 512"
                            role="img"
                            class="c-icon c-icon-custom-size"
                            height="42"
                          >
                            <polygon
                              fill="var(--ci-primary-color, currentColor)"
                              points="408 432 376 432 376 464 112 464 112 136 144 136 144 104 80 104 80 496 408 496 408 432"
                              class="ci-primary"
                            ></polygon>
                            <path
                              fill="var(--ci-primary-color, currentColor)"
                              d="M176,16V400H496V153.373L358.627,16ZM464,368H208V48H312V200H464Zm0-200H344V48h1.372L464,166.627Z"
                              class="ci-primary"
                            ></path>
                          </svg>
                        </center>
                      </div>
                    </b-col>
                    <b-col md="8">
                      <b-card-body>
                        <b-card-title>
                          <h5>{{ item.titulo }}</h5>
                        </b-card-title>
                        <b-card-text>
                          <h5>{{ item.estado }}</h5>
                          <div>
                            <CProgress
                              color="gradient-success"
                              :value="item.porcentaje"
                              class="progress-xs my-3 mb-0"
                            />
                          </div>
                          <h5>Res. : {{ item.nombre_usuario }}</h5>
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                  </b-row>                
                </b-card>
              </CCol>
            </CRow>
          </CTab>

          <CTab title="Proceso">
            <br />
            <CRow>
              <CCol sm="6" md="4" v-for="item in itemsProces" :key="item.id_tarea">
                <b-card no-body class="overflow-hidden" footer-tag="footer">
                  <b-row no-gutters>
                    <b-col md="3">
                      <div align-v="center">
                        <center>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style="margin-top: 40px"
                            viewBox="0 0 512 512"
                            role="img"
                            class="c-icon c-icon-custom-size"
                            height="42"
                          >
                            <polygon
                              fill="var(--ci-primary-color, currentColor)"
                              points="408 432 376 432 376 464 112 464 112 136 144 136 144 104 80 104 80 496 408 496 408 432"
                              class="ci-primary"
                            ></polygon>
                            <path
                              fill="var(--ci-primary-color, currentColor)"
                              d="M176,16V400H496V153.373L358.627,16ZM464,368H208V48H312V200H464Zm0-200H344V48h1.372L464,166.627Z"
                              class="ci-primary"
                            ></path>
                          </svg>
                        </center>
                      </div>
                    </b-col>
                    <b-col md="8">
                      <b-card-body>
                        <b-card-title>
                          <h5>{{ item.titulo }}</h5>
                        </b-card-title>
                        <b-card-text>
                          <h5>{{ item.estado }}</h5>
                          <div>
                            <CProgress
                              color="gradient-success"
                              :value="item.porcentaje"
                              class="progress-xs my-3 mb-0"
                            />
                          </div>
                          <h5>Res. : {{ item.nombre_usuario }}</h5>
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                  </b-row>
                  <template #footer footer-class="myDiv">
                    <div style="background-color: white; float: right">
                      <b-button
                        variant="success"
                        @click="detalleTarea(item.id_tarea)"
                      >
                        Detalle
                      </b-button>
                    </div>
                  </template>
                </b-card>
              </CCol>
            </CRow>
          </CTab>

          <CTab title="Terminado">
            <br />
            <CRow>
              <CCol sm="6" md="4" v-for="item in itemsFinish" :key="item.id_tarea">
                <b-card no-body class="overflow-hidden" footer-tag="footer">
                  <b-row no-gutters>
                    <b-col md="3">
                      <div align-v="center">
                        <center>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style="margin-top: 40px"
                            viewBox="0 0 512 512"
                            role="img"
                            class="c-icon c-icon-custom-size"
                            height="42"
                          >
                            <polygon
                              fill="var(--ci-primary-color, currentColor)"
                              points="408 432 376 432 376 464 112 464 112 136 144 136 144 104 80 104 80 496 408 496 408 432"
                              class="ci-primary"
                            ></polygon>
                            <path
                              fill="var(--ci-primary-color, currentColor)"
                              d="M176,16V400H496V153.373L358.627,16ZM464,368H208V48H312V200H464Zm0-200H344V48h1.372L464,166.627Z"
                              class="ci-primary"
                            ></path>
                          </svg>
                        </center>
                      </div>
                    </b-col>
                    <b-col md="8">
                      <b-card-body>
                        <b-card-title>
                          <h5>{{ item.titulo }}</h5>
                        </b-card-title>
                        <b-card-text>
                          <h5>{{ item.estado }}</h5>
                          <div>
                            <CProgress
                              color="gradient-success"
                              :value="item.porcentaje"
                              class="progress-xs my-3 mb-0"
                            />
                          </div>
                          <h5>Res. : {{ item.nombre_usuario }}</h5>
                           <div v-if="item.estado2=='Aprobado'" >
                           <i class="fas fa-check fa-lg"  style=" float:right;"></i> 
                        </div>
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                  </b-row>
                  <template #footer footer-class="myDiv">
                    <div style="background-color: white; float: right">
                      <b-button
                        variant="success"
                        @click="detalleTarea(item.id_tarea)"
                      >
                        Detalle
                      </b-button>
                    </div>
                  </template>
                </b-card>
              </CCol>
            </CRow>
          </CTab>
        </CTabs>
      </CCardBody>
    </CCard>

    <modal-tarea v-on:ListTareaVersion="ListTareas" />
    <modal-detalle />
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";

import { mapState } from "vuex";
import ModalTarea from "./components/ModalTarea.vue";
import ModalDetalle from "./components/ModalDetalle.vue";

export default {
  name: "Cards",
  props: {
    obj: { type: String },
  },
  components: {
    ModalTarea,
    ModalDetalle,
  },
  data: function () {
    return {
      modal: false,
      items: [],
      itemNew:[],
      itemsProces:[],
      itemsFinish:[],
      modelo: { id_miembro_proyecto: 0, id_version: 0, nombre_usuario: "" },
    };
  },
  mounted() {
    if (this.obj) {
      var array = this.obj.split("-");
      this.modelo.id_miembro_proyecto = array[0];
      this.modelo.id_version = array[1];
      this.modelo.nombre_usuario = array[2];
      this.ListTareas(this.modelo.id_version);
    }
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    modalTarea() {
      EventBus.$emit("ModalTarea", this.modelo);
    },
    detalleTarea(id_tarea) {
      EventBus.$emit("ModalDetalle", id_tarea);
    },
    ListTareas(id_version) {
      let me = this;
      let url = this.url_base + "tarea-version/" + id_version;
      axios({
        method: "GET",
        url: url,
      }).then(function (response) {        
         me.items=[];
         me.itemsProces=[];
         me.itemsFinish=[];
        if (response.data.status == 200) {          
             response.data.result.forEach(elem => {
                        if (elem.estado=="Nuevo") {
                            me.items.push({                                        
                                id_tarea:elem.id_tarea,
                                titulo:elem.titulo,
                                descripcion: elem.descripcion,
                                nombre_usuario:elem.nombre_usuario,
                                porcentaje: elem.porcentaje,
                                fecha_inicio:elem.fecha_inicio,
                                fecha_termino: elem.fecha_termino,                              
                                estado:elem.estado,   
                                estado1:elem.estado1, 
                                estado2:elem.estado2,                  
                            })
                    }else if(elem.estado=="Proceso"){
                            me.itemsProces.push({
                                id_tarea:elem.id_tarea,
                                titulo:elem.titulo,
                                descripcion: elem.descripcion,
                                     nombre_usuario:elem.nombre_usuario,
                                porcentaje: elem.porcentaje,
                                fecha_inicio:elem.fecha_inicio,
                                fecha_termino: elem.fecha_termino,
                                estado:elem.estado,                              
                                estado1:elem.estado1, 
                                estado2:elem.estado2,                  
                          })
                      }else if(elem.estado=="Terminado"){
                         me.itemsFinish.push({
                                id_tarea:elem.id_tarea,
                                titulo:elem.titulo,
                                descripcion: elem.descripcion,
                                     nombre_usuario:elem.nombre_usuario,
                                porcentaje: elem.porcentaje,
                                fecha_inicio:elem.fecha_inicio,
                                fecha_termino: elem.fecha_termino,
                                estado:elem.estado,                              
                                estado1:elem.estado1, 
                                estado2:elem.estado2,                  
                          })
                      }                        
                  }); 
        }
      });
    },
  },
};
</script>
