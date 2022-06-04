<template>
  <div>
       <CWidgetProgress footer="Proyecto">
          <div class="h4 m-0">{{modelo.nombre_proyecto}}</div>           
          <div class="card-header-actions">        
          </div>      
            <div class="h6 m-2"> Fecha Inicio: {{modelo.fecha_ini}}</div>
            <div class="h6 m-2">Fecha Fin: {{modelo.fecha_fin}}</div>                      
          <CProgress
            color="gradient-success"
            :value="25"
            class="progress-xs my-3 mb-0"
          />
        </CWidgetProgress>
        <br>
     <CWidgetProgress >
        <b-tabs content-class="mt-3" fill v-model="tabIndex" v-on:activate-tab="tabActivated">
            <b-tab :title="item.nombre_fase+'-'+item.id_fase" v-for="item in fases" :key="item.id_fase">
              <!-- <p>{{item.nombre_fase}}</p> -->
             <b-table :items="elementosConfi" sort-icon-left :fields="fields" responsive="sm" v-model="currentItems" show-empty>
                <template v-slot:cell(nombre_elemento)="{ detailsShowing, item }">
                  <b-button variant="outline-primary" style="margin-right:10px" @click="toggleDetails(item)">
                    <div v-if="detailsShowing">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="50"><path fill="var(--ci-primary-color, currentColor)" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z" class="ci-primary"></path><polygon fill="var(--ci-primary-color, currentColor)" points="272.112 314.481 272.112 128 240.112 128 240.112 314.481 165.059 239.429 142.432 262.056 256.112 375.736 369.793 262.056 347.166 239.429 272.112 314.481" class="ci-primary"></polygon></svg>
                    </div>
                    <div v-else>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="50"><path fill="var(--ci-primary-color, currentColor)" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z" class="ci-primary"></path><polygon fill="var(--ci-primary-color, currentColor)" points="142.319 241.027 164.947 263.654 240 188.602 240 376 272 376 272 188.602 347.053 263.654 369.681 241.027 256 127.347 142.319 241.027" class="ci-primary"></polygon></svg>
                    </div>
                  </b-button>
                  <strong>{{item.nombre_elemento }} -{{item.id_cronograma_elemento }} </strong>
                </template>
                <template v-slot:row-details="">
                   <CListGroup>
                    <CListGroupItem
                      class="d-flex justify-content-between align-items-center"
                      v-for="item in listaversiones" :key="item.id_version">
                        {{item.version}}- {{item.nombre_usuario}}          
                       <CButton type="button" color="info"  @click="Tarea(item)">Tareas</CButton>
                    </CListGroupItem>   
                  </CListGroup>
                  <!-- <a-list item-layout="horizontal" :data-source="listaversiones">
                    <a-list-item slot="renderItem" slot-scope="item">
                      <a-card style="width: 100%" border-variant="primary">
                        <div style="float:right">
                          <b-button class="m-1 p-2 px-4 btn-xs float-right" variant="primary" @click="Tarea(item.id_version,item.miembroresponsableID)"> Seleccionar </b-button>
                        </div>
                        <div style="  display: flex;align-items: center;">
                          <b-icon icon="play-fill"></b-icon>
                          <h5 style="margin-left:5px">Version {{ item.version }}</h5>
                          <h5 style="margin-left:20px">{{ item.nombre }}</h5>
                        </div>
                      </a-card>
                    </a-list-item>
                  </a-list> -->
                </template>
                <template v-slot:cell(version)="data">
                  <div >
                    <b-button type="button" class="m-1 p-2 px-4 btn-xs float-right" @click="NuevaVersion(data.item.id_cronograma_elemento,data.item.nombre_elemento)"  variant="primary">
                      <i class="fa fa-plus-circle"></i> Agregar Version
                    </b-button>
                  </div>
                </template>
                <template v-slot: empty="scope">
                  <h4> Lista Vacia </h4>
                </template>
                <template v-slot: emptyfiltered="scope">
                  <h4> No hay Nada</h4>
                </template>
              </b-table>
            </b-tab>          
        </b-tabs>
      </CWidgetProgress>

    <modal-version  v-on:ListarFaes="MostarFaseMetodolgiaProyecto" />
      <!--  <modal-miembro @CerrarModal="CerrarModal"  /> -->
  </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
import ModalVersion from './components/ModalVersion.vue';

export default {
  components: { ModalVersion },
    name:'view',
    props: {
      id_proyecto: {
        type: Number,
        require: true,
        default: 0,
      },
    },
    data(){
        return {
          elementosConfi: [],
          currentItems: [],
          listaversiones: [],
          fases: [],  
          modelo:{},
          tabIndex: 0,
          fields: [
              { label: "Elementos de Configuración ", key: "nombre_elemento" },
              { label: "", key: "version" },
          ],             
        }
    },
    computed: {
    ...mapState(["url_base"]),
    },
    mounted(){
        this.ViewProyect();
        this.MostarFaseMetodolgiaProyecto();
    },
    methods: {
        NuevaVersion(id_cronograma_elemento, nombre_elemento) {
          EventBus.$emit("ModalVersion",this.id_proyecto,nombre_elemento,id_cronograma_elemento);          
        },
        toggleDetails(row) {      
          if (row._showDetails) {
            this.$set(row, "_showDetails", false);
          } else {
          this.currentItems.forEach((item) => {
            this.$set(item, "_showDetails", false);
           });
          this.nombre_elemento = row.nombre_elemento;
          this.ListaVersiones(row.id_cronograma_elemento);
          this.$nextTick(() => {
            this.$set(row, "_showDetails", true);
          });
        }
       },
       ListaVersiones(id_cronograma_elemento) {
        let me = this;
        let url = this.url_base + "version/"+id_cronograma_elemento;
        axios.get(url)
        .then((response) => {
          me.listaversiones = response.data.result;      
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
       },
       tabActivated(newTabIndex,oldTabIndex, event){       
         let id_fase=this.fases[newTabIndex].id_fase;      
         this.ElementosFase(id_fase); 
       },
       mover(){    
          let id_fase=this.fases[this.tabIndex].id_fase;      
          this.ElementosFase(id_fase);       
        },
        ElementosFase(id_fase){
          let me = this;
          let url = this.url_base + "elemento-fase/"+me.id_proyecto+"/"+id_fase;        
          axios.get(url)
            .then((response) => {
               // console.log(response);
                me.elementosConfi = response.data.result;
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(() => {});
        },
        ViewProyect(){
          let me=this;
          let url = this.url_base + "proyecto-view/"+this.id_proyecto;
            axios({
                method: "GET",
                url: url, 
            })
            .then(function (response) {
               // console.log(response)
                if (response.data.status == 200) {               
                    me.modelo = response.data.result;
                } else {   
                    alert("error");            
                }
            }).catch((error) => {
                console.log(error);               
             });
        },
        MostarFaseMetodolgiaProyecto() {
             let me = this;
             let url = this.url_base +"fases-proyecto/" + me.id_proyecto
             axios.get(url)
                .then((response) => {          
                  //console.log(response.data);
                   me.fases=response.data.result;  
                   me.ElementosFase(me.fases[0].id_fase);           
                })
                .catch(function (error) {
                 console.log(error);
                })
                .finally(() => {});
        },
        Tarea(item){       
          let obj=item.id_miembro_proyecto+"-"+item.id_version+"-"+item.nombre_usuario
          this.$router.push({ name: "tarea", params: { obj:obj } });
        }
      }
}
</script>

<style>

</style>