<template>
    <div>
       <CCard>
          <CCardHeader>
            <strong>Agregar Documento </strong> 
            
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="4">
                 <CSelect
                  label="Tipo Documento"
                  :options="['Tacna','Arica']"
                />
              </CCol>
              <CCol sm="1">
                <label for="B">Agregar</label>
                <CButton type="button" color="info"> + </CButton>
              </CCol>
              
              <CCol sm="6">
                    <label for="B">Buscar Documento</label>
                <CInputFile
               
                horizontal
              />
              </CCol>
             
            </CRow>
           
            
           
              <div class="form-actions float-right">
                   
                  <CButton type="button" color="info">Registrar</CButton>
                  <CButton color="secondary">Cancel</CButton>
                </div>
          </CCardBody>
        </CCard>
    </div>
</template>