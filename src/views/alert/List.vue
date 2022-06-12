<template>
<div>
   <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}     
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
              <b-button variant="info" @click="ver(item)">
                <svg data-v-41be6633="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="tropical storm" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-tropical-storm mx-auto b-icon bi"><g data-v-41be6633=""><path d="M8 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M9.5 2c-.9 0-1.75.216-2.501.6A5 5 0 0 1 13 7.5a6.5 6.5 0 1 1-13 0 .5.5 0 0 1 1 0 5.5 5.5 0 0 0 8.001 4.9A5 5 0 0 1 3 7.5a6.5 6.5 0 0 1 13 0 .5.5 0 0 1-1 0A5.5 5.5 0 0 0 9.5 2zM8 3.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path></g></svg>
              </b-button>          
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>

</div>
 
</template>

<script>

import EventBus from '@/assets/js/EventBus';
import { mapState } from "vuex";
const axios = require("axios").default;
export default {
  name: 'Table',
   components:{ 
  },
  props: {    
    fields: {
      type: Array,
      default () {
        return ['id', 'name', 'description','date','type_incidence','location','accion']
      }
    },
    caption: {
      type: String,
      default: 'Incidencias'
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
        // EventBus.$emit('ModalNoticeShow');
    },
    get(){
       let me=this;
       let url = this.url_base + "incidencethow";
        axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {
            //console.log(response)
        if (response.data.status == 200) {        
            me.items = response.data.result;
        } else {        
            alert("lista vacia");            
        }
        })
    },
    ver(id){

    },
    CerrarModal() {
      //this.primaryModal = false;      
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