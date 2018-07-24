<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goods.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel height="341px" :interval="3000" arrow="always">
                                <el-carousel-item v-for="item in goods.sliderlist" :key="item.id">
                                   <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="item in goods.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>1</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in goodsgroup" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="subitem in item.level2catelist" href="/goods/43.html" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem1 in item.datas" :key="subitem1.artID">
                            <router-link :to="'/goodsinfo/'+subitem1.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="subitem1.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem1.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem1.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem1.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem1.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  .banner-img img{
      width: 100%;
      height: 100%;
  }
</style>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      goods: {},
      goodsgroup: []
    };
  },
  created() {
    this.getGoodsData()
    this.getGoodsList()
  },
  methods: {
    // 获取购物商城头部所需的数据
    getGoodsData() {
      const url = "goods/gettopdata/goods";

        this.$axios.get(url)
        .then(Response => {
        //   console.log(Response);
          this.goods = Response.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取商品列表
    getGoodsList(){
       const url = 'goods/getgoodsgroup'
       this.$axios.get(url).then(Response=>{
        //    console.log(Response)
           this.goodsgroup = Response.data.message
        //    console.log(this.goodsgroup)
       }).catch(err=>{
           console.log(err)
       })
    }
  }
};
</script>

