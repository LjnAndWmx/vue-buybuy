<template>
    <div>
        <div class="left">-</div>
        <div class="middle">{{count}}</div>
        <div class="right">+</div>
    </div>
</template>

<style scoped>
   .left,.middle,.right{
       display: inline-block;
       width: 30px;
       height: 30px;
       border: 1px solid rgba(92, 92, 92, .5);
       text-align: center;
       line-height: 30px;
   }
</style>

<script>
export default {
    // 父组件向子组件传值，子组件用props对象去接收
    props:{
        initCount:{
            type: Number,
            default: 100
        }
    },
    data(){
        return {
            count:1
        }
    },
    created(){
        console.log(props.initCount)
        this.count = this.initCount
    }
}
</script>

