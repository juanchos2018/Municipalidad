<template>
<div>
   <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
        <CButton color="info" class="float-right" @click="add" >Agregar</CButton>
      </slot>
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
        <template #accion="{item}">
          <td>           
            
                <b-button variant="warning" @click="ver(item)">
                <b-icon icon="pencil-square"></b-icon>
              </b-button> 
            <b-button variant="danger" @click="ver(item)" style="margin-left:10px">
                <b-icon icon="trash-fill"></b-icon>
              </b-button> 
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
    <ModalNumber  @CerrarModal="CerrarModal"  v-on:get="get"  />

</div>
 
</template>

<script>

import usersData from '../users/UsersData'
import EventBus from '@/assets/js/EventBus';
import { mapState } from "vuex";
const axios = require("axios").default;
import ModalNumber from './components/ModalNumber'

export default {
  name: 'Table',
   components:{
    ModalNumber
  },
  props: {    
    fields: {
      type: Array,
      default () {
        return ['grupo', 'unid', 'phone', 'photo','accion']
      }
    },
    caption: {
      type: String,
      default: 'Numeros de ayuda'
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  data(){
      return{
          items:[],
          primaryModal:false,
      }
  },
  mounted () {
    this.get();
  },
   computed: {
    ...mapState(["url_base"])  
  },
  methods: {    
    add(){     
      console.log("click");
        EventBus.$emit('ModalNumberShow');
    },
     CerrarModal() {
      this.primaryModal = false;      
    },
    get(){
       let me  = this;
       let url = me.url_base + "helpnumber";
        axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {
            //console.log(response)
        if (response.data.status == 200) {           
            me.items = response.data.result;
        } else {
            me.items=[];
         // Swal.fire({ icon: 'error', text: 'A Ocurrido un error', timer: 2000,})
            //alert("error");
            
            }
        })
    },
    ver(id){

    },  
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }
  }
}
</script>

<style>
th {
    background-color: #1788ED;
    color: white;
} 
</style>