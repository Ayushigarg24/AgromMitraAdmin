<template>
  <q-page class="mainlanguage">
    <div class="splashscreen">
    
    <img src="/img/image.png" alt="" class="splashimage">
    <div class="agrodiv">Agromitra</div>
   
  
    </div>
    <div class="languagetext">Choose your preferred language</div>
    <div class="language tw-grid tw-grid-cols-2 tw-m-2">
   <div class="languagediv div1" @click="$router.push('/index')">English</div>
   <div class="languagediv div2" @click="$router.push('/index')">English</div>
   <div class="languagediv div3" @click="$router.push('/index')">English</div>
   <div class="languagediv div4" @click="$router.push('/index')">English</div>
   <div class="languagediv div5" @click="$router.push('/index')">English</div>
   <div class="languagediv div6" @click="$router.push('/index')">English</div>
   <div class="languagediv div7" @click="$router.push('/index')">English</div>
   <div class="languagediv div8" @click="$router.push('/index')">English</div>
   <div class="languagediv div9" @click="$router.push('/index')">English</div>
   <div class="languagediv div10" @click="$router.push('/index')">English</div>
   <div class="languagediv div11" @click="$router.push('/index')">English</div>
   <div class="languagediv div12" @click="$router.push('/index')">English</div>
   <div class="languagediv div13" @click="$router.push('/index')">English</div>
   <div class="languagediv div14" @click="$router.push('/index')">English</div>

  </div>
</q-page>
</template>

<script>
export default {

}
</script>

<style>
.splashscreen{
    width: 100vw;
    
    display: flex;
    
    align-items: center;
    justify-content: center;
    
    overflow-x : hidden;
}
.div1{
    background-color : orangered;
}
.div2{
    background-color : red;
}
.div3{
    background-color : green;
}
.div4{
    background-color : violet;
}
.div5{
    background-color : purple;
}
.div6{
    background-color : blue;
}
.div7{
    background-color : orange;
}
.div8{
    background-color : yellow;
}
.div9{
    background-color : gray;
}
.div10{
    background-color : palevioletred;
}
.div11{
    background-color : palegreen;
}
.div12{
    background-color : plum;
}
.div13{
    background-color : oldlace;
}
.div14{
    background-color : olive;
}
.languagetext{
    display: flex;
    
    align-items: center;
    justify-content: center;
}
.splashimage{
    width: 80px;
    height: 80px;
}

.agrodiv{
    font-size: 30px;
    font-weight: 700;
}
.mainlanguage{
    display: flex;
    flex-direction: column;
   
}
.language{
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap:15px;
    margin: 15px;
    
}
.languagediv{
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    
}
</style>