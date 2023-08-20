<template>
  <section class="section pt-85">
    <div class="container-fluid">
      <div class="row">

        <div v-for="(blog , key) in blogs_data.data" :key="key" class="col-lg-4 col-md-6">
          <nuxt-link :to="{name:'blog-id-slug' , params:{id:blog.uuid , slug:blog.slug}}" class="post-card">
            <div class="post-card-image">
              <b>
                <img :src="FileUrl + blog.thumbnail" :alt="blog.title">
              </b>
            </div>
            <div class="post-card-content">
              <h1 class="title">
                {{blog.title}}
              </h1>
              <p>{{blog.short_description}}</p>
              <div class="post-card-info">
                <ul class="list-inline">
                  <li class="dot"></li>
                  <li>{{blog.date}}</li>
                </ul>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="col-lg-12">
          <custom-pagination
            v-if="blogs_data.data"
            :total-pages="blogs_data.last_page"
            :per-page="blogs_data.per_page"
            :current-page="blogs_data.current_page"
            @pagechanged="onPageChange"
          ></custom-pagination>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import CustomPagination from '~/components/Pagination'
export default {
  name: 'Index',
  components:{
    CustomPagination
  },
  async asyncData({$axios , route}) {
    const query = route.query;
    const newQuery = new URLSearchParams(query).toString();

    return await $axios.get('get_blogs?' + newQuery)
      .then(res => {
        return { blogs_data: res.data.data }
      })
      .catch(() => {
        return { blogs_data: {} }
      })
  },
  data(){
    return {
      loaded:false
    }
  },
  head() {
    return {
      title: this.getPageTitle(),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: ''
        }
      ]
    }
  },
  watch:{
    '$route' (to, from){
      this.getBlogs()
    }
  },
  mounted() {
    this.loaded = true
  },
  methods: {
    onPageChange(page){
      this.blogs_data.current_page = page;
      const query = this.$route.query;
      this.$router.push({name :'index' , query:{...query, page}});
    },
    getBlogs(){
      const query = this.$route.query;
      const newQuery = new URLSearchParams(query).toString();

      this.$axios.get('get_blogs?' + newQuery)
      .then(res => {
        this.blogs_data = res.data.data;
      })
      .catch(() => {
        this.blogs_data = {}
      }).finally(() => {
        window.scrollTo(0, 0);
      })
    }
  }
}
</script>
