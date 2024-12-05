<template>
  <q-layout view="hHh Lpr fff">
    <!-- Sidebar -->
    <q-drawer v-model="drawer" side="left" bordered class="bg-primary text-white">
      <div class="flex items-center justify-between q-pa-md">
        <q-img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="AgroMitra" contain width="40px" />
        <q-btn flat dense icon="menu" @click="drawer = !drawer" />
      </div>
      <q-list dense>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="science" />
          </q-item-section>
          <q-item-section>Soil Analysis</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="eco" />
          </q-item-section>
          <q-item-section>Fertilizers</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="cloud" />
          </q-item-section>
          <q-item-section>Weather</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="place" />
          </q-item-section>
          <q-item-section>Crop Map</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="lightbulb" />
          </q-item-section>
          <q-item-section>Tips</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Header -->
    <q-header class="bg-white text-primary q-px-md">
      <q-toolbar>
        <q-toolbar-title>
          Admin Dashboard
        </q-toolbar-title>
        <q-btn flat dense icon="notifications" />
        <q-btn flat dense icon="settings" />
        <q-avatar>
          <img src="https://creatie.ai/ai/api/search-image?query=A professional headshot" alt="Admin" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Stats Cards -->
        <div class="row q-col-gutter-md">
          <q-card flat bordered class="col-12 col-md-3 q-pa-md">
            <div class="row items-center">
              <q-icon name="people" class="text-primary bg-primary-light q-pa-sm rounded-circle" />
              <div class="col">
                <div class="text-caption text-grey">Total Farmers</div>
                <div class="text-h6">2,453</div>
              </div>
            </div>
          </q-card>
          <q-card flat bordered class="col-12 col-md-3 q-pa-md">
            <div class="row items-center">
              <q-icon name="science" class="text-primary bg-primary-light q-pa-sm rounded-circle" />
              <div class="col">
                <div class="text-caption text-grey">Soil Reports</div>
                <div class="text-h6">847</div>
              </div>
            </div>
          </q-card>
          <q-card flat bordered class="col-12 col-md-3 q-pa-md">
            <div class="row items-center">
              <q-icon name="eco" class="text-primary bg-primary-light q-pa-sm rounded-circle" />
              <div class="col">
                <div class="text-caption text-grey">Active Crops</div>
                <div class="text-h6">1,286</div>
              </div>
            </div>
          </q-card>
          <q-card flat bordered class="col-12 col-md-3 q-pa-md">
            <div class="row items-center">
              <q-icon name="cloud_queue" class="text-primary bg-primary-light q-pa-sm rounded-circle" />
              <div class="col">
                <div class="text-caption text-grey">Weather Alerts</div>
                <div class="text-h6">24</div>
              </div>
            </div>
          </q-card>
        </div>

        <!-- Charts -->
        <div class="row q-col-gutter-md q-mt-md">
          <q-card flat bordered class="col-12 col-md-6 q-pa-md">
            <q-card-section>
              <div class="text-h6">Farmer Registration Trend</div>
              <div id="farmer-chart" style="height: 300px;"></div>
            </q-card-section>
          </q-card>
          <q-card flat bordered class="col-12 col-md-6 q-pa-md">
            <q-card-section>
              <div class="text-h6">Soil Analysis Distribution</div>
              <div id="soil-chart" style="height: 300px;"></div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Recent Activities -->
        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <div class="text-h6">Recent Activities</div>
            <q-table :rows="activities" :columns="activityColumns" flat bordered />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      drawer: true,
      activities: [
        {
          activity: "New Soil Analysis Report",
          user: "John Smith",
          date: "2024-02-15",
          status: "Completed",
        },
        {
          activity: "Weather Alert Created",
          user: "Emma Johnson",
          date: "2024-02-15",
          status: "Pending",
        },
        {
          activity: "Fertilizer Recommendation",
          user: "Michael Brown",
          date: "2024-02-14",
          status: "Completed",
        },
      ],
      activityColumns: [
        { name: "activity", required: true, label: "Activity", align: "left", field: "activity" },
        { name: "user", label: "User", align: "left", field: "user" },
        { name: "date", label: "Date", align: "left", field: "date" },
        { name: "status", label: "Status", align: "left", field: "status" },
      ],
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      const farmerChart = echarts.init(document.getElementById("farmer-chart"));
      farmerChart.setOption({
        xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
        yAxis: { type: "value" },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            smooth: true,
          },
        ],
      });

      const soilChart = echarts.init(document.getElementById("soil-chart"));
      soilChart.setOption({
        series: [
          {
            type: "pie",
            radius: "60%",
            data: [
              { value: 435, name: "Sandy" },
              { value: 310, name: "Clay" },
              { value: 234, name: "Loamy" },
              { value: 155, name: "Silt" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.text-primary {
  color: #4CAF50;
}
.bg-primary {
  background-color: #4CAF50;
}
.bg-primary-light {
  background-color: rgba(76, 175, 80, 0.1);
}
</style>
