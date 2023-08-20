
<template>
  <div>
    <section class="section pt-55 ">
      <div class="container-fluid">
        <div class="row mb-20">
          <div class="col-lg-10 offset-lg-1 m-auto ">
            <div class="post-single">
              <div class="post-single-image">
                <img :src="FileUrl + blog.banner" :alt="blog.title">
              </div>
              <div class="post-single-content">
                <h4>{{blog.title}}</h4>
                <div class="post-single-info">
                  <ul class="list-inline">
                    <li class="dot"></li>
                    <li>{{blog.date}}</li>
                  </ul>
                </div>
              </div>

              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="post-single-body" v-html="blog.blog_content">
              </div>

            </div>

            <!--next & previous-posts-->
            <div class="row">
              <div class="col-md-6">
                <div v-if="previous_blog" class="widget">
                  <nuxt-link :to="{name:'blog-id-slug' , params:{id:previous_blog.uuid , slug:previous_blog.slug}}" class="widget-next-post">
                    <div class="small-post">
                      <div class="image">
                        <b>
                          <img :src="FileUrl + previous_blog.thumbnail" :alt="previous_blog.title">
                        </b>
                      </div>
                      <div class="content">
                        <div>
                          <b class="link"><i class="arrow_right"></i>مقاله قبلی</b>
                        </div>
                        <b>{{previous_blog.title}}</b>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
              <div class="col-md-6">
                <div v-if="next_blog" class="widget">
                  <nuxt-link :to="{name:'blog-id-slug' , params:{id:next_blog.uuid , slug:next_blog.slug}}" class="widget-previous-post">
                    <div class="small-post">
                      <div class="image">
                        <b>
                          <img :src="FileUrl + next_blog.thumbnail" :alt="next_blog.title">
                        </b>
                      </div>
                      <div class="content">
                        <div>
                          <b class="link">
                            <span> مقاله بعدی</span>
                            <span class="arrow_left"></span>
                          </b>
                        </div>
                        <b>{{next_blog.title}}</b>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'BlogData',
  async asyncData({$axios , route , error}) {
    const blogId = route.params.id;
    return await $axios.get(`get_blog/${blogId}`)
    .then( res => {
      const data = res.data.data;
      return {
        blog : data.blog,
        previous_blog:data.previous_blog,
        next_blog:data.next_blog
      }
    })
    .catch( err => {
      if (err.response.status === 404) {
        return error({ statusCode: 404, message: err.message })
      }
      return {
        blog : null,
        previous_blog:null,
        next_blog:null
      }
    });
  },
  data : () => ({
    product_id:null,
    errors:{},
  }),
  head() {
    return {
      title: this.getPageTitle(this.blog.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blog.short_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.blog.blog_keywords
        }
      ]
    }
  }
}
</script>
