<template>
  <div>
    <section v-if="error.statusCode === 404" class="section pt-55 mb-50">
      <div class="container-fluid">
        <div class="page404  widget">
          <div class="image">
            <img src="assets/img/404.html" alt="">
          </div>
          <div class="content">
            <h1>404</h1>
            <h3>صفحه مورد نظر یافت نشد</h3>
            <p>چیزی که به دنبال آن هستید وجود ندارد.</p>
            <nuxt-link :to="{name:'index'}" class="btn-custom">بازگشت به خانه</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'صفحه مورد نظر یافت نشد',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
