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
        <q-item clickable v-ripple @click="showDialog = true">
          <q-item-section avatar>
            <q-icon name="notifications" color="white" />
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

    <!-- Dialog for sending notification -->
    <q-dialog v-model="showDialog" persistent >
      <q-card  style="min-width: 400px;background: linear-gradient(90deg, rgba(29,39,108,1) 10%, rgba(22,28,80,1) 50%, rgba(26,14,84,1) 100%); color:white">
        <q-card-section>
          <div class="text-h6">Send Notification</div>
        </q-card-section>

        <q-card-section style="display: flex; flex-direction: column; gap:6px">
          <q-input
          outlined
            v-model="notification.title"
            label="Title"
            style="/* From https://css.glass */
background: rgba(105, 127, 197, 0.48);
;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(15.7px);
-webkit-backdrop-filter: blur(15.7px);
"
            dense
            required
           
          />
          <q-input
          style="/* From https://css.glass */
background: rgba(105, 127, 197, 0.48);

box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(15.7px);
-webkit-backdrop-filter: blur(15.7px);
"
            v-model="notification.description"
            label="Description"
            outlined
            dense
            type="textarea"
            required
          />
          <q-select
          style="/* From https://css.glass */
background: rgba(105, 127, 197, 0.48);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(15.7px);
-webkit-backdrop-filter: blur(15.7px);
"
            v-model="notification.priority"
            label="Priority"
            :options="[1, 2, 3, 4, 5]"
            outlined
            dense
            required
          />
          <q-select
          style="/* From https://css.glass */
background: rgba(105, 127, 197, 0.48);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(15.7px);
-webkit-backdrop-filter: blur(15.7px);
"
            v-model="notification.icon"
            label="Icons"
            :options="['weather','market','pests','health']"
            outlined
            dense
            required
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="showDialog = false" />
          <q-btn flat label="Send" color="primary" @click="sendNotification" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: true,
      showDialog: false,
      notification: {
        title: '',
        description: '',
        priority: null,
        icon: '',
      },
    };
  },
  methods: {
  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  },
  async sendNotification() {
  if (!this.notification.title || !this.notification.description || !this.notification.priority || !this.notification.icon) {
    if (this.$q.notify) {
      this.$q.notify({
        type: 'negative',
        message: 'Please fill in all fields',
      });
    } else {
      console.error('Notify plugin is not available.');
    }
    return;
  }

  const payload = {
    title: this.notification.title,
    description: this.notification.description,
    priority: this.notification.priority,
    icon: this.notification.icon,
  };

  try {
    if (this.$q.loading) {
      this.$q.loading.show();
    }

    const response = await fetch('https://sih-agromitra-new-server-omyq.vercel.app/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.message || 'Failed to save notification');
    }

    const result = await response.json();

    if (this.$q.notify) {
      this.$q.notify({
        type: 'positive',
        message: result.message || 'Notification sent successfully!',
      });
    }

    this.notification = { title: '', description: '', priority: null,icon:'', };
    this.showDialog = false;
  } catch (error) {
    if (this.$q.notify) {
      this.$q.notify({
        type: 'negative',
        message: error.message || 'An error occurred while sending the notification.',
      });
    } else {
      console.error('Notify plugin is not available.', error);
    }
  } finally {
    if (this.$q.loading) {
      this.$q.loading.hide();
    }
  }
}

},

};
</script>

<style>
/* Add custom styles here if needed */
</style>
