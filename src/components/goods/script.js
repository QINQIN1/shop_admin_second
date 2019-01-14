export default {
  data () {
    return {
      // 获取商品列表数据
      goodsList: [],
      // 当前页
      pagenum: 1,
      // 每页大小
      pagesize: 5,
      // 总页数
      total: 0
    }
  },
  created () {
    // console.log('当前页', this.$route.params.page)
    const pagenum = this.$route.params.page - 0
    // 获取商品列表数据
    this.getGoodsList(pagenum)
  },
  // 监听路由变化
  // watch: {
  //   $route (to, from) {
  //     // console.log('to:', to)
  //     const pagenum = to.params.page - 0
  //     this.getGoodsList(pagenum)
  //   }
  // },
  methods: {
    // 获取商品列表数据
    async getGoodsList (pagenum = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: this.pagesize
        }
      })
      console.log(res)
      const {goods, pagenum: curPage, total} = res.data.data
      this.goodsList = goods
      this.pagenum = curPage - 0
      this.total = total
    },
    // 切换分页
    changePage (curPage) {
      this.getGoodsList(curPage)
      this.$router.push(`/goods/${curPage}`)
    }
  }
}
