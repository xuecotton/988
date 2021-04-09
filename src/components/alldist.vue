<template>
  <div>
    <!-- 没有图片 -->
    <!-- <div class="edudisk" v-show="c_fg == '1'">
      <h2>军委机关</h2>
      <ul class="edudisk_con">
        <li v-for="item in 15" :key="item">
          <a href="#">
            <h3>站酷</h3>
            <p>蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包蟹黄包流沙包</p>
          </a>
        </li>
      </ul>
    </div>-->
    <!-- 有图片 -->
    <div
      class="web_nav"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <div class="header" v-for="item in c_art_list" :key="item.column_id">
        <h2>{{item.column_name}}</h2>
        <ul class="part">
          <li class="item" v-for="a_item in item.articles" :key="a_item.article_id">
            <a :href="a_item.article_url">
              <img :src="a_item.additional_thumbnail" alt />
              <span class="url">
                <h3>{{a_item.article_name}}</h3>
                <p>{{a_item.article_url}}</p>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { pub } from '../assets/js/pub.js'
// 网站导航
export default {
  name: 'alldist',
  data () {
    return {
      c_id: '', // 栏目id
      c_fg: '', // 1 没有图片的样式
      c_art_list: [], // 栏目下的文章数组
      loading: false
    }
  },
  components: {},
  watch: {
    $route (to, from) {
      // 监听路由是否变化
      const that = this
      if (to.query.c_id != from.query.c_id) {
        // 执行事件
        that.GoInfo()
      }
    }
  },
  mounted () {},
  created () {
    const that = this
    that.GoInfo()
  },
  methods: {
    GoInfo () {
      const that = this
      that.c_id = that.$route.query.c_id
      // that.c_fg = that.$route.query.c_fg;
      var op_data = {
        that: that,
        _url: pub_link,
        ur: pub._DetailApi.web_column_columns_articles_list_tree_easy, // 具体接口
        cbk: that.cb_web_column_columns_articles_list_tree, // 回调
        data: {
          column_id: that.c_id
        } // 形参
      }
      pub._InitAjax(op_data)
    },
    cb_web_column_columns_articles_list_tree (res) {
      const that = this
      if (res.stateCode == '200' || res.code == '0') {
        for (let it in res.data.children) {
          that.c_art_list.push(res.data.children[it])
        }
        that.loading = false
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: 'info',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style scoped>
/* 加载的文字提示 */
.web_nav .el-loading-spinner .el-loading-text {
  color: #009255 !important;
}
.web_nav .el-icon-loading:before {
  color: #009255 !important;
}

/* 没有图标 */
.edudisk {
  width: 1200px;
  margin: 0 auto;
}

.edudisk_con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 22px 5px;
}

.edudisk_con li {
  width: 12.5%;
}

.edudisk_con a {
  display: block;
  padding: 14px 10px;
  border-radius: 4px;
  transition: all 0.6s;
}

.edudisk_con a h3 {
  color: #3c3c3c;
  font-size: 18px;
  white-space: nowrap;
  height: 21px;
  line-height: 21px;
  margin-bottom: 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
h3,
h2 {
  font-weight: 600;
}

.edudisk_con p {
  color: #8f8f8f;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-wrap: break-word;
}

.edudisk_con a:hover {
  background-color: #e5f4ee;
}

.edudisk_con a:hover h3 {
  color: #009255;
  text-decoration: underline;
}

.edudisk h2 {
  padding: 13px 36px;
  border-bottom: 1px solid #f1f4f9;
  line-height: 20px;
  color: #242424;
  font-size: 18px;
  background-color: #f5f5f5;
}
/* 有图标 */
.web_nav {
  width: 1200px;
  margin: 0 auto;
}

.web_nav h2 {
  padding: 13px 36px;
  border-bottom: 1px solid #f1f4f9;
  line-height: 20px;
  color: #242424;
  font-size: 18px;
  background-color: #f5f5f5;
}

.web_nav .part {
  padding: 22px 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
}

.web_nav .item {
  width: 25%;
}

.web_nav .item a {
  width: 100%;
  padding: 14px 8%;
  box-sizing: border-box;
  transition: none;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  transition: all 0.6s;
}

.web_nav .item img {
  width: 26px;
  height: 26px;
  border-radius: 100%;
}

.web_nav .url {
  padding: 0 15px;
  width: calc(100% - 30px);
}

.web_nav .url h3 {
  color: #3c3c3c;
  font-size: 18px;
  white-space: nowrap;
  height: 21px;
  line-height: 21px;
  margin-bottom: 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.web_nav .url p {
  color: #8f8f8f;
  font-size: 14px;
  height: 1.5em;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-wrap: break-word;
}

.web_nav a:hover {
  background-color: #e5f4ee;
}

.web_nav a:hover h3 {
  text-decoration: underline;
  color: #009255;
}
</style>
