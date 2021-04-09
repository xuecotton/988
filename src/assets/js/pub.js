import $ from 'jquery'
const pub = {
  _url:pub_link,//本地服务；
  _DetailApi: {
    // // api_getHeader: 'api/getHeader', // 获取头部的logo和网页底部信息
    // api_getHeader: 'web/homapage/getHeader', // 获取头部的logo和网页底部信息   新

    // // api_getFooter: 'api/getFooter', // 获取网站底部信息
    // api_getFooter: 'web/homapage/getFooter', // 获取网站底部信息 新

    // api_get_navigation_bar_msg: 'api/get_navigation_bar_msg', // 查询导航栏以及相关信息

    // module_column_find_msg: 'module_columns/find_msg', // 查询栏目信息以及下级栏目
    // module_article_column_list: 'module_article_column/list', // 栏目与文章列表的关系 无分页
    // module_article_find_article_msg: 'module_article/find_article_msg', // 查询单篇文章信息 栏目id 与文章id
    // module_article_column_findById: 'module_article_column/findById', // 根据栏目id查栏目下所有文章基本信息
    // module_article_column_listById: 'module_article_column/listById', // 根据栏目id查栏目下所有文章基本信息   分页
    // module_job_list: 'module_job/list', // 列表植物 招聘页面   分页
    // module_job_find: 'module_job/find', // 查询职位信息
    // plug_uploadPic: 'plug/uploadPic', // 上传简历附件
    // module_recruit_save: 'module_recruit/save', // 招聘保存信息
    // module_zkyl_patient_save: 'module_zkyl_patient/save', // 患者招募 保存信息
    // module_message_save: 'module_message/save',
    // module_column_find_list_tree: 'module_columns/find_list_tree', // 8.	一级栏目及子栏目信息查询
    // module_document_list_file: 'module_document/list_file', // 文章附件
    // module_picture_list_file: 'module_picture/list_file', // 文章多媒体附件
    // module_article_column_list_page: 'module_article_column/list_page', // 文章栏目对照关系
    // api_article: 'module_article_column/findById', // 只用作查询文章的id，及column_id
    // api_articleinfo: 'module_article/find_article_msg', // 获取文章的详情及标题

    // web_find_same_navigations_list_tree: 'web/find_same_navigations_list_tree', // 树形查询上级导航元素信息及下级元素信息   新
    // module_internal_link_find: 'module_internal_link/find', // 查询内部链接的具体信息  新
    // web_column_articles_list_tree: 'web/column/articles_list_tree', // 栏目下文章列表
    // module_columns_find: 'module_columns/find', // 查询当前栏目 新
    // module_columns_column_list_tree_all: 'module_columns/column_list_tree_all', // 查询一个栏目及下级栏目信息
    // web_column_articles_list_tree_easy: 'web/column/articles_list_tree_easy', // 14.	当前栏目级下级文章简化版(树形结构) 新
    // // 订单信息
    // api_sendSms: 'api/sendSms', // 发送验证码   templateCode：SMS_153330634（固定）  telePhoneNum  手机号
    // api_isSendSms: 'api/isSendSms', // 验证验证码   "code": "914554",   "telePhoneNum": "18756152007"
    // order_findProductInfo: 'order/findProductInfo', // 订单表需要的商品信息   product_id(商品编号，及文章编号)
    // pay_payUsable: 'pay/payUsable', //  验证支付方式是否已经启用 user_id 用户编号（固定admin） pay_way :  alipay / wechat
    // order_creatOrder: 'order/createOrder', // 生成订单
    // pay_alipayTradePagePay: 'pay/alipayTradePagePay', // 支付宝网页
    // pay_weChatTradePagePay: 'pay/weChatTradePagePay', // 微信网页
    // order_findOrderInfo: 'order/findOrderInfo', // 查询订单详情

    // 988
    api_getHeader: 'web/homapage/getHeader', // 获取头部的logo和网页底部信息 
    api_getFooter: 'web/homapage/getFooter', // 获取网站底部信息
    web_homapage_getHomepage: 'web/homapage/getHomepage', // 获取完整首页信息 
    web_column_columns_articles_list_tree: 'web/column/columns_articles_list_tree', // 当前栏目及下级栏目信息,每级栏目均包含自己的下级文章信息  新
    web_column_columns_articles_list_tree_easy: 'web/column/columns_articles_list_tree_easy', // 当前栏目及下级栏目信息,每级栏目均包含自己的下级文章信息  简化版
    module_article_list: 'module_article/list', // 搜索页面需要的搜索文章列表
    module_columns_list: 'module_columns/list', // 搜索页面需要的搜索栏目列表
    module_column_find: 'module_columns/find', // 单独查询栏目信息
    module_article_find: 'module_article/find',// 查询文章详情  没有附件
    web_column_column_articles_list_page_easy: 'web/column/column_articles_list_page_easy', // 栏目下级文章简化版 分页
    module_columns_find: 'module_columns/find', // 查询当前栏目 新
    module_article_find_article_msg: 'module_article/find_article_msg', // 查询单篇文章信息 栏目id 与文章id
  },
  /**
      const that = this;
      var op_data = {
        that: that,
        _url: pub_link,
        ur: pub._DetailApi.-, // 具体接口
        cbk: that.cb_, // 回调
        data: {}, // 形参
      };
      console.log(op_data)
      pub._InitAjax(op_data)

      const that = this
      if (res.stateCode == "200" || res.code == "0") {

      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }

       that.$message({
          message: res.stateMsg,
          type: "success",
          duration: 2000
        });
        setTimeout(function() {
         window.history.go(0)
        }, 2500);

  */

  /**
   * op 形参
   * @param {*} that this指向
   * @param {*} _url 公共接口地址
   * @param {*} ur 具体接口地址
   * @param {*} data 形参
   * @param {*} cbk 回调
   */

  _InitAjax(op) {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: op._url + op.ur,
      // async:false,
      data: JSON.stringify(op.data),
      error: function (request) {
        console.log('ajax请求失败')
      },
      success: function (res) {
        op.cbk(res)
      },
      fail: function (r) {
        console.log('Ajax的fail函数，', r)
      }
    })
  },
  _InitAxios(op) {
    axios({
      url: op._url + op.ur,
      method: 'post',
      data: JSON.stringify(op.data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log("asiox",res);
        op.cbk(res.data)
      })
      .catch(cat => {
        console.log('axios请求的catch错误')
      })
  },

  /**
   *  截取页面链接中的参数
   *  window.location
   *  window的location对象
   *  search
   *  得到的是url中query部分
   *  substr()
   *  返回一个从指定位置开始的指定长度的子字符串
   *  这里设置为1，是为了把url中的?号去掉
   *  split()
   *  将一个字符串分割为子字符串，然后将结果作为字符串数组返回
   *  这里就是把query部分以&为分割符，分割
   */
  _LinkParm: function (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  },

  /**
   * @param {*} event 输入框的值
   * @param {*} tgt 输入框绑定的值
   */
  _CheckPhone(rule, value, callback) {
    if (!value) {
      return callback(new Error('手机号不能为空'))
    } else {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的手机号'))
      }
    }
  },
  /**
   * 数组转对象
   */
  _change_obj(arr) {
    var _obj = {}
    for (var it = 0; it < arr.length; it++) {
      for (var item in arr[it]) {
        _obj[item] = arr[it][item]
      }
    }
    return _obj
  },

  /**
   *
   * @param {*} old_r 原有数组
   * @param {*} new_r 新数组 需要连接到原有数组之上
   */
  _Arr_concat(old_r, new_r) {
    var arr = old_r
    var _r = new_r
    var _c = arr.concat(_r)
    old_r = _c
    console.log('连接之后的数组', _c)
    return old_r
  },
  /**
   * 判断元素是否为空数组
   * @param {*} arr 数组元素
   */
  _IsArray(arr) {
    Array.isArray(arr)
    if (Array.isArray(arr)) {
      return true
    } else {
      return false
    }
  }

  //
}

export { pub }

/**
 * 2019-08-06
 * 公共头部和页底完成，中间的四个导航为外部链接
 * 马红伟的二级页面部分完成
 */
/**
 * 内部链接的编号
 * bfc438071465453a88efc4cc5f3eb761    主题一
 * 0 首页
 * 1 站内搜索
 * 2 首长信箱
 * 3 为军服务满意度测评
 */

/**
 * 2019/07/31
 * 文章详情
 * 搜索页面以及搜索结果页面
 * 网站导航页面的数据
 * 第一个主题页面
 */

/**
 *静态页面
 */
