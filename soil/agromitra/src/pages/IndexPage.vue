
 <template>
  <q-page style="display: flex; flex-direction: column; gap:20px;background: rgb(11,9,47);
background: linear-gradient(90deg, rgba(11,9,47,1) 0%, rgba(14,14,25,1) 35%, rgba(6,17,47,1) 100%);;">
  <div style="display: flex; justify-content: space-between;">
    <!-- Line Chart -->
     <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="font-size: 30px; color: white; font-weight: bold; padding-left: 50px; padding-top: 20px;">No of Active Users</div>
    <div ref="lineChart" style="width: 58vw; height: 400px; margin-bottom: 50px;"></div>
  </div>
    <!-- Pie Chart -->
     <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="font-size: 30px; color: white; font-weight: bold; padding-left: 45px; padding-top: 20px;">Feedback Ratio</div>
    <div ref="pieChart" style="width: 40vw; height: 400px;"></div>
  </div>
  </div>

  <div style="display: flex; flex-direction: column; gap: 20px;  background: rgb(11,9,47);
background: linear-gradient(90deg, rgba(11,9,47,1) 0%, rgba(14,14,25,1) 35%, rgba(6,17,47,1) 100%);">
    <div style="font-size: 30px; color: white; font-weight: bold; padding-left: 50px; padding-top: 20px;">Complaint Table</div>
  <q-table
  style="padding-left: 40px; padding-right: 40px; background-color: transparent; color: white;"
  separator="horizontal"
        flat
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="initialPagination"
        bordered
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="green"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="red"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
  </q-table>
  </div>
</q-page>
</template>

<script>
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, TooltipComponent, LegendComponent, LineChart, PieChart, CanvasRenderer, UniversalTransition]);

export default defineComponent({
  name: 'MyCharts',
  setup() {

    const lineChart = ref(null);
    const pieChart = ref(null);
    let myLineChart = null;
    let myPieChart = null;

    const initLineChart = () => {
      if (!lineChart.value) return;
      myLineChart = echarts.init(lineChart.value);

      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
      };

      myLineChart.setOption(option);
    };

    const initPieChart = () => {
      if (!pieChart.value) return;
      myPieChart = echarts.init(pieChart.value);

      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
        color: 'white', // Change legend text color to white
      },
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 505, name: 'Negative', itemStyle: { color: 'red' }},
              { value: 800, name: 'Positive',itemStyle: { color: 'green' } },
              { value: 484, name: 'Improvement' ,itemStyle: { color: 'yellow' }},
            ],
          },
        ],
      };

      myPieChart.setOption(option);
    };

    onMounted(() => {
      initLineChart();
      initPieChart();
      // Add resize handling
      window.addEventListener('resize', resizeCharts);
    });

    const resizeCharts = () => {
      myLineChart?.resize();
      myPieChart?.resize();
    };

    onBeforeUnmount(() => {
      // Dispose charts and cleanup
      myLineChart?.dispose();
      myPieChart?.dispose();
      window.removeEventListener('resize', resizeCharts);
    });

    return {
      lineChart,
      pieChart,
      initialPagination: ref({
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      }),
     rows :ref([
  { name:'Ayushi',farmer_id:123,problem:'log in',date:'04-12-2024',time:'16:20'},
  { name:'Ayushi',farmer_id:123,problem:'log in',date:'04-12-2024',time:'16:20'},
  { name:'Ayushi',farmer_id:123,problem:'log in',date:'04-12-2024',time:'16:20'},
  { name:'Ayushi',farmer_id:123,problem:'log in',date:'04-12-2024',time:'16:20'},
]),
      columns: ref([
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "farmer_id",
          label: "Farmer Id",
          align: "left",
          field: (row) => row.farmer_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "problem",
          label: "Problem",
          align: "left",
          field: (row) => row.problem,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "date",
          label: "Date",
          align: "left",
          field: (row) => row.date,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "time",
          label: "Time",
          align: "left",
          field: (row) => row.time,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          align: "center",
          field: "actions",
          sortable: false,
        },
      ]),
    };
  },
});
</script>

<style scoped>
.q-table--dark {
  border: 0; /* Remove all default borders */
}

.q-table--dark th,
.q-table--dark td {
  border: 0; /* Remove all default borders */
}

.q-table--dark .q-separator {
  border-color: white; /* Make q-separator white */
  border-left: none; /* Remove left border */
  border-right: none; /* Remove right border */
}

.q-table--dark .q-table__top,
.q-table--dark .q-table__bottom {
  border-top: 1px solid white; /* Add top border */
  border-bottom: 1px solid white; /* Add bottom border */
}

</style>
