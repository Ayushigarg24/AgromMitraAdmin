
 <template>
  <q-page style="overflow-x : hidden ;display: flex; flex-direction: column; gap:20px;background: rgb(11,9,47);
background: linear-gradient(90deg, rgba(11,9,47,1) 0%, rgba(14,14,25,1) 35%, rgba(6,17,47,1) 100%);;">
  <div style="display: flex; justify-content: space-between;">
    <!-- Line Chart -->
     <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="font-size: 30px; color: white; font-weight: bold; padding-left: 50px; padding-top: 20px;">No of Active Users</div>
    <div ref="lineChart" style="width: 48vw; height: 400px; margin-bottom: 50px;"></div>
  </div>
    <!-- Pie Chart -->
     <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="font-size: 30px; color: white; font-weight: bold; padding-left: 45px; padding-top: 20px;">Feedback Ratio</div>
    <div ref="pieChart" style="width: 35vw; height: 400px;"></div>
  </div>
  </div>

  <div style="display: flex; flex-direction: column; gap: 20px;  background: rgb(11,9,47);
background: linear-gradient(90deg, rgba(11,9,47,1) 0%, rgba(14,14,25,1) 35%, rgba(6,17,47,1) 100%);">
    <div style="font-size: 30px; color: white; font-weight: bold; padding-left: 50px; padding-top: 20px;">Complaint Table</div>
    <q-table
      Outlined    
      dark
      color="amber"
      style="padding-left: 40px; padding-right: 40px; background-color: transparent; color: white;"
      separator="horizontal"
      flat
      :rows="rows"
      :columns="columns"
      row-key="email"
      :pagination="initialPagination"
      bordered="white"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            flat
            color="blue"
            label="Read"
            @click="showDetails(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Dialog to show feedback details -->
    <q-dialog v-model="dialogVisible" persistent>
      <q-card style="width: 400px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Feedback Details</div>
        </q-card-section>

        <q-card-section>
          <p><strong>Email:</strong> {{ dialogData.email }}</p>
          <p><strong>Problem:</strong> {{ dialogData.problem }}</p>
          <p><strong>Date:</strong> {{ dialogData.date }}</p>
          <p><strong>Time:</strong> {{ dialogData.time }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</q-page>
</template>


<script>
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import { QTable, QDialog, QCard, QCardSection, QCardActions, QBtn, QTd } from "quasar";
import axios from 'axios';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, TooltipComponent, LegendComponent, LineChart, PieChart, CanvasRenderer, UniversalTransition]);

export default defineComponent({
  name: 'MyCharts',
  components: {
    QTable,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QBtn,
    QTd,
  },
  setup() {
    const dialogVisible = ref(false); // Dialog visibility state
    const dialogData = ref({}); // Data to display in the dialog

    const showDetails = (row) => {
      dialogData.value = { ...row }; // Set dialog data to the selected row
      dialogVisible.value = true; // Open the dialog
    };
    const lineChart = ref(null);
    const pieChart = ref(null);
    let myLineChart = null;
    let myPieChart = null;

    const rows = ref([]); // Rows for the table
    const columns = ref([
      {
        name: "email",
        label: "Email",
        align: "left",
        field: (row) => row.email,
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
    ]);

    const fetchTableData = async () => {
      try {
        // API call to fetch table data
        const response = await axios.post('https://sih-agromitra-new-server-omyq.vercel.app/admin/feedback?top=10');
        if (response.data.success) {
          const feedbacks = response.data.data;
          
          // Transform the API response to match the table structure
          rows.value = feedbacks.map((feedback) => ({
            email: feedback.email || 'No Email', // Replace with actual API field for email
            problem: feedback.feedback_desc || 'No Problem Stated', // Replace with actual API field for problem
            date: new Date(feedback.createdAt).toLocaleDateString(), // Format date
            time: new Date(feedback.createdAt).toLocaleTimeString(), // Format time
          }));
          console.log(row.value);
        } else {
          console.error('Failed to fetch table data:', response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    onMounted(() => {
      fetchTableData(); // Fetch table data on component mount
      initLineChart();
      initPieChart();
      window.addEventListener('resize', resizeCharts);
    });

    const initPieChart = async () => {
  if (!pieChart.value) return;
  myPieChart = echarts.init(pieChart.value);

  try {
    // Fetch data from the feedback count API
    const response = await axios.post('https://sih-agromitra-new-server-omyq.vercel.app/admin/feedback/count');
    if (response.data.success) {
      const data = response.data.data; // { positive: <count>, negative: <count> }

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
            name: 'Feedback Type',
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
              { value: data.negative, name: 'Negative', itemStyle: { color: 'red' } },
              { value: data.positive, name: 'Positive', itemStyle: { color: 'green' } },
            ],
          },
        ],
      };

      myPieChart.setOption(option);
    } else {
      console.error('Failed to fetch data:', response.data.msg);
    }
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
  }
};


    const initLineChart = async () => {
      if (!lineChart.value) return;
      myLineChart = echarts.init(lineChart.value);

      try {
        const response = await axios.get('https://sih-agromitra-new-server-omyq.vercel.app/admin/activeuser?type=month');
        console.log(response);
        if (response.data.success) {
          const data = response.data.data;
          const labels = data.map((item) => item.name);
          const counts = data.map((item) => item.count);

          const option = {
            xAxis: {
              type: 'category',
              data: labels,
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: counts,
                type: 'line',
                smooth: true,
              },
            ],
          };

          myLineChart.setOption(option);
        } else {
          console.error('Failed to fetch data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching line chart data:', error);
      }
    };

    const resizeCharts = () => {
      myLineChart?.resize();
      myPieChart?.resize();
    };

    onBeforeUnmount(() => {
      myLineChart?.dispose();
      myPieChart?.dispose();
      window.removeEventListener('resize', resizeCharts);
    });

    return {
      showDetails,
      dialogVisible,
      dialogData,
      lineChart,
      pieChart,
      rows,
      columns,
    };
  },
});
</script>

<style scoped>
</style>
