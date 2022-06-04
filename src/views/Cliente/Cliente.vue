<template>
  <div> 

<div style="width: 100%;">
      <h4 style="float: left;">Clientes</h4>
   <CButton color="info" style="float:right" @click="ClienteAgregar">
              <CIcon name="cil-pencil"/>&nbsp;Agregar Cliente
     </CButton>  
        <CButton color="info" style="float:right" @click="AbrirWord">
              &nbsp;AbtitWord
     </CButton> 
</div>  
 
     <br><br>
      <CCard>
      <CCardBody>
    <CRow>
       
      <CCol sm="12">
           <CDataTable
            :items="items"
            :fields="fields"          
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          >
      <template #status="{item}">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{item.status}}
          </CBadge>
        </td>
      </template>
      <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="Ver(item, index)"
          >
           Editar
          </CButton>
            <CButton
            color="danger"
            variant="outline"
            square
            size="sm"
            @click="Ver(item, index)"
          >
           Borrar
          </CButton>
        </td>
      </template>
     
    </CDataTable>
   
      </CCol>
       
    </CRow>
  </CCardBody>
  </CCard>
  </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import usersData from '../users/UsersData'
import axios from  'axios';
export default {
  name: 'Tables',
  components: { CTableWrapper },
  data(){
    return{
        collapseDuration: 0,
         details: [],
       items : [
            { username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
            { username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
            { username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
            { username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
            { username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
            { username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
            { username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned', _classes: 'table-success'},
            { username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
            { username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
            { username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
            { username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active', _classes: 'table-info'},
            { username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
            { username: 'Ebbe Gemariah', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
            { username: 'Eustorgios Amulius', registered: '2012/03/01', role: 'Member', status: 'Pending'},
            { username: 'Leopold Gáspár', registered: '2012/01/21', role: 'Staff', status: 'Active'},
            { username: 'Pompeius René', registered: '2012/01/01', role: 'Member', status: 'Active'},
            { username: 'Paĉjo Jadon', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
            { username: 'Micheal Mercurius', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
            { username: 'Ganesha Dubhghall', registered: '2012/03/01', role: 'Member', status: 'Pending'},
            { username: 'Hiroto Šimun', registered: '2012/01/21', role: 'Staff', status: 'Active'},
            { username: 'Vishnu Serghei', registered: '2012/01/01', role: 'Member', status: 'Active'},
            { username: 'Zbyněk Phoibos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
            { username: 'Einar Randall', registered: '2012/02/01', role: 'Admin', status: 'Inactive', _classes: 'table-danger'},
            { username: 'Félix Troels', registered: '2012/03/21', role: 'Staff', status: 'Active'},
            { username: 'Aulus Agmundr', registered: '2012/01/01', role: 'Member', status: 'Pending'}
          ],
         fields : [
                {label:'Dni', key: 'username', _style:'min-width:200px' },
              
                {label:'Nombre', key: 'registered', _style:'min-width:100px;' },
                { key: 'role', _style:'min-width:100px;' },
                 { key: 'status', _style:'min-width:100px;' },
                { 
                  key: 'show_details', 
                  label: 'Acciones', 
            
                  sorter: false, 
                  filter: false
                }
              ]


    }
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
    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    },
    ClienteAgregar(){
      
         this.$router.push({path:"clienteagregar" });          
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
    AbrirWord(){
         let me=this;
           axios({
                       method: 'post',
                            url: me.RutaApiXml+'api/Abrir',
                            
                      })
                      .then(response => {
                           console.log(response);
                      }).catch(function (error) {
                          console.log(error);
                         
                        
                  })
    },
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    }
  }
}
</script>
