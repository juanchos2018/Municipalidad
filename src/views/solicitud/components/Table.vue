<template>
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
        <template #estado2="{item}">
          <td>
            <CBadge :color="getBadge(item.estado2)">{{item.estado2}}</CBadge>
          </td>
        </template>
        <template #linkdocumento="{item}">
          <td>                 
            <CButton type="button" color="info"  @click="VerDocumento(item)">Ver</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>

import { mapState } from "vuex";
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return [{ label:"Codigo", key: 'id_solicitud', sortable: false },
                  { label:"Fecha", key: 'fecha', sortable: false },    
                  { label:"Objetico", key: 'objetivo', sortable: false },
                  { label:"Proyecto", key: 'nombre_proyecto', sortable: false },
                  { label:"Estado", key: 'estado2', sortable: false },                
                  { label:"Documento", key: 'linkdocumento', sortable: false }]
      },
   
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  computed: {
    ...mapState(["url_base"]),
    },
  methods: {
    getBadge (estado2) {    
      return estado2 == 'Aceptado' ? 'success'
        : estado2 == 'Nuevo' ? 'secondary'
          : estado2 == 'Revision' ? 'warning'
            : estado2 == 'Rechazado' ? 'danger' : 'primary'
    },  
    VerDocumento(item) {       
        let url = this.url_base + "solicitud-pdf/"+item.id_solicitud;        
        window.open(url,'_blank');
    }
  }
}
</script>
