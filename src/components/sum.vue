<template>
  <div class="home" v-cloak id="myApps">
    <div class="head_titlt" v-if="Crumbs2">
      <div class="last_head">
        <div class="crumb felx_d">
          <ul class="felx_d">
            <li>您的位置：</li>
            <li>
              <a @click="jumpindex">
                <img src="../assets/img/home.png" alt class="home" /> 网站首页
              </a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
            <li @click="BreadClick">
              <!-- 一级面包屑导航 -->
              <a>{{ column_name }}</a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
            <!-- columnLists3.length != 0 -->
            <li @click="BreadClick" v-if="length != 0 || column_name_first">
              <!-- 二级面包屑导航 -->
              <a>{{ column_name_first }}</a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
            <li @click="BreadClick">
              <!-- 二级面包屑导航 -->
              <a>{{ column_name_three }}</a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="head_titlt" v-if="Crumbs">
      <div class="last_head">
        <div class="crumb felx_d">
          <ul class="felx_d">
            <li>您的位置：</li>
            <li>
              <a @click="jumpindex">
                <img src="../assets/img/home.png" alt class="home" /> 网站首页
              </a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
            <li @click="BreadClick">
              <!-- 一级面包屑导航 -->
              <a>{{ column_name }}</a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app">
      <div class="main_content">
        <!-- 内容 -->
        <div class="con_list">
          <div class="c_con">
            <!-- 左侧列表栏目 光辉历程-->
            <div class="c_left" v-if="myStyleId">
              <div class="title_box">
                <span>{{ column_name }}</span>
                <p>{{ column_title }}</p>
              </div>
              <ul class="c_list">
                <li
                  v-for="(item, index) of columnLists"
                  :key="index"
                  v-show="TwostyleId"
                  @click="getRightListClick(item, index)"
                >
                  <a :class="item.column_id == tab_id ? 'l_active' : ''">{{
                    item.column_name
                  }}</a>
                  <ul class="c_list">
                    <li v-for="(tab, idx) of item.children" :key="idx">
                      <a
                        class="three_right"
                        :class="tab.column_id == tab_id ? 'l_active' : ''"
                        @click="getRightListClick_change(tab, idx)"
                      >
                        <img src="../assets/img/load.png" alt="" />
                        <span>{{ tab.column_name }}</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- 先锋故事+映象视频+软件下载+全国优秀共产党员 -->
            <div class="c_left" v-if="notowid">
              <div class="title_box">
                <span>{{ column_name3 }}</span>
                <p>{{ column_title3 }}</p>
              </div>
              <ul class="c_list">
                <li
                  v-for="(item, index) of columnLists3"
                  :key="index"
                  v-show="TwostyleId"
                  @click="getRightListClick(item, index)"
                >
                  <a :class="item.column_id == tab_id ? 'l_active' : ''">{{
                    item.column_name
                  }}</a>
                  <ul class="c_list">
                    <li v-for="(tab, idx) of item.children" :key="idx">
                      <a
                        class="three_right"
                        :class="tab.column_id == tab_id ? 'l_active' : ''"
                        @click="getRightListClick_change(tab, idx)"
                      >
                        <img src="../assets/img/load.png" alt="" />
                        <span>{{ tab.column_name }}</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- 右边的列表项目 -->
            <div class="c_right act_con c_b" v-if="fg == 1">
              <!-- 光辉历程中的列表栏目开始 style_id_Show=="17" listStyle_id=="08"-->
              <div class="My_Brilliance_list" v-if="listStyle_id == '08'">
                <div class="top_head">
                  <ul>
                    <li>
                      <a>
                        <span class="text" v-if="column_name_three">
                          {{ column_name_three }}</span
                        >
                        <span
                          class="text"
                          v-else-if="length != 0 || column_name_first"
                          >{{ column_name_first }}</span
                        >
                        <span class="text" v-else>{{ column_name }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="new_con">
                  <ul>
                    <li
                      v-for="(item, index) of column_list_first"
                      :key="index"
                      @click="JumpMyart(item.article_id, item.style_id, item)"
                    >
                      <a class="atc_new_list">
                        <span class="new_title">
                          <span class="img">
                            <img src="../assets/img/li_bg01.png" alt />
                          </span>

                          <span class="title">{{ item.article_name }}</span>
                        </span>
                        <span>{{ item.creat_time }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="Number(totalCount)"
                    @current-change="handleCurrentChange08"
                    :page-size="pageSize"
                  ></el-pagination>
                </div>
              </div>
              <!--光辉历程中的列表栏目结束  -->
              <!-- 影像视频中的列表开始部分-->
              <div
                class="My_video_list"
                style="border: 1px solid #f2f2f2"
                v-if="listStyle_id == '14'"
              >
                <div class="video_list">
                  <div
                    class="video_box"
                    v-for="(itemVideo, idx) of column_list_first"
                    :key="idx"
                    @click="JumpMyart(itemVideo.article_id, itemVideo.style_id)"
                  >
                    <div class="txt">
                      <h2>{{ itemVideo.article_name }}</h2>
                    </div>
                    <div class="ckin__player default ckin__overlay">
                      <a class="index_vedio" target="_blank">
                        <img :src="itemVideo.additional_cover" />
                      </a>
                      <button
                        class="default__button--big toggle"
                        title="Toggle Play"
                      >
                        <i class="ckin-play"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="Number(totalCount)"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                  ></el-pagination>
                </div>
              </div>
              <!-- 影像视频中的列表开始部分 -->
              <!-- 文件下载列表开始部分 -->
              <div class="My_file_list" v-if="listStyle_id == '11'">
                <div class="article">
                  <ul class="soft_itdt">
                    <li v-for="(Softitem, idx) of column_list_first" :key="idx">
                      <div class="soft_ico">
                        <a
                          :href="Softitem.article_url"
                          :download="Softitem.article_url"
                        >
                          <img :src="Softitem.additional_thumbnail" alt />
                        </a>
                      </div>
                      <div class="soft_txt">
                        <a
                          :href="Softitem.article_url"
                          :download="Softitem.article_url"
                          >{{ Softitem.article_name }}</a
                        >
                        <div class="remark">
                          <span>{{ Softitem.article_describe }}</span>
                        </div>
                      </div>
                      <div class="download">
                        <a
                          :href="Softitem.article_url"
                          :download="Softitem.article_url"
                          >文件下载</a
                        >
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="Number(totalCount)"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                  ></el-pagination>
                </div>
              </div>
              <!-- 文件下载列表结束部分 -->
              <!-- 人物列表页面 -->
              <div class="My_person_list" v-if="listStyle_id == '10'">
                <div class="top_head">
                  <ul>
                    <li>
                      <a>
                        <span class="text" v-if="column_name_three">{{
                          column_name_three
                        }}</span>
                        <span class="text" v-else>{{ column_name3 }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="advanced_person">
                  <ul>
                    <li
                      v-for="(gooditem, idx) of column_list_first"
                      :key="idx"
                      @click="JumpMyart(gooditem.article_id, gooditem.style_id)"
                    >
                      <div class="list">
                        <a class="pic">
                          <img :src="gooditem.additional_cover" alt />
                        </a>
                        <div class="con">
                          <h4>
                            <a>{{ gooditem.article_name }}</a>
                          </h4>
                          <div class="b_line"></div>
                          <div class="p">{{ gooditem.article_describe }}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="Number(totalCount)"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                  ></el-pagination>
                </div>
              </div>
              <!-- 人物列表页面 -->
            </div>
            <!-- 右边详情 -->
            <div
              class="c_right act_con c_b"
              v-if="fg == 2"
              style="border: 1px solid #f2f2f2"
            >
              <!-- 单个文章样式 listStyle_id=='08' style_id_Show=='17'-->
              <div
                v-if="
                  style_id_Show == '17' ||
                  style_id_Show == '13' ||
                  style_id_Show == '05'
                "
              >
                <div class="myarticles" v-if="style_id_Show == '17'">
                  <div class="content">
                    <h2>{{ article_name }}</h2>
                    <div class="time">
                      <span>{{ creat_time }}</span>
                    </div>
                  </div>
                  <div class="article" v-html="ueditor_text">
                    {{ ueditor_text }}
                  </div>
                </div>
                <!--单个视频开始 -->
                <div class="myvideos" v-if="style_id_Show == '13'">
                  <section class="public_width">
                    <dl class="video_con">
                      <figure class="video_con_show tab">
                        <div class="video_bofang tab-box">
                          <div
                            class="video_con_show_con"
                            v-for="(item, idx) of article_vedio_list"
                            :key="idx"
                          >
                            <video controls :poster="additional_cover">
                              <source :src="item.file_img" type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      </figure>
                      <div class="title">
                        <div class="video_con_title">{{ article_name }}</div>
                        <div class="person_time">
                          <span>
                            发布人：
                            <span>{{ article_author }}</span>
                          </span>
                          <span>{{ creat_time }}</span>
                        </div>
                      </div>
                    </dl>
                  </section>
                </div>
                <!-- 单个视频结束 -->
                <!-- 视频+文章开始listStyle_id=="10" -->
                <div class="My_video_articles" v-if="style_id_Show == '05'">
                  <div class="top_head">
                    <ul>
                      <li>
                        <a href="#">
                          <span class="text">{{ article_name }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="ad_p">
                    <h1>{{ article_text }}</h1>
                    <video
                      controls
                      :poster="additional_cover"
                      class="video"
                      v-for="(item, idx) of article_vedio_list"
                      :key="idx"
                    >
                      <source :src="item.file_img" type="video/mp4" />
                    </video>
                    <div class="ad_intrd" v-html="ueditor_text">
                      {{ ueditor_text }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="myarticles" v-else>
                <div class="content">
                  <h2>{{ article_name }}</h2>
                  <div class="time">
                    <span>{{ creat_time }}</span>
                  </div>
                </div>
                <div class="article">文章内容错误，请联系管理员</div>
              </div>

              <!-- 视频加文章结束-->
              <div class="length">
                <div class="length_conn">
                  <ul class="pagination">
                    <li class="page_item" @click="GoPrev">
                      <a class="page_link">
                        上一页
                        <span class="down">:</span>
                        <span class="down">{{ PREV_NAME }}</span>
                      </a>
                    </li>
                    <li class="page_item" @click="GoNext">
                      <a class="page_link pull_right">
                        下一页
                        <span class="down">: {{ NEXT_NAME }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import myhttp from "../assets/js/myhttp.js";
import $ from "jquery";
import { Base64 } from "js-base64";
export default {
  name: "sum",
  data() {
    return {
      isActive: "", //选中二级栏目的样式
      index: "0", //二级栏目中的下标
      column_name: "", //根据传递过来的一级栏目中的column_id查询出一级栏目中的值；
      column_title: "", //一级栏目的副标题；
      columnLists: [], //二级栏目中的列表
      listStyle_id: "", //列表样式id
      myStyleId: "", //一级栏目样式
      TwostyleId: "", //二级栏目级样式
      column_id: "", //获取栏目的id;
      column_id2: "", //获取二级栏目的id2
      style_id: "",
      pageSize: 16,
      pageNum: 1,
      column_id_first: "", //获取第一个二级栏目中的栏目的id,目的是为了找到第一个二级栏目中的文章列表
      column_name_first: "", //获取第一个二级栏目中的栏目的column_name,
      column_list_first: [], //获取第一个二级栏目中的栏目的list列表
      tab_id: "", //切换当前的列表颜色，点击此列表显示此列表中的颜色
      // 数据的合并；
      fg: "",
      style_id_Show: "", //展示哪一个样式
      // 控制文章的数据
      article_name: "", //文章的标题；
      article_author: "", //文章的作者；
      creat_time: "", //文章创建的时间；
      article_vedio_list: "", //视频信息；
      additional_cover: "", //视频信息的封面图
      NEXT_NAME: "", //下一页；
      PREV_NAME: "", //上一页；
      ueditor_text: "", //文章的详情；
      article_text: "", //商品加文章中的文章的标题；
      article_picture: "", //共产党员的图片
      NEXT_ID: "", //上一篇的文章的article_id
      PREV_ID: "", //下一篇的文章的article_id
      article_id: "", //获取文章id;
      //不区分传入的column_id 是几级栏目
      column_type: "", //区分栏目的类型；
      notowid: false,
      column_name3: "",
      column_title3: "",
      columnLists3: "",
      totalCount: "",
      Crumbs: "", //面包屑导航判断显示有无用在=映象视频+软件下载+全国优秀共产党员
      Crumbs2: "", //只用在关辉历程+先锋故事
      length: "", // 此length的长度用来判断是否由二级栏目，有二级栏目显示第一个二级栏目中的列表的标题，没有显示一级栏目中以及栏目标题
      column_name_three: "", //二级栏目下的三级栏列表下的第一个文章列表中的名称
      length_three: "", //判断三级栏目的长度
      art_column_id: "", //文章详情下的栏目id
      sty_id: "",
      xxdx_column_id: "",
      column_id_three: "",
    };
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      const that = this;
      if (to.query.column_id != from.query.column_id) {
        // 执行事件
        this.style_id = this.$route.query.style_id;
        (this.column_id = this.$route.query.column_id), //获取栏目的id;
          (this.column_id2 = this.$route.query.column_id2), //获取二级栏目的id2
          (this.tab_id = this.$route.query.column_id), //切换当前的列表颜色，点击此列表显示此列表中的颜色
          (this.article_id = this.$route.query.article_id), //获取文章id;
          // 数据的合并；
          (this.fg = this.$route.query.fg),
          this.ShowStyle();
        this.getcolumnFirst();
        this.getArticleDetails();
      }
    },
  },
  created() {
    this.style_id = this.$route.query.style_id;
    (this.column_id = this.$route.query.column_id), //获取栏目的id;
      (this.column_id2 = this.$route.query.column_id2), //获取二级栏目的id2
      (this.tab_id = this.$route.query.column_id), //切换当前的列表颜色，点击此列表显示此列表中的颜色
      (this.article_id = this.$route.query.article_id), //获取文章id;
      // 数据的合并；
      (this.fg = this.$route.query.fg),
      this.ShowStyle();
    this.getcolumnFirst();
    this.getArticleDetails();
  },
  methods: {
    // lookup_column_api
    // 根据当前栏目id查询当前栏目信息及下级栏目信息
    ShowStyle() {
      const that = this;
      let style_id = that.style_id; //列表样式
      let fg = that.fg; //判断显示文章详情还是栏目列表
      switch (fg) {
        case "1":
          switch (style_id) {
            case "10":
              that.TwostyleId = true;
              that.myStyleId = false;
              that.notowid = true;
              that.Crumbs = false;
              that.Crumbs2 = true;
              that.listStyle_id = "10";
              break;
            case "14":
              that.TwostyleId = true;
              that.myStyleId = false;
              that.notowid = true;
              that.Crumbs = true;
              that.Crumbs2 = false;
              that.listStyle_id = "14";
              break;
            case "11":
              that.TwostyleId = true;
              that.myStyleId = false;
              that.notowid = true;
              that.Crumbs = true;
              that.Crumbs2 = false;
              that.listStyle_id = "11";
              break;
            case "08":
              that.TwostyleId = true;
              that.myStyleId = true;
              that.notowid = false;
              that.Crumbs = false;
              that.Crumbs2 = true;
              that.listStyle_id = "08";
              break;
            case "03":
              that.TwostyleId = true;
              that.myStyleId = true;
              that.notowid = false;
              that.Crumbs = false;
              that.Crumbs2 = true;
              that.listStyle_id = "08";
              break;
            case "18":
              that.TwostyleId = true;
              that.myStyleId = false;
              that.notowid = true;
              that.Crumbs = false;
              that.Crumbs2 = true;
              that.listStyle_id = "08";
              break;
          }
        case "2":
          switch (style_id) {
            case "05":
              that.TwostyleId = true;
              that.myStyleId = false;
              that.notowid = true;
              that.Crumbs = false;
              that.Crumbs2 = true;
              that.style_id_Show = "05";
              break;
            case "13":
              that.TwostyleId = true;
              that.myStyleId = false;
              that.notowid = true;
              that.Crumbs = true;
              that.Crumbs2 = false;
              that.style_id_Show = "13";
              break;
            case "17":
              that.TwostyleId = true;
              that.myStyleId = true;
              that.notowid = false;
              that.Crumbs = false;
              that.Crumbs2 = true;
              that.style_id_Show = "17";
              break;
          }
      }
    },
    // 查询此时的栏目是几级栏目
    getcolumnFirst() {
      const that = this;
      var columnParams = {
        that: that,
        _url: myhttp._url,
        ur: myhttp._DetailApi.getFristColumn_api, // 具体接口
        cbk: that.getcolumnFirstCbk, // 回调
        data: {
          column_id: that.column_id,
        },
      };
      myhttp._InitAjax(columnParams);
    },
    getcolumnFirstCbk(res) {
      // debugger
      const that = this;
      // 此length的长度用来判断
      that.length = res.data.children.length;
      // 一进门就查看当前栏目是几级
      if (res.data.column_type == "column_1") {
        that.column_id = res.data.column_id;
        (that.column_name = res.data.column_name),
          (that.column_title = res.data.column_title);
        that.columnLists = res.data.children;
        (that.column_name3 = res.data.column_name),
          (that.column_title3 = res.data.column_title);
        that.columnLists3 = res.data.children;
        that.style_id = res.data.style_id;
      } else if (res.data.column_type == "column_2") {
        if (res.data.children.length > 0) {
          that.column_id_three = res.data.children[0].column_id;
          that.length_three = res.data.children[0].children.length;
          var columnParams = {
            that: that,
            _url: myhttp._url,
            ur: myhttp._DetailApi.getFristColumn_api, // 具体接口
            cbk: that.getmysecond, // 回调
            data: {
              column_id: res.data.column_pid,
            },
          };
          myhttp._InitAjax(columnParams);
        } else {
          (that.column_name3 = res.data.column_name),
            (that.column_name_first = res.data.column_name),
            (that.column_title3 = res.data.column_title);
          that.columnLists3 = res.data.children;
          that.style_id = res.data.style_id;
          var columnParams = {
            that: that,
            _url: myhttp._url,
            ur: myhttp._DetailApi.getFristColumn_api, // 具体接口
            cbk: that.getmysecond, // 回调
            data: {
              column_id: res.data.column_pid,
            },
          };
          myhttp._InitAjax(columnParams);
        }
      } else if (res.data.column_type == "column_3") {
        that.column_name3 = res.data.column_name;
        that.column_title3 = res.data.column_title;
        that.columnLists3 = res.data.children;
        that.style_id = res.data.style_id;
        that.column_name_first = res.data.column_name;
        var columnParams = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getFristColumn_api, // 具体接口
          cbk: that.getmysecond, // 回调
          data: {
            column_id: res.data.column_pid,
          },
        };
        myhttp._InitAjax(columnParams);
      } else if (res.data.column_type == "column_4") {
        that.column_name3 = res.data.column_name;
        that.column_title3 = res.data.column_title;
        that.columnLists3 = res.data.children;
        that.style_id = res.data.style_id;
        var columnParams = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getFristColumn_api, // 具体接口
          cbk: that.getmysecond, // 回调
          data: {
            column_id: res.data.column_pid,
          },
        };
        myhttp._InitAjax(columnParams);
      } else if (res.data.column_type == "coloumn_5") {
        that.column_name3 = res.data.column_name;
        that.column_title3 = res.data.column_title;
        that.columnLists3 = res.data.children;
        that.style_id = res.data.style_id;
        var columnParams = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getFristColumn_api, // 具体接口
          cbk: that.getmysecond, // 回调
          data: {
            column_id: res.data.column_pid,
          },
        };
        myhttp._InitAjax(columnParams);
      }
      // 判断一级栏目下是否有二级栏目
      // 当判断右侧栏目列表是几级栏目下的列表；

      if (res.data.children.length == 0) {
        that.getNoTwoColumn();
        // that.column_id_first=res.data.column_id
      } else if (res.data.children[0].children.length != 0) {
        // 二级栏目下的三级栏列表下的第一个文章列表中的名称
        that.length_three = res.data.children[0].children.length;
        that.column_name_three = res.data.children[0].children[0].column_name;
        that.column_id_first = res.data.children[0].children[0].column_id;
        that.column_id = res.data.children[0].children[0].column_id;
        that.getFirstArticle();
        that.column_name_first = res.data.children[0].column_name;
      } else {
        (that.column_id_first = res.data.children[0].column_id), //二级栏目中的第一个二级栏目id
          (that.column_name_first = res.data.children[0].column_name),
          // 因有三级栏目注释
          (that.column_id2 = res.data.children[0].column_id); //二级栏目中的第一个二级栏目id
        that.getFirstArticle();
      }
    },

    getmysecond(res) {
      const that = this;
      (that.column_name = res.data.column_name),
        (that.column_title = res.data.column_title);
      that.columnLists = res.data.children;
      if (res.data.children[0].children.length > 0) {
        that.column_name3 = res.data.column_name;
        (that.column_name_first = res.data.children[0].column_name),
          (that.column_title3 = res.data.column_title);
        that.columnLists3 = res.data.children;
        that.style_id = res.data.style_id;
        that.column_name_three = res.data.children[0].children[0].column_name;
      }
    },
    // 若无二级二级栏目获取本栏目文章列表；
    getNoTwoColumn() {
      // debugger
      const that = this;
      var NoTwoColumnPramas = {
        that: that,
        _url: myhttp._url,
        ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
        cbk: that.getNoColumnCbk, // 回调
        data: {
          column_id: that.column_id,
          pageSize: that.pageSize,
          pageNum: that.pageNum,
        },
      };
      myhttp._InitAjax(NoTwoColumnPramas);
    },
    getNoColumnCbk(res) {
      const that = this;
      if (res.code == "0") {
        that.column_list_first = res.page.list;
        that.totalCount = res.page.totalCount;
      } else {
        this.$message({
          message: "警告获取信息失败",
          type: "warning",
        });
      }
    },
    // 获取第一个二级栏目中的文章列表
    getFirstArticle() {
      const that = this;
      var HaveTwoColumnFristPramas = {
        that: that,
        _url: myhttp._url,
        ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
        cbk: that.getFirstArticleCbk, // 回调
        data: {
          column_id: that.column_id_first,
          pageSize: that.pageSize,
          pageNum: that.pageNum,
        },
      };
      myhttp._InitAjax(HaveTwoColumnFristPramas);
    },
    getFirstArticleCbk(res) {
      const that = this;
      if (res.code == "0") {
        that.column_list_first = res.page.list;
        that.totalCount = res.page.totalCount;
      } else {
        that.$message({
          message: "二级栏目下的第一个文章列表获取失败",
          type: "info",
          duration: 3000,
        });
      }
    },
    // 点击左侧的二级栏目列表获取右侧对应的文章列表；
    getRightListClick(data, index) {
      // debugger
      const that = this;
      that.column_id_three = "";
      // alert(data)
      // 当点击栏目之后如果此栏目下有下级栏目 , 则此点击事件不执行
      // 如果没有执行
      // 根据此栏目下children的长度是否大于0 来判断，如果大于0 说明有下级，由下级则不执行此函数
      if (data.children.length == 0) {
        const that = this;
        that.tab_id = data.column_id;
        that.fg = 1;
        that.listStyle_id = data.style_id;
        that.column_id2 = data.column_id;
        that.column_name_first = data.column_name;
        var HaveTwoColumnPramas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.GetRightCbk, // 回调
          data: {
            column_id: data.column_id,
            pageSize: that.pageSize,
            pageNum: that.pageNum,
          },
        };
        myhttp._InitAjax(HaveTwoColumnPramas);
      }
    },
    getRightListClick_change(data, index) {
      const that = this;
      that.tab_id = data.column_id;
      that.column_id = data.column_id;
      that.xxdx_column_id = data.column_id;
      that.fg = 1;
      that.listStyle_id = data.style_id;
      if (data.style_id == "06" || data.style_id == "12") {
        that.listStyle_id = "10";
      } else if (data.style_id == "18") {
        that.listStyle_id = "08";
      }

      // that.column_name_first=data.column_name
      that.column_name_three = data.column_name;
      // that.column_name3=data.column_name
      var HaveTwoColumnPramas = {
        that: that,
        _url: myhttp._url,
        ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
        cbk: that.GetRightCbk, // 回调
        data: {
          column_id: data.column_id,
          pageSize: that.pageSize,
          pageNum: that.pageNum,
        },
      };
      myhttp._InitAjax(HaveTwoColumnPramas);
    },
    GetRightCbk(res) {
      const that = this;
      if (res.code == "0") {
        that.column_list_first = res.page.list;
        that.totalCount = res.page.totalCount;
      } else {
        that.$message({
          message: "数据加载失败",
          type: "info",
          duration: 3000,
        });
      }
    },
    // 从文章列表页面跳转到文章详情页面
    JumpMyart(a_id, s_id) {
      const that = this;
      let column_id = that.column_id;
      let column_id2 = that.column_id2;

      that.fg = 2;
      if (s_id == "07") {
        that.style_id_Show = "05";
      } else if (s_id == "17") {
        that.style_id_Show = "17";
      } else if (s_id == "13") {
        that.style_id_Show = "13";
      } else if (s_id == "05") {
        that.style_id_Show = "05";
      } else {
        console.log("其他文章样式，暂无");
      }

      if (column_id2) {
        var getArtdet_par = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
          cbk: that.getArticleDetailsCbk, // 回调
          data: {
            column_id: that.column_id2,
            article_id: a_id,
          },
        };
        myhttp._InitAjax(getArtdet_par);
        // that.style_id=s_id;
      } else {
        var getArtdet_par = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
          cbk: that.getArticleDetailsCbk, // 回调
          data: {
            column_id: that.column_id,
            article_id: a_id,
          },
        };
        myhttp._InitAjax(getArtdet_par);
      }
      var getArtdet_par = {
        that: that,
        _url: myhttp._url,
        ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
        cbk: that.getArticleDetailsCbk, // 回调
        data: {
          column_id: that.column_id,
          article_id: a_id,
        },
      };
      myhttp._InitAjax(getArtdet_par);
    },
    // 获取文章的详细信息
    getArticleDetails() {
      const that = this;
      if (that.column_id2) {
        if (that.article_id != "") {
          var getArtdet_par = {
            that: that,
            _url: myhttp._url,
            ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
            cbk: that.getArticleDetailsCbk, // 回调
            data: {
              column_id: that.column_id2,
              article_id: that.article_id,
            },
          };
          myhttp._InitAjax(getArtdet_par);
        }
      } else {
        if (that.article_id != "") {
          var getArtdet_par = {
            that: that,
            _url: myhttp._url,
            ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
            cbk: that.getArticleDetailsCbk, // 回调
            data: {
              column_id: that.column_id,
              article_id: that.article_id,
            },
          };
          myhttp._InitAjax(getArtdet_par);
        }
      }
    },

    getArticleDetailsCbk(res) {
      const that = this;
      if (res.stateCode == "200") {
        that.style_id_Show = res.data.style_id;
        if (res.data.style_id == "07" || res.data.style_id == "16") {
          that.style_id_Show = "05";
        }
        that.art_column_id = res.data.column_id;
        that.article_name = res.data.article_name;
        that.article_author = res.data.article_author;
        that.creat_time = res.data.creat_time;
        that.ueditor_text = Base64.decode(res.data.ueditor_text);
        that.article_vedio_list = res.data.article_vedio;
        that.additional_cover = res.data.additional_cover;
        that.PREV_NAME = res.data.PREV_NAME; //上一篇
        that.NEXT_NAME = res.data.NEXT_NAME; //下一篇；
        that.article_text = res.data.article_text; //person共产党员的标题；
        that.article_picture = res.data.article_picture; //共产党员的图片  ;
        that.NEXT_ID = res.data.NEXT_ID; //下一篇的  article_id
        that.PREV_ID = res.data.PREV_ID; //上一篇的  article_id
        that.article_title = res.data.article_title;
      }
    },
    // 上一篇下一篇
    // 上一篇
    GoPrev() {
      const that = this;
      if (that.PREV_ID == "") {
        that.$message({
          message: that.PREV_NAME,
          type: "info",
          duration: 3000,
        });
      } else {
        var getArtdet_par = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
          cbk: that.getArticleDetailsCbk, // 回调
          data: {
            column_id: that.art_column_id,
            article_id: that.PREV_ID,
          },
        };
        myhttp._InitAjax(getArtdet_par);
      }
    },
    // 下一篇
    GoNext() {
      const that = this;
      if (that.NEXT_ID == "") {
        that.$message({
          message: that.NEXT_NAME,
          type: "info",
          duration: 3000,
        });
      } else {
        var getArtdet_par = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getarticledeticle_api, // 具体接口
          cbk: that.getArticleDetailsCbk, // 回调
          data: {
            column_id: that.art_column_id,
            article_id: that.NEXT_ID,
          },
        };
        myhttp._InitAjax(getArtdet_par);
      }
    },

    // 面包屑导航
    BreadClick() {
      const that = this;
      that.fg = 1;
      that.listStyle_id = that.style_id;
      if (that.listStyle_id == "18") {
        that.listStyle_id = "08";
      } else if (that.listStyle_id == "03") {
        that.listStyle_id = "08";
      }
    },

    // 分页操作
    handleCurrentChange(val) {
      // debugger
      const that = this;
      if (
        that.column_id_three == that.column_id_first &&
        that.column_id_first != ""
      ) {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.column_id_three,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
        myhttp._InitAjax(page_parmas);
      } else if (
        that.column_id_first == that.column_id2 &&
        that.xxdx_column_id == ""
      ) {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.column_id_first,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
      } else {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.column_id,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
        myhttp._InitAjax(page_parmas);
      }
    },
    // 文章列表分页
    handleCurrentChange08(val) {
      const that = this;
      if (
        that.column_id_first == that.column_id2 &&
        that.xxdx_column_id == ""
      ) {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.column_id_first,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
      } else if (that.column_id2 && that.xxdx_column_id == "") {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.column_id2,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
      } else if (that.xxdx_column_id) {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.xxdx_column_id,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
      } else {
        var page_parmas = {
          that: that,
          _url: myhttp._url,
          ur: myhttp._DetailApi.getNoColumn_api, // 具体接口
          cbk: that.getNoColumnCbk, // 回调
          data: {
            column_id: that.column_id,
            pageSize: that.pageSize,
            pageNum: val,
          },
        };
      }

      myhttp._InitAjax(page_parmas);
    },
    jumpindex() {
      LinkIndexGo();
    },
  },
};
</script>
  
  
  


