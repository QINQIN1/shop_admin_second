// 导入富文本组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  // 注册组件
  components: {
    quillEditor
  },
  created () {
    this.getCateList()
  },
  data () {
    return {
      // 步骤条当前索引
      active: 0,
      // tabActive栏选中的状态
      tabActive: 'basic',
      // 基本信息表单数据
      goodsAddForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        // 是否促销
        is_promote: false,
        // 商品选中项数据(数组)
        selectedGoodsArr: []
      },
      radio: 1,
      // 分类列表数据
      cateList: [],
      // 上传文件的请求头
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 标签页改变
    tabChange (tab) {
      // console.log('tabChange', tab)
      this.active = tab.index - 0
    },
    // 点击下一页
    next (active, tabActive) {
      this.active = active
      this.tabActive = tabActive
    },
    // 获取商品分类列表数据
    async getCateList () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      console.log(res)
      this.cateList = res.data.data
    },
    // 上传图片成功时的回调函数
    onSuccess (response, file, fileList) {
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    // 添加商品
    async addGoods () {
      /*eslint-disable */
      const {
      goods_name,
      selectedGoodsArr,
      goods_price,
      goods_weight,
      goods_introduce,
      goods_number,
      pics,
      is_promote
      } = this.goodsAddForm
      const res = await this.$http.post('/goods', {
        goods_name,
        goods_cat: selectedGoodsArr.join(','),
        goods_price,
        goods_weight,
        goods_introduce,
        goods_number,
        pics,
        is_promote
      })
      console.log(res)
      //  提示成功
      this.$message({
        type:'success',
        message:res.data.meta.msg
      })
      // 跳转
      this.$router.push('/goods')

    }
  }
}
