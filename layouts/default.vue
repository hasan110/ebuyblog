<template>
  <div class="rtl">
    <site-header></site-header>
    <Nuxt />
  </div>
</template>

<script>
import siteHeader from "~/components/partials/site-header";
export default {
  name: 'DefaultLayout',
  components:{
    siteHeader
  },
  data () {
    return {
    }
  },
  created() {
    const apiToken = this.getToken();
    if(apiToken){
      this.auth()
    }
    this.getSetting()
  },
  methods: {
    getSetting () {
      this.$axios.get(`get_settings`)
      .then(res => {
        this.$store.dispatch('app/setSetting' , res.data.data);
      })
      .catch( () => {
      });
    },
    auth(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`getUserData`,{},
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.$store.dispatch('user/setUser' , data);
      })
      .catch( () => {
        this.$store.dispatch('user/setUser' , {});
        this.$cookie.remove(process.env.AUTH_TOKEN_NAME)
        this.$router.replace({name:'index'})
      });
    }
  },
}
</script>