<style scoped>
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.con_list {
  font-family: "Source Han Serif SC", "Source Han Serif", "source-han-serif-sc",
    "PT Serif", "SongTi SC", "MicroSoft Yahei", Source Han Sans SC,
    Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}

.head_titlt {
  width: 100%;
  border-bottom: 1px solid rgb(240, 242, 245);
}

.last_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-family: "Source Han Serif SC", "Source Han Serif", "source-han-serif-sc",
    "PT Serif", "SongTi SC", "MicroSoft Yahei", Source Han Sans SC,
    Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}

.felx_d ul {
  font-size: 12px;
  color: #242424;
  font-weight: 300;
}

.felx_d {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.crumb li a {
  color: #242424;
  cursor: pointer;
}

.crumb li a:hover {
  color: #009255;
}

.crumb li:last-child .img {
  display: none;
}

.crumb li img {
  width: 10px;
  height: 10px;
  margin: 0 10px;
}

.crumb li .home {
  width: 12px;
  height: 12px;
}

.page_nav a {
  display: inline-block;
  margin: 0 5px;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  padding: 0 20px;
  height: 30px;
  color: #333;
  transition: all 0.6s;
}

.page_nav a:hover {
  background-color: #009255;
  color: #fff;
}

.page_nav .c_active {
  background-color: #009255;
  color: #fff;
}

/* neirong */

.c_con {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 30px 0;
}

.c_left {
  width: calc(25% - 30px);
  padding-right: 30px;
}

.title_box {
  text-align: center;
  background-color: #009255;
  padding: 0 10px 10px;
}

.title_box span {
  font-weight: bold;
  font-size: 20px;
  text-shadow: none;
  text-align: center;
  padding: 0 10px;
  margin-top: 5px;
  line-height: 40px;
  display: inline-block;
  color: #fff;
  border-bottom: 1px dashed #fff;
  letter-spacing: 2px;
}

.title_box p {
  line-height: 2;
  color: #ffffff;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
}

.c_list a {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  display: block;
  padding: 10px 10px 10px 20px;
  font-size: 15px;
  font-weight: 300;
  position: relative;
  color: #ffffff;
  color: #666666;
  background: -webkit-linear-gradient(
    top,
    #ffffff 0%,
    #f5f5f5 72%,
    #edecec 100%
  );
  cursor: pointer;
}

.c_list a:hover {
  color: #009255;
}

.c_list .l_active {
  color: #009255 !important;
  cursor: pointer !important;
}

.c_right {
  width: 75%;
  /* border: 1px solid rebeccapurple */
}

.top_head {
  padding: 10px 0;
  border-bottom: 1px solid rgb(221, 221, 221);
}

.top_head img {
  width: 14px;
  height: 14px;
  padding-right: 5px;
}

.top_head a {
  color: rgb(153, 153, 153);
  font-size: 20px;
  height: 22px;
  line-height: 22px;
  font-weight: 300;
  color: #009255;
}

.decorate {
  padding: 0 5px;
}

.top_head li:last-child .decorate {
  display: none;
}

.top_head .text:hover {
  color: #009255;
}

.new_con {
  width: 100%;
  padding: 10px 0;
}

.new_con ul {
  width: 100%;
}

.atc_new_list {
  color: #242424;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  padding: 10px 0;
  cursor: pointer;
}

.atc_new_list:hover .title {
  color: #888;
}

.new_title .img {
  display: inline-block;
  width: 10px;
  height: 10px;
  padding-right: 5px;
}

.new_title .img img {
  width: 100%;
}

/* 分页 */

.el-pagination {
  text-align: center !important;
}
#myApps .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #009255 !important;
  color: #fff;
}

