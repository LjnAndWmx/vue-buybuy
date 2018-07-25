<template>
    <div>
        <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="goodsList.length===0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                  <tr v-for="item in goodsList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch
                                            v-model="item.isSelected"
                                            active-color="#409eff"
                                            inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <inputnumber :initCount="item.buycount"></inputnumber>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalQuantity}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
    </div>
</template>

<style scoped>
.shopInfo{
    display: flex;
    align-items: center;
}
</style>

<script>
import inputnumber from '../subcomponent/inputnumber'
export default {
    components:{
       inputnumber
    },
    computed:{
        // 统计选中的商品个数
        totalQuantity(){
            // console.log(this.goodsList)
           let total = 0
           this.goodsList.forEach(item=>{
               if(item.isSelected==true){
                   total+=item.buycount
               }
           })
           return total
        },
        // 统计总价格
        totalAmount(){
        let price = 0
        this.goodsList.forEach(item=>{
            if(item.isSelected){
                price += item.buycount*item.sell_price
            }
        })
        return price
        }
    },
    data(){
        return {
           goodsList:[]
        }
    },
    created(){
        this.getGoodsInfo()
    },
    methods:{
        getGoodsInfo(){
            // 获取购物车的本地存储信息
            const localGoods = this.$store.getters.getLocalGoods
            // console.log(localGoods)//{90: 5, 91: 2, 92: 12}
            // 对象转数组并连接成字符串
            // console.log(Object.keys(localGoods).join(','))

            // 如果没有商品就直接返回
            if(Object.keys(localGoods).length===0) return

           const url =`/comment/getshopcargoods/${Object.keys(localGoods).join(',')}`
           this.$axios.get(url).then(res=>{
            //    console.log(res)
            //    从本地存储商品的数量存放在商品的每一项
            res.data.message.forEach(goods => {
                goods.buycount=localGoods[goods.id]
                goods.isSelected = true
            });
            // 最后存放在本地存储数据
            this.goodsList=res.data.message
            console.log(this.goodsList)
               
           }).catch(err=>{
               console.log(err)
           })
        }
    }
}
</script>
