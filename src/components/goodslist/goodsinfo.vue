<template>
     <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/goods.html">购物商城</a>
                    <a href="/goods/42/1.html">商品详情</a>
                </div>
            </div>
            <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925" v-if="goods.goodsinfo">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
        <div class="magnifier-container">
            <div class="images-cover"></div>
            <!--当前图片显示容器-->
            <div class="move-view"></div>
            <!--跟随鼠标移动的盒子-->
        </div>
    <div class="magnifier-assembly">
        <div class="magnifier-btn">
            <span class="magnifier-btn-left">&lt;</span>
            <span class="magnifier-btn-right">&gt;</span>
        </div>
        <!--按钮组-->
        <div class="magnifier-line">
            <ul class="clearfix animation03">
                <li v-for="item in goods.imglist" :key="item.id">
                    <div class="small-img">
                        <img :src="item.thumb_path" />
                    </div>
                </li>
            </ul>
        </div>
        <!--缩略图-->
    </div>
    <div class="magnifier-view"></div>
    <!--经过放大的图片显示容器-->
             </div>
             </div>
                <div class="goods-spec">
                    <h1>{{goods.goodsinfo.title}}</h1>
                    <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                    <div class="spec-box">
                        <dl>
                            <dt>货号</dt>
                            <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                        </dl>
                        <dl>
                            <dt>市场价</dt>
                            <dd>
                                <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                            </dd>
                        </dl>
                        <dl>
                            <dt>销售价</dt>
                            <dd>
                                <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                            </dd>
                        </dl>
                    </div>
                    <div class="spec-box">
                        <dl>
                            <dt>购买数量</dt>
                            <dd>
                                <div class="stock-box">
                                    <el-input-number v-model="goodsCount" :min="1" :max="goods.goodsinfo.stock_quantity" size="small"></el-input-number>
                                </div>
                                <span class="stock-txt">
                                    库存
                                    <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                </span>
                            </dd>
                        </dl>
                        <dl>
                            <dd>
                                <div id="buyButton" class="btn-buy">
                                    <button class="buy">立即购买</button>
                                    <button ref="addToshopCartRef" @click="addToshopCart" class="add">加入购物车</button>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
                </div>
                <div id="goodsTabs" class="goods-tab bg-wrap">
                    <Affix>
                    <div id="tabHead">
                        <ul>
                            <li>
                                <a @click="isShowIntroduction=true" href="javascript:;" :class="{ selected: isShowIntroduction }">商品介绍</a>
                            </li>
                            <li>
                                <a @click="isShowIntroduction=false" href="javascript:;" :class="{ selected: !isShowIntroduction }">商品评论</a>
                            </li>
                        </ul>
                    </div>
                     </Affix>
                    <div v-show="isShowIntroduction" class="tab-content entry" style="display: block;">
                        <div v-html="goods.goodsinfo.content"></div>
                    </div>
                    <div v-show="!isShowIntroduction" class="tab-content" style="display: block;">
                        <div class="comment-box">
                            <div id="commentForm" name="commentForm"
                                class="form-box">
                                <div class="avatar-box">
                                    <i class="iconfont icon-user-full"></i>
                                </div>
                                <div class="conn-box">
                                    <div class="editor">
                                        <textarea ref="textAreaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                        <span class="Validform_checktip"></span>
                                    </div>
                                    <div class="subcon">
                                        <input id="btnSubmit" @click="postCommit" name="submit" type="submit" value="提交评论" class="submit">
                                        <span class="Validform_checktip"></span>
                                    </div>
                                </div>
                            </div>
                            <ul id="commentList" class="list-box">
                                <p v-if="commentText.length" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                <li v-for="item in commentText.message" :key="item.id">
                                    <div class="avatar-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </div>
                                    <div class="inner-box">
                                        <div class="info">
                                            <span>匿名用户</span>
                                            <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                        </div>
                                        <p>{{item.content}}</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageIndex"
                                    :page-sizes="[2, 5, 10, 20]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="commentText.totalcount">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="left-220">
                    <div class="bg-wrap nobg">
                        <div class="sidebar-box">
                            <h4>推荐商品</h4>
                            <ul class="side-img-list">
                                <li v-for="item in goods.hotgoodslist">
                                    <div class="img-box">
                                        <router-link :to="'/goodsinfo/'+item.id" class="">
                                            <img :src="item.img_url">
                                        </router-link>
                                    </div>
                                    <div class="txt-box">
                                        <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                        <span>{{item.add_time | dateFmt}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
     <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <div class="animateDiv" v-show="isShow" v-if="goods.imglist" ref="animateRef">
            <img :src="goods.imglist[0].thumb_path" alt="">
        </div>
     </transition>
    </div>
</template>

<style scoped>

@import "../../statics/site/js/jqimgzoom/css/magnifier.css";
.animateDiv{
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
}
.animateDiv img{
    width: 100%;
    height: 100%;
}
</style>

<script>
import "../../statics/site/js/jqimgzoom/js/magnifier";

// 按需引入
import { Affix } from "iview";
// 导出的是vue对象
export default {
  data() {
    return {
      goods: {},
      goodsCount: 1,
      isShowIntroduction: true, //商品评论是否显示
      pageIndex: 1, //默认显示第一页
      pageSize: 5, //页容量
      commentText: {}, //获取评论详细信息
      isShow:false,//动画效果显示或隐藏
      addToshopCartoffset:null,//加入购物车的偏移量
      shoppingCartCountoffset:null//购物车的偏移量
    };
  },
  components: {
    Affix
  },
  //   监控的作用：用来监控url地址的变化 route:通道  路线
  watch: {
    $route: function(newValue) {
      this.getgoodsInfo()
      this.getCommentListData()
    }
  },
  created() {
    //   发送ajax请求
    //   执行区域
    this.getgoodsInfo();
    this.getCommentListData();
  },
//   当我们模型数据发生了改变，并且视图渲染完毕
  updated() {
    $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
    // console.log($('#shoppingCartCount').offset())
    // console.log($(this.$refs.addToshopCartRef).offset())
  },
  methods: {
    //   获取商品详情
    getgoodsInfo() {
      console.log(this.$route.params.goodsId);
      const url = `/goods/getgoodsinfo/${this.$route.params.goodsId}`;
      this.$axios
        .get(url)
        .then(Response => {
          //   console.log(Response);
          this.goods = Response.data.message;
        //   console.log(this)

        //   购物车商品添加动态效果
        setTimeout(()=>{

        this.addToshopCartoffset = $(this.$refs.addToshopCartRef).offset()
        $(this.$refs.animateRef).css({
            top:this.addToshopCartoffset.top,
            left:this.addToshopCartoffset.left
        })
        this.shoppingCartCountoffset = $('#shoppingCartCount').offset()

        },5000)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取评论条数
    getCommentListData() {
      const url = `/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
      this.$axios.get(url).then(res => {
        // console.log(res.data);
        this.commentText = res.data;
      });
    },
    // 获取页码
    handleSizeChange(data){
        // console.log(data)
        this.pageSize=data
        this.pageIndex=1
        this.getCommentListData()
    },
    handleCurrentChange(data){
        // console.log(data)
        this.pageIndex=data
        this.getCommentListData()
    },
    postCommit(){
        // console.log(this.$refs.textAreaRef.value)
        const content = this.$refs.textAreaRef.value
        if(content.trim().length===0){
          this.$message({
          showClose: true,
          message: '请输入提交内容',
          type: 'warning'
        });
            return
        }
        // post请求
        const url = `validate/comment/post/goods/${this.$route.params.goodsId}`
        this.$axios.post(url,{commenttxt:content}).then(res=>{
             this.$message({
          showClose: true,
          message: '提交评论成功！！',
          type: 'success'
        });
            // console.log(res)
            this.$refs.textAreaRef.value=''
            this.pageIndex = 1
            this.getCommentListData()
        }).catch(err=>{
            console.log(err)
        })
       
    },
    // 点击动画购物车
    addToshopCart(){
        this.isShow=true

        // 提交数据到全局仓库  载荷即参数
        const goods = {
            goodsId:this.$route.params.goodsId,
            count:this.goodsCount
        }
        this.$store.commit('addGoods',goods)
    },
     beforeEnter: function (el) {
        el.style.top = this.addToshopCartoffset.top+'px'
        el.style.left = this.addToshopCartoffset.left +'px'
        el.style.transform = "scale(1)"
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
        // 设置刷新动画帧
        el.offsetWidth
     
        el.style.top = this.shoppingCartCountoffset.top+'px'
        el.style.left = this.shoppingCartCountoffset.left+'px'
        el.style.transform = "scale(0.5)"

        done()
    },
    afterEnter: function (el) {
        this.isShow=false
    }
  }
};
</script>

