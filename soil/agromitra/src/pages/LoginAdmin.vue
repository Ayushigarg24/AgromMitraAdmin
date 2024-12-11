<template>
    <q-page class="min-height-screen background-cover relative font-lato flex flex-col justify-between tw-w-full">
      <div class="container center flex flex-col items-center justify-between">
        <header class="text-center margin-bottom-8">
          <div class="flex items-center justify-center margin-bottom-4">
            <q-img src="/img/logo.png" alt="AgroMitra Logo" class="logo" />
          </div>
          <h1 class="title">Welcome to AgroMitra Admin Panel</h1>
          <p class="subtitle">Empowering Agriculture with Technology</p>
        </header>
  
        <main class="main-content">
          <q-card class="card">
            <q-card-section>
              <h2 class="section-title">Log In</h2>
            </q-card-section>
            <q-card-section>
              <q-form @submit.prevent="handleLogin">
                <div class="form-group">
                  <q-input
                    v-model="email"
                    outlined
                    dense
                    label="Email"
                    hint="Enter Admin Email"
                    :rules="[(val) => !!val || 'Email is required']"
                    class="input-field"
                  />
  
                  <q-input
                    v-model="password"
                    outlined
                    dense
                    type="password"
                    label="Password"
                    hint="Enter Password"
                    :rules="[(val) => !!val || 'Password is required']"
                    class="input-field"
                  />
  
                  <q-btn type="submit" color="primary" label="Log In" class="submit-button" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
  
          <div class="download-section">
            <p class="download-text">Not an Admin? Download the Farmer App</p>
            <q-btn
              href="#"
              icon="fas fa-download"
              label="Download APK"
              color="white"
              text-color="gray-800"
              class="download-button"
            />
          </div>
        </main>
  
        <footer class="footer">
          <p class="footer-text">&copy; 2024 AgroMitra | All rights reserved</p>
        </footer>
      </div>
    </q-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post(
            'https://sih-agromitra-new-server-omyq.vercel.app/admin/login',
            {
              email: this.email,
              password: this.password,
            }
          );
  
          if (response.data.message === 'Login successful!') {
            this.$q.notify({
              type: 'positive',
              message: 'Login Successful!',
            });
            this.$router.push('/index'); // Navigate to the dashboard after successful login
          } else {
            this.$q.notify({
              type: 'negative',
              message: response.data.message,
            });
          }
        } catch (error) {
          console.error('Login error:', error);
          this.$q.notify({
            type: 'negative',
            message: 'Login failed. Please try again.',
          });
        }
      },
    },
  };
  </script>
  
  <style>
   .min-height-screen {
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.4);
    opacity: 0.9;
    background: url('https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80') center/cover no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container {
    background-repeat: no-repeat;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .logo {
    height: 100px;
    width : 100px; 
  }
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
  }
  .subtitle {
    font-size: 1.2rem;
    color: black;
  }
  .card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .section-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .input-field {
    width: 100%;
  }
  .icon {
    color: #666;
  }
  .submit-button {
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  .submit-button:hover {
    background-color: #45a049;
  }
  .download-section {
    text-align: center;
    margin-top: 20px;
  }
  .download-text {
    font-size: 1rem;
    color: white;
    margin-bottom: 10px;
  }
  .download-button {
    background: rgba(255, 255, 255, 0.95);
    padding: 10px 15px;
    border-radius: 5px;
    color: #333;
  }
  .footer {
    text-align: center;
    margin-top: 20px;
  }
  .footer-text {
    font-size: 0.9rem;
    color: white;
  }
  </style>
  
  