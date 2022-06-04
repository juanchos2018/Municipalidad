<template>
  <div>
 >
    <div style="width: 100%;">
      <h4 style="float: left;">Casos</h4>
   <CButton color="info" style="float:right" @click="NuevoCaso">
              <CIcon name="cil-pencil"/>&nbsp;Agregar Caso
     </CButton>  
</div>  
 <br><br>
    <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="getShuffledUsersData()"
          hover
          striped
          border
          small
          fixed
          caption="Combined All Table"
        />
      </CCol>
    </CRow>

  
  </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import usersData from '../users/UsersData'

export default {
  name: 'Tables',
  components: { CTableWrapper },

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
    NuevoCaso(){
       this.$router.push({path:"casonuevo" });    
    },
    methods(){

    }
  }
}
</script>
