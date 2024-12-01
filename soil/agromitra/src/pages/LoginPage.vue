<template>
    <q-page class="q-pa-md flex flex-center">
      <q-card class="q-pa-md" style="width: 300px;">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>
  
        <q-card-section class="login_input">
          <q-input v-model="email" label="Email" type="email" dense outlined />
          <q-input v-model="password" label="Password" type="password" dense outlined />
        </q-card-section>
  
        <q-card-actions align="center">
          <q-btn label="Login" color="primary" @click="handleLogin" />
          <q-btn outline label="Go to Signup" @click="goToSignup" />
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
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          Notify.create({ type: 'positive', message: 'Login successful!' });
          this.$router.push('/home');
        } catch (error) {
          Notify.create({ type: 'negative', message: error.response.data.error });
        }
      },
      goToSignup() {
        this.$router.push('/signup');
      },
    },
  });
  </script>
  <style>
  .login_input{
    display:flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
  