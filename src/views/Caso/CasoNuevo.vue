<template>
    <div>
       <CCard>
          <CCardHeader>
            <strong>Agregar Caso </strong> 
            
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput
                  label="Cliente"
                
                />
              </CCol>
              
              <CCol sm="4">
               <label for="">Tipo</label>
                 <div class="Inline Radios">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                  <label class="form-check-label" for="inlineRadio1">Peticionario</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                  <label class="form-check-label" for="inlineRadio2">Dennciado</label>
                </div>                                  
                </div>
              </CCol>
              
            </CRow>
            <CRow>
             
              <CCol sm="6">
                <CInput
                  label="Nombre encuestado"
                  
                />
              </CCol>
              <CCol sm="6">
                <CInput
                  label="Defenseor demando"                 
                  
                />
              </CCol>
            </CRow>                 
          </CCardBody>
        </CCard>
         <CCard>
          <CCardHeader>
            <strong>Detalle Caso </strong> 
            
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="4">
                <CInput
                  label="Caso Numero"
                  type="number"
                />
              </CCol>
              
              <CCol sm="4">
               <CSelect
                  label="Tipo Caso"
                  :options="['Tacna','Tarata']"
                />
              
              </CCol>
               <CCol sm="4">
                <CSelect
                  label="Sub Tipo"
                  :options="['Tacna','Tarata']"
                />
              
              </CCol>
             
            </CRow>
            <CRow>
               <CCol sm="4">
                 <CInput
                  label="Fecha"
                  
                />
              </CCol>
              
              <CCol sm="8">
                <CTextarea
                  label="Descrripcion"                 
                  
                />
              </CCol>
            </CRow>                 
          </CCardBody>
             <div class="form-actions float-right">
                   
                  <CButton type="button" color="info">Registrar</CButton>
                  <CButton color="secondary">Cancel</CButton>
                </div>
        </CCard>
    </div>
</template>