/* 影视视频中的样式开始部分 */
@font-face {
  font-family: "ckin";
  src: url(".././assets/fonts/ckin.eot?g02cfx");
  src: url(".././assets/fonts/ckin.eot?g02cfx#iefix")
      format("embedded-opentype"),
    url(".././assets/fonts/ckin.ttf?g02cfx") format("truetype"),
    url(".././assets/fonts/ckin.woff?g02cfx") format("woff"),
    url(".././assets/fonts/ckin.svg?g02cfx#ckin") format("svg");
  font-weight: normal;
  font-style: normal;
}

[class^="ckin-"],
[class*=" ckin-"] {
  font-family: "ckin" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.video_list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;
}

.index_vedio img {
  width: 100%;
  height: 100%;
}
.ckin__player {
  margin-bottom: 0;
}
.video_list h2 {
  font-size: 18px;
  color: gray;
  margin: 15px 0;
  text-align: center;
}
.default {
  border: 0 solid rgba(0, 0, 0, 0.2);
  position: relative;
  height: 213px;
  width: 380px;
  overflow: hidden;
  cursor: pointer;
}
.ckin__player:hover {
  box-shadow: 0px 5px 15px 5px rgba(128, 128, 128, 0.25);
}
.ckin__player {
  /* margin-bottom: 20px; */
  font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
  letter-spacing: 0.02em;
  transition: all 0.6s;
}

