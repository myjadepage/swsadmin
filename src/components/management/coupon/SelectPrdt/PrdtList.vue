<template>
  <div class="selectPrdtList">
    <table id="selectPrdtList" class="table table-hover">
        <thead>
            <tr class="row" :style="{position:'absolute', width:'100%', backgroundColor:'#fff', zIndex:'10'}">
                <th class="text-center col col-1"><input :checked="checkAllFlag" @change="checkAll" ref="checkAll" type="checkbox"></th>
                <th class="text-center col col-1">No</th>
                <th class="text-center col col-1">상품코드</th>
                <th class="text-center col col-6">상품</th>
                <th class="text-center col col-2">가격</th>
                <th class="text-center col col-1">선택</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product,idx) in products" :key="product.prdtSysId" class="selPrdts row">
                <td class="text-center col col-1"><input v-model="product.isChecked" @change="checkPrdt" type="checkbox" class="prdtCheck"></td>
                <td class="text-center col col-1">{{(calcNo(idx))}}</td>
                <td class="text-center col col-1">{{product.prdtCode}}</td>
                <td class="col col-6"><img :src="product.smallImageUrl" alt="상품 썸네일" :style="{width:'50px', height:'50px'}" class="mr-2">{{product.name}}</td>
                <td class="text-center col col-2">{{product.price|makeComma}}원</td>
                <td class="text-center col col-1"><button @click="selectPrdt(product.prdtSysId, product.name)" class="btn btn-light">확인</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props:['products','currentPage','perPage','checkAllFlag'],
    methods:{
        calcNo(idx){
            let val = idx + 1
            
            val += (this.currentPage-1) * this.perPage
            return val
        },
        checkAll(e){
            if(e.target.checked){
                this.$el.getElementsByClassName('prdtCheck').forEach((c,idx)=>{
                    this.products[idx].isChecked = true
                    this.$emit('checkAll', true)
                })
            }else{
                this.$el.getElementsByClassName('prdtCheck').forEach((c,idx)=>{
                    this.products[idx].isChecked = false
                    this.$emit('checkAll', false)
                })
            }
        },
        checkPrdt(){
            let isCheckAll = true
                this.$el.getElementsByClassName('prdtCheck').forEach(c=>{
                    if(c.checked===false){
                        isCheckAll = false
                    }
                })
                
                this.$refs.checkAll.checked = isCheckAll
        },

        selectPrdt(id, name){
            this.$emit('select',{id:id,name:name})
        }
    }
}
</script>

<style>

</style>