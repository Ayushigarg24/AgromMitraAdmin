<template>
    <q-page class="q-pa-md flex flex-center">
      <q-card class="q-pa-md" style="width: 300px;">
        <q-card-section>
          <div class="text-h6">Signup</div>
        </q-card-section>
  
        <q-card-section class="signup_input">
          <q-input v-model="email" label="Email" type="email" dense outlined />
          <q-input v-model="password" label="Password" type="password" dense outlined />
        </q-card-section>
  
        <q-card-actions align="center">
          <q-btn label="Signup" color="primary" @click="handleSignup" />
          <q-btn outline label="Go to Login" @click="goToLogin" />
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  

  
  <script>
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { Notify } from 'quasar';
  
  export default defineComponent({
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleSignup() {
        try {
          await axios.post('http://localhost:3000/signup', {
            email: this.email,
            password: this.password,
          });
          Notify.create({ type: 'positive', message: 'Signup successful!' });
          this.$router.push('/login');
        } catch (error) {
          Notify.create({ type: 'negative', message: error.response.data.error });
        }
      },
      goToLogin() {
        this.$router.push('/login');
      },
    },
  });
  </script>
  
  <style scoped>
 .signup_input{
    display:flex;
    flex-direction: column;
    gap: 5px;
  }
  </style>
  
  
  