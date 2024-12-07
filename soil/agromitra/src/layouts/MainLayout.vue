<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated style="background: linear-gradient(90deg, rgba(18,14,49,14) 0%, rgba(15,15,29,12) 35%, rgba(16,19,47,1) 100%);">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          My App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered style="background: linear-gradient(90deg, rgba(29,39,108,1) 10%, rgba(22,28,80,1) 50%, rgba(26,14,84,1) 100%); color:white">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="home" color="white" />
          </q-item-section>
          <q-item-section>
            Home
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="notifications" color="white"/>
          </q-item-section>
          <q-item-section>
          Send Notification
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: true,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>