.ckin-play:before {
  content: "\ea1c";
  color: #fff;
}

.default:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.2s;
  opacity: 1;
  visibility: visible;
}

.ckin__overlay:before {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.65) 100%
  );
}
.default__button--big {
  background: none;
  border: 0;
  line-height: 1;
  color: #fff;
  text-align: center;
  outline: 0;
  padding: 0;
  cursor: pointer;
  position: absolute;
  opacity: 1;
  visibility: visible;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
  font-size: 64px;
  transition: all 0.2s;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}
.default__controls > * {
  -ms-flex: 1;
  flex: 1;
}
.video_list .video_box:hover .txt h2 {
  color: #009255;
  text-decoration: underline;
}
.c_b {
  /* border: 1px solid #f2f2f2; */
  /* width: calc(70% - 20px) !important; */
  /* box-shadow: none; */
}
.video_list .video_box {
  /* width: calc(50% - 30px);
    padding: 15px; */
  margin: 0 auto;
}
.act_con {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 37, 55, 0.05);
  padding: 0 10px;
  overflow: hidden;
}
/*文件下载列表样式开始部分*/

.soft_itdt li {
  width: calc(100% - 38px);
  width: 100%;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 30px 14px 30px 24px;
  transition: all 0.6s;
}

.soft_itdt {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  display: block;
}
.soft_itdt li {
  width: calc(50% - 30px);
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 20px 0px;
  align-items: flex-start;
}
.soft_itdt li:nth-of-type(odd) {
  margin-right: 30px;
}
.soft_itdt li::nth-of-type(even) {
  padding-left: 30px;
}
.soft_itdt .soft_ico {
  width: 36px;
  height: 36px;
  margin-right: 30px;
}
.soft_ico img {
  width: 100%;
}
.soft_itdt .soft_txt {
  width: calc(100% - 96px);
}
.soft_txt a {
  margin: 5px 0;
  font-size: 16px;
  color: #009255;
  font-weight: bold;
}
.soft_txt a:hover {
  color: #077145;
}
.soft_txt .remark {
  margin: 5px 0;
  font-weight: 300;
  font-size: 14px;
  line-height: 27px;
}
.download a {
  display: inline-block;
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #009255;
  border-radius: 3px;
  font-size: 14px;
  font-weight: normal;
  border: 1px solid #009255;
  transition: all 0.6s;
}

