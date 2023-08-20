<template>
  <div class="pagination mt--10">
    <ul v-if="totalPages > 1" class="list-inline">
      <li
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        <a>
          <i class="arrow_carrot-2right"></i>
        </a>
      </li>
<!--      <li class="active">-->
<!--        <a href="#">1</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#">2</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#">3</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#">4</a>-->
<!--      </li>-->
      <li
        v-for="page in pages"
        :key="page.name"
        :class="{ active: isPageActive(page.name) }"
        @click="onClickPage(page.name)"
      >
        <a>{{ page.name }}</a>
      </li>
      <li
        :disabled="isInLastPage"
        @click="onClickNextPage"
      >
        <a>
          <i class="arrow_carrot-2left"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomPagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        const startPage = this.totalPages - this.maxVisibleButtons;
        if(startPage > 0){
          return startPage;
        }
        return 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    onClickPreviousPage() {
      if (this.currentPage === 1) return;
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      if(this.totalPages === this.currentPage) return;
      this.$emit('pagechanged', this.currentPage + 1);
    }
  }
}
</script>

<style scoped>

</style>
