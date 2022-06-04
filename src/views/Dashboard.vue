<template>
  <div>
    <!-- <WidgetsDropdown/> -->
    <CRow>
      <CCol lg="6" class="py-1">
        <CCard>
          <CCardBody>
            <CChartPie
              :datasets="defaultDatasets"
              :labels="['Vandalismo', 'Robo', 'Acoso Sexual', 'Extorsion']"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg="6" class="py-1">
        <CCard>
          <CCardBody>
            <CChartPie
              :datasets="defaultDatasets2"
              :labels="['Ambulancia', 'Policia', 'Bomberos']"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  <CCol lg="12" class="py-1">
        <CCard>
          <CCardBody>
          <CChartBar
          :datasets="defaultDatasets3"
          labels="months"
        />
          </CCardBody>
        </CCard>
      </CCol>
    <CRow >


    </CRow>
  </div>
</template>

<script>
import MainChartExample from "./charts/MainChartExample";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import WidgetsBrand from "./widgets/WidgetsBrand";

import { CChartPie,CChartBar } from "@coreui/vue-chartjs";

export default {
  name: "Dashboard",
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand,
    CChartPie,
    CChartBar
  },
  data() {
    return {
      selected: "Month",      
      tableFields: [
        { key: "avatar", label: "", _classes: "text-center" },
        { key: "user" },
        { key: "country", _classes: "text-center" },
        { key: "usage" },
        { key: "payment", label: "Payment method", _classes: "text-center" },
        { key: "activity" },
      ],
    };
  },
  created() {
    //  if (!this.$session.exists()) {
    //   this.$router.push({path: 'pages/login'}).catch(err => {
    //         if (
    //           err.name !== 'NavigationDuplicated' &&
    //           !err.message.includes('Evitó la navegación redundante a la ubicación actual')
    //         ) {
    //           console(err);
    //         }
    //     });
    //  }
  },
  computed: {
    defaultDatasets() {
      return [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [40, 20, 80, 10],
        },
      ];
    },
    defaultDatasets2() {
      return [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
          data: [40, 20, 80],
        },
      ];
    },
   defaultDatasets3 () {
      return [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }
  },
  methods: {
    color(value) {
      let $color;
      if (value <= 25) {
        $color = "info";
      } else if (value > 25 && value <= 50) {
        $color = "success";
      } else if (value > 50 && value <= 75) {
        $color = "warning";
      } else if (value > 75 && value <= 100) {
        $color = "danger";
      }
      return $color;
    },
  },
};
</script>
