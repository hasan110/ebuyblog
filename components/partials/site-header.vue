<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">

        <div class="logo">
          <nuxt-link :to="{name:'index'}">
            <img src="~assets/img/logo.svg" alt="" class="logo-dark">
          </nuxt-link>
        </div>

        <div id="main_nav" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto mr-auto">

            <!--<li class="nav-item dropdown">-->
            <!--  <a class="nav-link dropdown-toggle active" href="index.html" data-toggle="dropdown"> خانه </a>-->
            <!--  <ul class="dropdown-menu fade-up">-->
            <!--    <li><a class="dropdown-item active" href="index.html">طرح 1</a></li>-->
            <!--    <li><a class="dropdown-item" href="index-2.html">طرح 2</a></li>-->
            <!--    <li><a class="dropdown-item" href="index-3.html">طرح 3 </a></li>-->
            <!--    <li><a class="dropdown-item" href="index-4.html">طرح 4 </a></li>-->
            <!--    <li><a class="dropdown-item" href="index-5.html">طرح 5</a></li>-->
            <!--    <li><a class="dropdown-item" href="index-6.html">طرح 6 </a></li>-->
            <!--  </ul>-->
            <!--</li>-->

            <li class="nav-item">
              <nuxt-link :to="{name:'index'}" class="nav-link">  خانه </nuxt-link>
            </li>
            <li class="nav-item">
              <a :href="store_link" target="_blank" class="nav-link">ورود به فروشگاه</a>
            </li>

          </ul>
        </div>

        <div class="navbar-right ml-auto">
          <div class="theme-switch-wrapper">
            <label class="theme-switch" for="checkbox">
              <input v-model="themeSwitcher" id="checkbox" type="checkbox" />
              <div class="slider round"></div>
            </label>
          </div>

          <div class="search-icon" @click="searchOpen = !searchOpen">
            <i class="icon_search"></i>
          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>

    <div class="search" :class="[searchOpen ? 'search-open' : '']">
      <div class="container-fluid">
        <div class="search-width text-center">
          <button type="button" class="close" @click="searchOpen = !searchOpen">
            <i class="icon_close"></i>
          </button>
          <form class="search-form" @submit.prevent="Search()">
            <input v-model="search_key" type="search" value="" placeholder="به دنبال چه هستید ؟">
            <button type="submit" class="search-btn">جستجو</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteHeader",
  data(){
    return {
      themeSwitcher:false,
      searchOpen:false,
      search_key:'',
      store_link:'https://e-buy-shop.com',
    }
  },
  watch:{
    themeSwitcher(){
      if(this.themeSwitcher){
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('dark');
      }else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark');
      }
    }
  },
  mounted() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && currentTheme === 'dark') {
      this.themeSwitcher = true;
    }
  },
  methods:{
    Search(){
      if (this.search_key.length < 4){
        alert('لطفا بیشتر از سه حرف وارد کنید.');
        return;
      }
      this.$router.push({name:'index' , query:{s:this.search_key}})
      this.searchOpen = false;
      this.search_key = '';
    }
  }
}
</script>
