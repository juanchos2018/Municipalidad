<template>
    <div>
       <CCard>
          <CCardHeader>
            <strong>Nuevo Proyecto </strong>                      
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                  <label for="">Proyecto</label>
                  <b-form-select v-model="proyectoId" @change="handleChange" :options="itemPro"></b-form-select>
           
              </CCol>              
              <CCol sm="6">
               <label for="">Fecha </label>
                  <b-form-input type="date" ref="broadcast_date"   v-model="modelo.fecha" ></b-form-input>
              </CCol>
                 <CCol sm="6">
                   <label for="">Fase</label>
                  <b-form-select v-model="faseId" @change="handleChange2" :options="fases"></b-form-select>
           
              </CCol>     
                <CCol sm="6">
                  <label for="">elemento de configuracion</label>
                  <b-form-select v-model="elemento" @change="handleChange3" :options="elementosConfi"></b-form-select>
           
              </CCol>                         
            </CRow>   
          </CCardBody>
        </CCard>
         <CCard>
          <CCardHeader>
            <strong>Datos Solicitud de cambio </strong>         
           
             <CRow>
               <CCol sm="6">
                <CInput
                  label="Objetivo"
                   v-model="modelo.objetivo"                  
                />
              </CCol>
               <CCol sm="6">
                    <label for="">Descripcion</label>
                  <b-form-textarea
                    id="textarea"                 
                    placeholder="Enter something..."
                    rows="3"
                     v-model="modelo.descripcion"            
                    max-rows="6"
                    ></b-form-textarea>
              </CCol>
            </CRow>
          
          </CCardHeader>
            <CRow>
  
            </CRow>        
              <div class="form-actions float-right">                   
                  <CButton type="button" color="info" @click="RegistrarSolicitud" >Registrar</CButton>
                  <CButton color="secondary">Cancel</CButton>
              </div>
        </CCard>
    </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
//   listaElementos:[],
export default {
    data(){
        return {
            fields2: [
                  { label:"Acciones", key: 'acciones', sortable: false },
             ],
            modelo:{
                fecha:'',
                objetivo:'', 
                linkdocumento:'',  
                descripcion:'',        
                estado:'', 
                mensaje:'', 
                id_proyecto:0,             
                id_usuario:0,
                id_jefe:0,
                id_fase:0,
                id_elemento:0
            },
           
            faseId:null,    
            elemento:null,
            proyectoId:null,              
            elementosConfi:[],        
            itemPro:[],   
            fases:[],  
            collapse: true,            
        }
    },
   computed: {
    ...mapState(["url_base"]),
    },
    mounted(){
        //this.ListarMetodologias();
        if(localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
        this.ListProyecto();
    },
    methods:{     
        ExportPDF,
        handleChange(){
            this.fases=[];  
            this.MostarFaseMetodolgiaProyecto(this.proyectoId); 
            this.modelo.id_proyecto=this.proyectoId
            this.JefeProyecto();
        },
        handleChange2(){
             this.elementosConfi=[];
             this.ElementosFase(this.faseId);  
             this.modelo.id_fase=this.faseId
        },
        handleChange3(){
            this.modelo.id_elemento=this.elemento
        },
        MostarFaseMetodolgiaProyecto(id_proyecto) {
             let me = this;
             let url = this.url_base +"fases-proyecto/" + id_proyecto
             axios.get(url)
                .then((response) => {          
                   let temp=[];
                   temp=response.data.result;
                  
                   temp.map(function(x){
                         me.fases.push({text: x.nombre_fase,value:x.id_fase});
                    });      
                  // me.ElementosFase(me.fases[0].id_fase);           
                })
                .catch(function (error) {
                 console.log(error);
               })
              .finally(() => {});
        },
        ElementosFase(id_fase){
          let me = this;
          let url = this.url_base + "elemento-fase/"+me.proyectoId+"/"+id_fase;        
          axios.get(url)
            .then((response) => {             
                 let temp=[];
                 //console.log(response);
                temp=response.data.result;                
                temp.map(function(x){
                    me.elementosConfi.push({text: x.nombre_elemento,value:x.id_elemento});
                });  
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(() => {});
        },
        ListProyecto() {
            let me = this;
            let url = me.url_base + "proyecto-menber/" + me.modelo.id_usuario;
            axios({
                method: "GET",
                url: url,
            }).then(function (response) {              
                    if (response.data.status == 200) {
                        let temp=[];
                        temp=response.data.result;
                        temp.map(function(x){
                             //me.itemPro = response.data.result;
                             me.itemPro.push({text: x.nombre_proyecto,value:x.id_proyecto});
                         });
                       // me.items = response.data.result;
                    }
                })
                .catch((error) => {
                console.log(error);
                });
         },      
         JefeProyecto(){
             let me = this;
            let url = me.url_base + "proyecto-jefe/" + me.modelo.id_proyecto;
            axios({ method: "GET",
                url: url,
            }).then(function (response) {              
                    if (response.data.status == 200) {                      
                        //temp=response.data.result;
                        me.modelo.id_jefe=response.data.result[0].id_usuario;
                    }
                })
                .catch((error) => {
                console.log(error);
             });
         },  
         RegistrarSolicitud(){      
            if (this.modelo.id_proyecto==0) {
                alert("llenar campos")
            }
            else if(this.modelo.id_fase==null){
              alert("llenar campos")
            }
             else if(this.modelo.objetivo==""){
                alert("llenar campos")
            }
            else{
            let data=this.modelo;              
                  let url = this.url_base + "solicitud";
                  axios.post(url,data).then(response => {     
                        let id_solicitud=response.data.result;         
                        console.log(response.data)         
                        this.UpdateSolicutud(id_solicitud);
                        }).catch(function (error) {
                            console.log(error);
                        }) .finally(() => {                     
                  })
              }
                 
             //   }                
             },
            UpdateSolicutud(id_solicitud){ 
                  this.modelo.id_solicitud = id_solicitud;
                  this.modelo.linkdocumento = this.url_base+"solicitud-pdf/"+id_solicitud;
                  let data=this.modelo;              
                  let url = this.url_base + "solicitud";
                  axios.put(url,data).then(response => {  
                           ///console.log(response.data)         
                           this.Limpiar();
                           alert("registrado solictud de cambio")
                        }).catch(function (error) {
                            console.log(error);
                        }) .finally(() => {                     
                  })
            },           
           Limpiar(){
                this.modelo.linkdocumento='';
               // this.modelo.fecha=0; 
                this.modelo.objetivo='';  
                this.modelo.descripcion='';             
             
          
           },
         
    }
}


function ExportPDF(id_solicitud) {

  let me = this;
  let url = this.url_base + "solicitud-pdf/"+id_solicitud;
  
  window.open(url,'_blank');
}
</script>