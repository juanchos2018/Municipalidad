<template>
<div>
     <CButton color="info" style="float:right" @click="primaryModal = true">
              <CIcon name="cil-animal"/>&nbsp;Agregar carpeta
     </CButton>   
     <br><br>
   <CCard>
      <CCardHeader>
            <strong>Carpetas </strong>             
      </CCardHeader>
    <CCardBody>
     
    <CListGroup>
       <div  v-for="item in items" :key="item.key" v-on:dblclick="counter += 1,Archivos(item.IdCarpeta)" >
        <CListGroupItem href="#">
            <div style="display:flex">
            <img src="../../assets/carpeta1.png" width="8%"  >            
                    <div  style="margin-left:10px" ><b data-v-3b9e8dc8="">
                        {{item.NombreCarpeta}}
                    </b> <div  class="item-info"><div  class="item-shared"><label for="ada">items  {{item.CantidadArchivos}}</label></div>  </div>
               
                </div>        
            </div>     
            </CListGroupItem>
         </div>    
     </CListGroup>
    </CCardBody>
  </CCard>
 <CModal
      title="Modal title"
      :show.sync="primaryModal"
      color="primary"
      footer="false" 
    >
     <div>
       <CInput
                  label="carpeta demando"                 
                  v-model="NombreCarpeta"
                />
     </div>
      <template #footer>
        <CButton color="danger">Discard</CButton>
        <CButton @click="CrearCarpeta" color="success">crear</CButton>
      </template>
    </CModal>
</div>  
</template>
<script>
import axios from  'axios';
export default {
  name: 'Tablesa',
  components: {  },
        data(){
            return{
               NombreCarpeta:'',
               IdUsuario:'1',
               CantidadArchivos:0,
               primaryModal: false,
               counter: 0,
               collapseDuration: 0,
               details: [],
                items:[],
              items2 : [
                    { nombre: 'Pliciaco', fecha: '2012/01/01', cantidad: 'Member', imagen: 'Active'},
                    { nombre: 'Casos', fecha: '2012/02/01', cantidad: 'Staff', imagen: 'Banned'},  
                ],
            }
        },
       created(){
         this.ListarCarpetas();
       },
        methods: {
            shuffleArray (array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                let temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
            return array
            },
        
            Archivos:function(idCarpeta){
               this.$router.push({name:"documentos" ,params:{idCarpeta} });      
             
            },
            AbrirModal(){

            },
            ListarCarpetas(){
               let me=this;             
               axios.get('Control/Carpeta.php/?IdUsuario='+me.IdUsuario).then(response => {                    
                    me.items = response.data;  
                  }).catch(function (error) {
                      console.log(error);
                 }) .finally(() => {                     
            })
            },
            CrearCarpeta(){
           
                let nombre=this.NombreCarpeta;      
                let IdUsuario=this.IdUsuario;     
                let CantidadArchivos=this.CantidadArchivos;          
                const obj={nombre,IdUsuario,CantidadArchivos};
                axios.post('Control/Carpeta.php/',obj).then(response => {  
                  console.log(response)
                        this.ListarCarpetas();
                        this.primaryModal=false;
                }).catch(function (error) {
                    console.log(error);
                }) .finally(() => {
                
                })
            },
            Ver(name){
             alert(name);
            },
        
        }
}
</script>

