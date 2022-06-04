<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" header="9.823" text="Documentos" style="height:85%">
       <br>
        <template #footer>
      
        </template>
        <br><br>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" header="9.823" text="Clientes" style="height:85%">
        <template #default>        
        </template>       
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="warning"
        header="9.823"
        text="Casos"
       style="height:85%" >       
       
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="danger"
        header="9.823"
        text="Colegas"
        style="height:85%" >
        
       
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'

export default {
  name: 'WidgetsDropdown',
  components: { CChartLineSimple, CChartBarSimple }
}
</script>
