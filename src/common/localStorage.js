const KEY = 'goods'
// 获取总数量
export const totalGoods = goods =>{
    // 获取本地存储的数据
    const localGoods = getLocalGoods()
    let total = 0
    // 遍历本地存储的数据
    for(const key in localGoods){
        total += localGoods[key]
    }
    // 返回数据
    return total
}

// 获取本地存储数据
export const getLocalGoods =()=>{
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}
// 添加本地存储数据
export const addLocalGoods = goods =>{
    // 获取本地原来的数据==对象
    const localGoods = getLocalGoods()
    // 判断本地是否有商品
    if(localGoods[goods.goodsId]){//存在就累加
        localGoods[goods.goodsId]+=goods.count
    }else{//不存在就添加
        localGoods[goods.goodsId] = goods.count
    }
    // 保存在本地存储
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return totalGoods()
}