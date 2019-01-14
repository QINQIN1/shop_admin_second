export default {
  data () {
    return {
      cateList: [],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 0,
      // 每页总条数
      pagesize: 5,
      // 加载中效果
      loading: false,
      // 添加分类展示对话框
      isShowCateAddDialog: false,
      // 添加分类数据
      cateAddForm: {
      // 级联选择器的数据
        catPidArr: [],
        cat_name: ''
      },
      // 获取添加分类的一级和二级菜单
      cateAddList: []
    }
  },
  created () {
    // 获取分类列表数据
    this.getCateList()
    // 获取添加分类时用到的一级二级列表数据
    this.getCateAddList()
  },
  methods: {
    // 获取分类列表数据
    async getCateList (curPage = 1) {
      // 开启加载中效果
      this.loading = true
      const res = await this.$http.get('/categories', {
        params: {
          type: 3,
          pagenum: curPage,
          pagesize: 5
        }
      })
      // console.log(res)
      // this.cateList = res.data.data
      const {result, pagenum, total} = res.data.data
      this.cateList = result
      this.pagenum = pagenum + 1
      this.total = total

      // 关闭加载中效果
      this.loading = false
    },
    // 切换分页
    changePage (curPage) {
      this.getCateList(curPage)
    },
    // 展示添加分类对话框
    showCateAddDialog () {
      this.isShowCateAddDialog = true
    },
    // 获取分类列表数据
    async getCateAddList () {
      // console.log('getCateAddList')
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.cateAddList = res.data.data
    }
    // 添加分类
  }
}
