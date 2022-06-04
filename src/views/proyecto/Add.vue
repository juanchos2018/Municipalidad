<template>
    <div>
       <CCard>
          <CCardHeader>
            <strong>Nuevo Proyecto </strong>                 
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Nombre Proyecto"
                  v-model="modelo.nombre_proyecto"                
                />
              </CCol>              
              <CCol sm="3">
               <label for="">Fecha Inicio</label>
                  <b-form-input type="date" ref="broadcast_date"   v-model="modelo.fecha_inicio" ></b-form-input>
              </CCol>
                 <CCol sm="3">
               <label for="">Fecha Fin</label>
                  <b-form-input type="date" ref="broadcast_date"  v-model="modelo.fecha_fin" ></b-form-input>
              </CCol>              
            </CRow>
            <CRow>             
              <CCol sm="6">
                <CInput
                  label="Descripcion de  Proyecto"
                   v-model="modelo.descripcion"                  
                />
              </CCol>
              <CCol sm="6">
                  <label for="">Metodologia</label>
                  <b-form-select v-model="metodologiaId" @change="handleChange" :options="metodologias"></b-form-select>
              </CCol>
            </CRow>                 
          </CCardBody>
        </CCard>
         <CCard>
          <CCardHeader>
            <strong>Fases </strong>         
           
             <CRow>
            <div v-for="item in seleccionados" :key="item.key" style="display: flex;margin-right:3px" >
                <CBadge color="primary">{{item}}</CBadge> 
            </div>
            </CRow>
          
          </CCardHeader>
            <CRow>
            <CCol sm="6" md="6" v-for="item in fases" :key="item.id_fase">
                <CCollapse :show="collapse">
                <CCard body-wrapper>
                    <p class="card-text">{{ item.nombre_fase }}</p>
                    <div style="display: flex; justify-content: space-between">
                    <CButton
                        @click="item.innerCollapse = !item.innerCollapse"
                        size="sm"
                        color="secondary">
                        Ver elementos de configuracion
                    </CButton>                  
                    </div>
                    <CCollapse :show="item.innerCollapse" class="mt-2">
                         <b-table striped hover :items="item.elementos" :fields="fields2"  >
                           <template  v-slot:cell(acciones)="row">
                            <div style="display: flex;">
                            <b-form-checkbox    @change="onPreviewClick(row.index,row.item.id_elemento,row.item.nombre_elemento,item.id_fase)"             
                            ></b-form-checkbox>
                            <strong for="" >{{row.item.nombre_elemento }}  </strong>  
                            </div>                        
                         </template>
                        </b-table>                  
                    </CCollapse>
                </CCard>
                </CCollapse>
            </CCol>
            </CRow>        
              <div class="form-actions float-right">                   
                  <CButton type="button" color="info" @click="RegistrarProyecto" >Registrar</CButton>
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
                nombre_proyecto:'',
                id_metodologia:'', 
                fecha_inicio:'',          
                id_usuario:0, 
                descripcion:'', 
                fecha_fin:'',             
                listaFases:[],
                porcentaje:0
            },
           
            metodologiaId:null,   
            list:[],
            idseleccionadosfases:[],       
            Listacronogramafase:[],           
            TodasPlantillas:[],
            idseleccionados:[],
            listaElementos:[],  
            seleccionados:[],  
            metodologias:[],
            listaFases:[],            
            fases:[],  
            collapse: true,            
        }
    },
   computed: {
    ...mapState(["url_base"]),
    },
    mounted(){
        this.ListarMetodologias();
        if(localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
       //this.ListarTodasPlantillas();
    },
    methods:{
         ListarTodasPlantillas(){
               let me=this;                 
               axios.get('/plantillaelementos',).then(function(response){                                      
                  me.TodasPlantillas=response.data.result;                    
              }).catch(function(error){
                  console.log(error);
              });
          },
          ListarMetodologias(){
                let me=this;
                var temp=[];
                let url = this.url_base + "metodologia";
                axios.get(url).then(response => {  
                temp=response.data.result;
                temp.map(function(x){
                    me.metodologias.push({text: x.nombre,value:x.id_metodologia});
                });  
              }).catch(function(error){
                  console.log(error);
              });
          },
          handleChange() {             
             this.ListFases(this.metodologiaId);
             this.modelo.id_metodologia=this.metodologiaId;
          },
          ListFases(id_metodologia) {
            let me = this;
            me.fases=[];
            let url = me.url_base + "fases/" + id_metodologia;
           // console.log(url);
            axios({
                method: "GET",
                url: url,
               })
                .then(function (response) {           
                  if (response.data.status == 200) {                 
                      me.fases = response.data.result;
                  } else {               
                      alert("lsita vacia");
                    }
                })
                .catch((error) => {
                 console.log(error);               
                });
          },
           onPreviewClick(data, id_elemento, nombre,id_fase) {     
              // console.log( id_elemento, nombre,id_fase)        
               var existe=null;            
                if(this.Verificar(id_elemento,nombre)){                
                  this.Quitar(id_elemento,nombre,id_fase);                  
                }else{                
                  this.agregar(id_elemento,nombre,id_fase);   
                }        
            },
            Verificar(id,nombre){           
               for(var i =0;i< this.seleccionados.length;i++){
                 if (this.seleccionados[i]==nombre){
                    return true;  
                 }
               }  
              return false;
            },
            Quitar(id,nombre,id_fase){             
               this.seleccionados.splice(this.seleccionados.indexOf(nombre), 1);
               this.idseleccionados.splice(this.idseleccionados.indexOf(id), 1);
               this.idseleccionadosfases.splice(this.idseleccionadosfases.indexOf(id_fase),1);              
            },
            agregar(id,nombre,id_fase){
                  this.seleccionados.push(nombre);
                  this.idseleccionados.push(id);
                  this.idseleccionadosfases.push(id_fase);               
            },
            RegistrarProyecto(){  
              if (this.modelo.nombre_proyecto=="") {
                alert("llenar campo nombre proyecto")
              }else if (this.modelo.fecha_inicio==""){
                   alert("llenar campo fecha_inicio")
              }
              else if (this.modelo.fecha_fin==""){
                   alert("llenar campo fecha_fin")
              }
              else if (this.modelo.id_metodologia==null || this.modelo.id_metodologia==""){
                   alert("elegit metodolgia")
              }
              else if (this.seleccionados.length==0){
                   alert("elegit elementos de confiuracion")
              }
              else { 
                  this.listaElementos=[];         
                  for(var i =0;i<this.seleccionados.length ;i++){           
                      this.listaElementos.push({id:this.idseleccionados[i],nombre:this.seleccionados[i],id_fase:this.idseleccionadosfases[i]});

                  }     
                  var cantidad=this.fases.length;
                  //console.log(this.fases.length);
                  var porcentaje=100/parseInt(cantidad); 
                ///  var ListaElementos=this.listaElementos;    
                  this.modelo.listaFases=this.fases;
                  this.modelo.porcentaje=porcentaje;
                  let data=this.modelo;
                 // console.log(data);
                  let url = this.url_base + "proyecto";
                  axios.post(url,data).then(response => {     
                        this.Listacronogramafase=response.data.result;                  
                        this.AgregarCronogramaElemento();
                        }).catch(function (error) {
                            console.log(error);
                        }) .finally(() => {                     
                  })
                }                
             },
             AgregarCronogramaElemento(){
               var lista=[];      
               var listaenviar=[];  
               for(var i =0;i<this.seleccionados.length ;i++){            
                  lista.push({id:this.idseleccionados[i],nombre:this.seleccionados[i],id_fase:this.idseleccionadosfases[i]});
               }             
               for(var i =0;i<lista.length ;i++){     
                 for (var e =0;e<this.Listacronogramafase.length;e++){
                   if(lista[i].id_fase==this.Listacronogramafase[e].id_fase){
                      listaenviar.push({id_elemento:lista[i].id,nombre_elemento:lista[i].nombre,id_cronograma:this.Listacronogramafase[e].id_cronograma,id_cronograma_fase:this.Listacronogramafase[e].id_cronograma_fase});
                 // this.listaenviar.push({id_elemento:lista[i].id,nombre_elemento:lista[i].nombre,id_cronograma:this.Listacronogramafase[e].id_fase,id_cronograma_fase:this.Listacronogramafase[e].id_cronograma_fase});
                //   this.listaenviar.push({id_elemento:lista[i].id,nombre_elemento:lista[i].nombre,id_cronograma:this.Listacronogramafase[e].id_fase,id_cronograma_fase:this.Listacronogramafase[e].id_cronograma_fase});

                    }
                 }
               }
             this.list=listaenviar;    
             let data ={listaenviar:listaenviar}
             let url = this.url_base + "cronogramaelementos";
             axios.post(url,data).then(response => {  
                      this.Limpiar();
                      alert("Proyecto Registrado");
                }).catch(function (error) {
                      console.log(error);
                    
                }) .finally(() => {                     
            });
           },
           Limpiar(){
                this.modelo.nombre_proyecto='';
                this.modelo.id_metodologia=0; 
                this.modelo.fecha_inicio='';  
                this.modelo.descripcion=''; 
                this.modelo.fecha_fin='';        
                this.modelo.listaFases=[];
                this.modelo.porcentaje='';
                this.seleccionados=[];
                this.idseleccionados=[];
                this.idseleccionadosfases=[]; 
          
           },
           MostarFaseMetodolgia(id){
                let me=this;
              //  me.Limpiar();
                axios.get('/fasesemetodologias/'+id).then(response => {              
                    me.fases = response.data.result;
                   //this console.log(response);                  
                    me.listaFases=[];  
                    response.data.result.forEach(item=>{
                        me.listaFases.push({nombre: item.nombre_fase,id_fase:item.id_fase});   
                     });      
                      //this.lista2.push(...(response.filter(item=>item.idfase==indice)))                   
                        //for (let index = 0; index < me.fases.length; index++) {
                       //     me.fases[index].tabla.push(...(me.TodasPlantillas.filter(item=>item.id_fase==me.fases[index].id_fase)))
                      //  }                   
                        //  for(var i=0;i< me.fases.length ;i++){
                        //   for  (var e=0;e< me.TodasPlantillas.length ;e++){                           
                        //       if(me.fases[i].id_fase==me.TodasPlantillas[e].id_fase){   
                        //           me.fases[i].tabla.push({ nombre_elemento:me.TodasPlantillas[e].nombre_elemento,id_elemento:me.TodasPlantillas[e].id_elemento,id_fase: me.fases[i].id_fase})
                        //       } 
                        //   }                    
                        // }  
                      }).catch(function (error) {
                          console.log("ERrro");
                          console.log(error);
                  }) .finally(() => {
              })
          },
    }
}
</script>