<template>
  <div class="selectPrdtList">
    <table id="selectPrdtList" class="table">
        <thead>
            <tr>
                <th class="text-center"><input @change="checkAll" ref="checkAll" type="checkbox"></th>
                <th class="text-center">No</th>
                <th class="text-center">상품코드</th>
                <th class="text-center">상품</th>
                <th class="text-center">가격</th>
                <th class="text-center">선택</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product,idx) in products" :key="product.prdtSysId" class="selPrdts">
                <td class="text-center"><input v-model="product.isChecked" @change="checkPrdt" type="checkbox" class="prdtCheck"></td>
                <td class="text-center">{{(calcNo(idx))}}</td>
                <td>{{product.prdtCode}}</td>
                <td><img :src="product.smallImageUrl" alt="" :style="{width:'50px', height:'50px'}">{{product.name}}</td>
                <td class="text-center">{{product.price|makeComma}}원</td>
                <td class="text-center"><button @click="selectPrdt(product.prdtSysId)" class="btn btn-light">확인</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props:['products','currentPage','perPage'],
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
                })
            }else{
                this.$el.getElementsByClassName('prdtCheck').forEach((c,idx)=>{
                    this.products[idx].isChecked = false
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

        selectPrdt(id){
            if(sessionStorage.getItem('selectedPrdt')){
                let list = JSON.parse(sessionStorage.getItem('selectedPrdt'))
                if(!list.includes(id)){
                    list.push(id)
                }
                sessionStorage.setItem('selectedPrdt', JSON.stringify(list))
            }else{
             sessionStorage.setItem('selectedPrdt',JSON.stringify([id]))
            }

            let event = new CustomEvent("addItem", {
            detail: {
            selectedPrdt: JSON.parse(sessionStorage.getItem('selectedPrdt'))
            }
        });
        window.dispatchEvent(event);


        }
    }
}
</script>

<style>

</style>