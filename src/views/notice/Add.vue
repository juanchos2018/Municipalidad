<template>
    <div>
       <CCard>
          <CCardHeader>
            <strong>Nueva Noticia </strong>                 
          </CCardHeader>
          <CCardBody>          
            <CRow>
              <CCol sm="3">
                <CInput
                  label="Titulo"
                  v-model="modelo.title"                
                />
              </CCol>   
               <CCol sm="3">
                  <label for="">Departamento</label>
                  <b-form-select v-model="modelo.department_id" @change="handleChange" :options="departments"></b-form-select>
              </CCol>     

                <CCol sm="3">
                  <label for="">Provincia</label>
                  <b-form-select v-model="modelo.province_id"   @change="handleChangeTwo"  :options="provinces"></b-form-select>
              </CCol>  
                <CCol sm="3">
                  <label for="">Distrito</label>
                  <b-form-select v-model="modelo.district_id"  :options="districts"></b-form-select>
              </CCol>      
            </CRow>
            <CRow>             
              <CCol sm="6">
                <CInput
                  label="Descripcion"
                   v-model="modelo.description"                  
                />
              </CCol>
              <CCol sm="4">
                  <label for="">Imagen</label>
                  <b-form-file  @change="onFileChange" v-model="photo" placeholder="Seleccione un foto..." drop-placeholder="Suelta la imagen aquí..."></b-form-file>                  
              </CCol>     
               <CCol sm="3">
                 <CInput
                  label="Direccion"
                   v-model="modelo.location"                  
                />
              </CCol>       
            </CRow>                 
          </CCardBody>
                <div class="form-actions float-right">                   
                  <CButton type="button" color="info" @click="Registrar" >Registrar</CButton>
                  <CButton color="secondary">Cancel</CButton>
              </div>
        </CCard>      
    </div>
</template>

<script>
const axios = require("axios").default;
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";

export default {
    data(){
        return {
            fields2: [
                  { label:"Acciones", key: 'acciones', sortable: false },
             ],
            modelo:{
                title:null,
                description:null,
                photo:null,           
                location:null,          
                department_id:null, 
                province_id:null,  
                district_id:null
            },
            departments:[],
            provinces:[],
            districts:[],
            metodologiaId:null, 
            collapse: true,         
            photo:   null
        }
    },
    computed: {
    ...mapState(["url_base"]),
    },
    mounted(){
        this.getDepartements();
    },
    methods:{
         getDepartements(){
               let me=this;    
               let temp=[];    
               let url=me.url_base+"departaments";        
               axios.get(url).then(function(response){                              
                  temp=response.data.result; 
                  temp.map(function(x){
                    me.departments.push({text: x.description,value:x.id});
                  });                   
               }).catch(function(error){
                  console.log(error);
              });
         },
         handleChange() {             
             this.getProvinces(this.modelo.department_id);           
         },  
         handleChangeTwo() {             
             this.getDistrics(this.modelo.province_id);           
         },          
         getProvinces(department_id){
               let me=this;    
               let temp=[];    
               me.provinces=[];
               let url=me.url_base+"provinces/"+department_id;        
               axios.get(url).then(function(response){                                   
                  temp=response.data.result; 
                  temp.map(function(x){
                    me.provinces.push({text: x.description,value:x.id});
                  });                   
               }).catch(function(error){
                  console.log(error);
              });
         },
         getDistrics(province_id){
               let me=this;    
               let temp=[]; 
               me.districts=[];   
               let url=me.url_base+"distrites/"+province_id;        
               axios.get(url).then(function(response){                              
                  temp=response.data.result; 
                  temp.map(function(x){
                    me.districts.push({text: x.description,value:x.id});
                  });                   
               }).catch(function(error){
                  console.log(error);
              });
         },    
        
         Registrar(){  
              if (this.modelo.title==null) {
                alert("llenar campo title")
              }else if (this.modelo.description==null){
                   alert("llenar campo description")
              }                       
              else {                    
                 let me=this;
                 let url = me.url_base + "notice";
                 let data = new FormData();
                 data.append("title", me.modelo.title);
                 data.append("description", me.modelo.description);
                 data.append("department_id", me.modelo.department_id);
                 data.append("province_id", me.modelo.province_id);
                 data.append("district_id", me.modelo.district_id);
                 data.append("photo", me.modelo.photo);
                 data.append("location", me.modelo.location);

                 axios.post(url,data).then(response => {   
                          console.log(response)  
                        alert("Rerigfasdo we ");
                        }).catch(function (error) {
                            console.log(error);
                        }) .finally(() => {                     
                  })
                }                
         },           
         Limpiar(){
                this.modelo.nombre_proyecto='';
                this.modelo.id_metodologia=0; 
                this.modelo.fecha_inicio='';  
                this.modelo.descripcion=''; 
                this.modelo.fecha_fin='';        
                this.modelo.listaFases=[];
                this.modelo.porcentaje='';                     
          },
          onFileChange(e){
             this.modelo.photo = e.target.files[0];
          }
          
    }
}
</script>