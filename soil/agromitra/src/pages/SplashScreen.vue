<template>
  <div class="splashscreen">
    
  <img src="/img/image.png" alt="" class="splashimage">
  <div class="agrodiv">Agromitra</div>
  <q-btn dense size="lg" unelevated icon="chevron_right" color="green" outline class="splashbtn"
  @click="$router.push('/language')"></q-btn>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.splashscreen{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:10px;
    overflow-x : hidden;
}
.splashimage{
    width: 200px;
    height: 200px;
}

.agrodiv{
    font-size: 30px;
    font-weight: 700;
}
.splashbtn{
    width: 40px;
    height: 30px;
}
</style>