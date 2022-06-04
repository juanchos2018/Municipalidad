<template>
  <div> 
  <CCard>
      <br>
    <CContainer>    
      <CRow>
         <CCol sm="6">        
      <CInput             
         placeholder="Buscar"              
        v-model="search"    />
         </CCol> 
         <CCol sm="1">            
         <div >
          <label data-v-3a42fd9f="" data-v-10d1d8f2="" label="file" class="button file-input">
            <svg data-v-3a42fd9f="" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload-cloud">
            <polyline data-v-3a42fd9f="" points="16 16 12 12 8 16">
              </polyline>
              <line data-v-3a42fd9f="" x1="12" y1="12" x2="12" y2="21"></line>
              <path data-v-3a42fd9f="" d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
              <polyline data-v-3a42fd9f="" points="16 16 12 12 8 16"></polyline></svg>
                <input data-v-3a42fd9f="" id="file" type="file" @change="uploadFile()"  ref="file"  style="display: none;">          
          </label>   
      </div>
         </CCol> 
         <CCol sm="2">
              <CButton color="info" @click="Ocultar">
             <svg data-v-7bff7b67="" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle data-v-7bff7b67="" cx="12" cy="12" r="10"></circle><line data-v-7bff7b67="" x1="12" y1="16" x2="12" y2="12"></line><line data-v-7bff7b67="" x1="12" y1="8" x2="12.01" y2="8"></line></svg>
     </CButton> 
         </CCol> 
    </CRow>  
      </CContainer>
  </CCard>


    <!--                 Contenido   -->
  <div>
   <CCard>   
    <CRow>
      <CCol :sm="size1"> 
          <vue-scroll>
           <div style="height:500px">          
            <CCardBody>    
                <br>
                  <CRow>       
                    <CCol sm="12">        
                    <CListGroup>        
                    <div  v-for="item in filteredList" :key="item.key"  @click="Detalle(item.Tipo,item.RutaServidor)">           
                      <br>
                          <div class="float-right">
                                <CDropdown
                                color="primary"
                                toggler-text="Acciones" 
                                class="m-2"
                              >
                                <CDropdownItem >Descargar</CDropdownItem>
                                <CDropdownItem @click="AbrirArchivo(item.RutaServidor)" >Mostrar</CDropdownItem>
                                <CDropdownItem>Enviar </CDropdownItem>     
                                <CDropdownItem>Mover </CDropdownItem>             
                                </CDropdown>     
                              </div>   
                        <div style="display:flex">             
                            <img v-if="item.Tipo=='pdf'" width="7%" src="../../assets/imagepdf.png" > 
                            <img v-else-if="item.Tipo=='doc'" width="7%" src="../../assets/imageword.png" >   
                            <img v-else-if="item.Tipo=='docx'" width="7%" src="../../assets/imageword.png" >  
                             <img v-else-if="item.Tipo=='png'" width="7%" src="../../assets/logoimagen.png" >  
                                     
                            <div  style="margin-left:10px" ><b data-v-3b9e8dc8="">
                                      {{item.NombreArchivo}}
                                  </b> <div  class="item-info"><div  class="item-shared"><label for="ada">dads</label></div> <!----> <!----> </div>                 
                              </div>   
                          </div>                
                      </div>            
                  </CListGroup>        
                  </CCol> 
                </CRow>        
              </CCardBody>
              </div>
            </vue-scroll>     
          </CCol> 
         <CCol sm="3" v-if="Visible">
          <CContainer>
            <br>
              <div v-if="UrlDocu==null">
                <center>
                  <img src="../../assets/ojoCErrado.png" alt="" width="50%" height="200">
                </center>                  
              </div>
              <div v-else>
                <iframe :src="UrlDocu" frameborder="0" width="100%" height="300">
             </iframe>
              </div>             
          </CContainer>
     </CCol> 
         </CRow>  
      </CCard>   
     </div> 
  </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import usersData from '../users/UsersData'
import axios from  'axios';