.download a:hover {
  background-color: #009255;
  color: #fff;
}
.soft_itdt {
  display: block;
}
.soft_itdt li {
  width: calc(100% - 38px);
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 30px 14px 30px 24px;
  transition: all 0.6s;
}
.soft_itdt li:hover {
  box-shadow: 0px 5px 15px 5px rgba(128, 128, 128, 0.25);
}

/*文件下载列表样式结束部分*/
/*人物列表页面*/
.advanced_person {
  width: 100%;
}
.advanced_person ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
.advanced_person li {
  width: 25%;
  padding: 20px 20px 20px 0;
}
.advanced_person li:nth-child(4n + 4) {
  padding-right: 0;
}
.advanced_person .list {
  width: 180px;
  overflow: hidden;
}
.advanced_person .list .pic {
  display: block;
  /* width: 100%;
  height: 100%; */
  width: 180px;
  height: 200px;
  overflow: hidden;
}
.advanced_person .list .pic img {
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.6s;
}
.advanced_person .list:hover .pic img {
  transform: scale(1.2);
}
.advanced_person .con {
  padding: 20px;
  text-align: left;
  transition: all 0.6s;
}
.advanced_person h4 a {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #242424;
  font-weight: 400;
  line-height: 1.2;
}
.advanced_person .b_line {
  width: 26px;
  border-bottom: 1px solid;
  border-color: #645f60;
  padding-top: 20px;
  margin-bottom: 20px;
}
.advanced_person .list:hover .con {
  background-color: #009255;
  color: #fff;
}
.advanced_person .list:hover h4 a {
  color: #fff;
}
.advanced_person .list:hover .b_line {
  border-color: #fff;
}
.advanced_person .p {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

/*  */
.advanced_person .con h4 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/*人物列表页面*/
/*右侧文章详情页面的样式*/
/*右侧主体内容样式*/
.c_b {
  /* border: 1px solid #f2f2f2; */
  width: calc(70% - 20px) !important;
  box-shadow: none;
}
.act_con {
  margin: 0 auto;
  padding: 0 10px;
}
.act_con .content {
  width: calc(100% - 40px);
  padding: 0 20px;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 20px;
}
.c_right .content {
  text-align: center;
  margin-bottom: 15px;
}
.c_right .content h2 {
  font-size: 20px;
  font-weight: 600;
  color: #009255;
  padding: 15px 0;
}
.c_right .time {
  color: #888;
  font-weight: 300;
  font-size: 14px;
}
.act_con .article {
  padding: 20px;
  width: calc(100% - 40px);
}
.c_right .article {
  font-size: 16px;
  color: #242424;
  margin-bottom: 40px;
}
.c_right .article .img {
  width: 550px;
  height: 370px;
  margin: 10px auto;
}
.c_right .article .img img {
  width: 100%;
  height: 100%;
}
.article p {
  margin-bottom: 15px;
}
.article p {
  line-height: 32px;
  font-weight: 300;
}
.length_conn {
  padding-top: 30px;
}
.length {
  border-top: 1px solid #f0f2f5;
  padding-bottom: 30px;
}
/*上一页下一页*/
.pagination {
  /* width: 100%; */
  display: flex;
}
.page_link {
  /* max-width: calc(100% - 30px); */
  border-radius: 2px;
  position: relative;
  float: left;
  color: #242424;
  font-size: 14px;
  font-weight: 300;
  background-color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 15px;
  width: 100%;
  cursor: pointer;
}
.page_link:hover {
  background-color: #f0f2f5;
  color: #009255;
}
.page_item {
  width: calc(50% - 20px);
  margin: 0 10px;
  color: #242424;
  display: inline-block;
  border: 1px solid #e4eaec;
}
/*视频详情页样式开始*/
.c_b {
  border: 1px solid #f2f2f2;
  width: calc(70% - 20px) !important;
  box-shadow: none;
}
.c_b,
.act_con {
  border: 0;
}
.video_con {
  background: #fff;
  color: #242424;
}
.act_con {
  width: 80%;
  margin: 0 auto;
  /* border: 1px solid #f2f2f2; */
  box-shadow: 0 1px 3px rgba(0, 37, 55, 0.05);
  border-top: 0;
  padding: 0 10px;
}
.video_con .video_con_title {
  width: 100%;
  padding: 7px 0;
  font-size: 22px;
  font-weight: bold;
  color: #242424;
  background-color: #fff;
}
.video_con .title {
  padding: 13px 0 17px;
}
.video_con_show_con video {
  width: 100%;
  outline: none;
}
.tab-box div:first-child {
  display: block;
}
.tab-box .video_con_show_con {
  width: 100%;
  display: none;
}
.person_time {
  font-size: 14px;
  line-height: 34px;
  color: gray;
}
/*视频详情页样式结束*/
/* 视频详情+文章 */
.top_head {
  padding: 10px 0;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.top_head a {
  color: rgb(153, 153, 153);
  font-size: 20px;
  height: 22px;
  line-height: 22px;
  font-weight: 300;
  color: #009255;
}

.ad_p {
  padding: 20px;
  width: calc(100% - 40px);
}
.ad_p h1 {
  font-size: 36px;
  color: #242424;
  font-weight: bold;
  margin-top: 30px;
}
.ad_p .video {
  width: 100%;
  margin-top: 36px;
}
.ad_p .img img {
  width: 100%;
}
.ad_p .case {
  width: calc(78% - 30px);
  padding: 0 0px 0 30px;
}
.ad_p .img {
  min-height: 150px;
  width: 280px;
}
.ad_p .case h3 {
  margin-top: 20px;
}
.ad_p .case p {
  font-size: 16px;
  color: #333;
  line-height: 27px;
  margin-top: 20px;
  text-indent: 32px;
}
.ad_p .img_in {
  margin-top: 36px;
  display: flex;
}
.ad_intrd h3,
.ad_intrd h4 {
  font-size: 18px;
  color: #242424;
  line-height: 42px;
  margin-top: 20px;
}
.ad_intrd p {
  font-size: 16px;
  color: #333;
  line-height: 36px;
  margin-top: 20px;
}
/*左侧的二级列表*/
.c_list a {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  display: block;
  padding: 10px 10px 10px 20px;
  font-size: 15px;
  font-weight: 300;
  position: relative;
  color: #ffffff;
  color: #666666;
  background: -webkit-linear-gradient(
    top,
    #ffffff 0%,
    #f5f5f5 72%,
    #edecec 100%
  );
  cursor: pointer;
}

.c_list a:hover {
  color: #009255;
}

.c_list .l_active {
  color: #009255;
  cursor: pointer;
}
/* 榜样风采中左侧三级栏目显示方式 */
.three_right img {
  /* padding-left: 20px; */
  vertical-align: middle;
  /* border: 1px solid rebeccapurple; */
}
</style>
