<template>
    <div>
       <CCard>
          <CCardHeader>
            <strong>Agregar Cliente </strong> 
            
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="3">
                <CInput
                  label="Dni"
                  type="number"
                />
              </CCol>
              <CCol sm="1">
                <label for="B">Buscar</label>
                <CButton type="button" color="info">Buscar</CButton>
              </CCol>
              <CCol sm="4">
                <CInput
                  label="Nombres"
                  placeholder="Ingrese Nombre"
                />
              </CCol>
               <CCol sm="4">
                <CInput
                  label="Apellidos"
                  placeholder="Ingrese Apellidos"
                />
              </CCol>
             
            </CRow>
            <CRow>
               <CCol sm="4">
                <CInput
                  label="Celular"
                 type="number"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                  label="Correo Electronico"
                  placeholder="Ingrese Correo"
                  type="email"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                  label="Direccion"
                  placeholder="Direccion"
                  
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <CSelect
                  label="Pais"
                  :options="['Peru','Chile']"
                />
              </CCol>
              <CCol sm="4">
                <CSelect
                  label="Estado"
                  :options="['Tacna','Arica']"
                />
              </CCol>
              <CCol sm="4">
                <CSelect
                  label="Ciudad"
                  :options="['Tacna','Tarata']"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <div class="Inline Radios">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                  <label class="form-check-label" for="inlineRadio1">Masculino</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                  <label class="form-check-label" for="inlineRadio2">Femenino</label>
                </div>                                  
                </div>
                
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