//import { font-awesome-icon  } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data(){
    return{
       msg: "Welcome to Your Vue.js App",
         files: [],
         size1:12,         
         Visible:false,
            search: '',
         UrlDocu:null,
         IdCarpeta1:'',
         IdUsuario1:'1',
         file: "",
         path:'',
         collapseDuration: 0,
         details: [],
         items : [],
         fields : [
                  {label:'Dni', key: 'username', _style:'min-width:200px' },              
                  {label:'Nombre', key: 'registered', _style:'min-width:100px;' },
                  { key: 'role', _style:'min-width:100px;' },
                  { key: 'status', _style:'min-width:100px;' },
                  {  key: 'show_details',label: 'Acciones',sorter: false, filter: false }
                ]


      }
    },
    created(){
       
    },
     mounted(){
          this.GetDatos()
    },
    computed: {
            filteredList() {
                return this.items.filter(post => {
                return post.NombreArchivo.toLowerCase().includes(this.search.toLowerCase())
               })
            }
     },
    methods: {
        GetDatos(){
         var item = this.$route.params.idCarpeta
          if(item){          
           // var val = item.split("-")
            this.IdCarpeta1 = item;
            console.log( this.IdCarpeta1);
             this.ListarArchivos();
            
          }         
       },
           handleFileUploads(e){
                this.files = this.$refs.files.files;
                 const file = e.target.files[0];               
               //  this.url = URL.createObjectURL(file);
           }, 
           readFile:function(e)
            {
              //  this.path=e.dataTransfer.files;
                console.log(e);
            },
            Ocultar(){
              //falase
              if(this.Visible){
              this.Visible=false;
              this.size1=12;
              console.log("ees1"+this.Visible)
              } else{
                  this.Visible=true;
                  this.size1=9;
                  console.log("es 2 "+this.Visible)
              } 
              
            },
            Detalle(tipo,url){
              if(this.Visible){
                console.log(url);
                  if(tipo=="pdf"){
                    this.UrlDocu=url; 
                }
                else if(tipo=="png"){
                    this.UrlDocu=url; 
                }
                else{
                    this.UrlDocu=null; 
                }  
              }  
             
             // console.log(tipo);
              //  alert(tipo,url)
            },
           uploadFile: function(){

              this.file = this.$refs.file.files[0];
              this.path = URL.createObjectURL(this.$refs.file.files[0]);
              let formData = new FormData();
              formData.append('file', this.file);
              formData.append('IdCarpeta', this.IdCarpeta1);
              formData.append('IdUsuario', this.IdUsuario1);             
              axios.post('Control/Subir.php/', formData,
                 {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
              })
              .then(function (response) {

                  if(!response.data){
                    alert('File not uploaded.');
                    this. ListarArchivos();
                  }else{
                    alert('File uploaded successfully.');
                  }
              console.log(response.data);
              })
              .catch(function (error) {
                  console.log(error);
              });

            },
            ListarArchivos(){
               let me=this;  
               let IdUsuario=me.IdUsuario1;
               let IdCarpeta =me.IdCarpeta1;    
               const obj={IdUsuario,IdCarpeta};       
               axios.get('Control/Subir.php/?IdUsuario='+IdUsuario+"&IdCarpeta="+IdCarpeta).then(response => {                    
                    me.items = response.data;  
                    console.log(response.data);
                  }).catch(function (error) {
                      console.log(error);
                 }) .finally(() => {                     
             })
            },
            AbrirArchivo(Rutaservidor){             
             var configuracion_ventana = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
                      
             window.open(Rutaservidor, '_blank',configuracion_ventana);
           //    window.open("data:application/pdf;base64, " + base64EncodedPDF,'_blank');
            },
           upload(){
              // esto apra subir archivos 
                    this.show = true;
                    let data = new FormData();                
                   for( var i = 0; i < this.files.length; i++ ){
                            let file = this.files[i];
                            data.append('file[' + i + ']', file);
                    }
                    data.append('nombre', "JUanchos")
               
                    let config = {
                      header : {
                      'Content-Type' : 'multipart/form-data'
                      }
                    }
                    axios.post('Control/Subir.php/', data, config).then(response => {
                         console.log(response);
                      
                                                
                    }) .catch(function(error){
                        console.log(error)
                       
                        console.log('Error!');
                });
             },
        shuffleArray (array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
          return array
        },
        getShuffledUsersData () {
          return this.shuffleArray(usersData.slice(0))
        },
        ClienteAgregar(){
          
            this.$router.push({path:"documentonuevo" });          
        },
        getBadge (status) {
          switch (status) {
            case 'Active': return 'success'
            case 'Inactive': return 'secondary'
            case 'Pending': return 'warning'
            case 'Banned': return 'danger'
            default: 'primary'
          }
        },
        Ver(item,indes){
          alert(item.username);
        },
        toggleDetails (item) {
          this.$set(this.items[item.id], '_toggled', !item._toggled)
          this.collapseDuration = 300
          this.$nextTick(() => { this.collapseDuration = 0})
        }
  }
}
</script>