<template>
  <div>
    <div class="topic_list">
      <h2>{{col_obj.column_name}}</h2>
      <div class="topic">
        <div class="topic_con" v-for="item in c_art_list" :key="item.article_id">
          <a :href="item.article_url">
            <div class="img">
              <img :src="item.additional_cover" alt />
            </div>
            <div class="title">{{item.article_name}}</div>
          </a>
        </div>
        <!-- <div class="topic_con">
          <a href="#">
            <div class="img">
              <img src="../assets/img/zt1.png" alt />
            </div>
            <div class="title">动态播报 | 主题教育开展情况</div>
          </a>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { pub } from '../assets/js/pub.js'
export default {
  name: 'themeone',
  data () {
    return {
      c_id: '', // 栏目id
      col_obj: {}, // 栏目本身信息
      c_art_list: [] // 栏目下的文章数组
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
        ur: pub._DetailApi.web_column_columns_articles_list_tree, // 具体接口
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
        for (let im in res.data) {
          that.col_obj[im] = res.data[im]
        }
        that.c_art_list = []
        for (let it in res.data.articles) {
          that.c_art_list.push(res.data.articles[it])
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
.topic_list {
  width: 1200px;
  margin: 0 auto;
}

.topic {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.topic_list h2 {
  padding: 13px 36px;
  border-bottom: 1px solid #f1f4f9;
  line-height: 20px;
  color: #242424;
  font-size: 18px;
  background-color: #f5f5f5;
}

.topic .topic_con {
  width: 20%;
  margin-bottom: 30px;
}

.topic .topic_con a {
  display: block;
  padding: 10px;
  transition: all 0.6s;
}

.topic .topic_con .img {
  width: 100%;
  overflow: hidden;
}

.topic .topic_con .img img {
  width: 100%;
  transition: all 0.6s;
}

.topic .topic_con .title {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  display: block;
  white-space: nowrap;
  color: #2f2f2f;
  padding: 10px 0;
}

.topic .topic_con a:hover {
  box-shadow: 0px 5px 15px 5px rgba(128, 128, 128, 0.25);
}

.topic .topic_con a:hover img {
  transform: scale(1.05);
}

.topic .topic_con a:hover .title {
  text-decoration: underline;
}
</style>
