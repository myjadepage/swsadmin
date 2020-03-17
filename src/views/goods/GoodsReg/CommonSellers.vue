<template>
    <div>
        <div class="tr mgt5">
            <b-button variant="info" size="sm" @click="discountFn"><font-awesome-icon icon="plus-circle" /> 할인인원 추가</b-button>
        </div>
        <ul>
            <li v-for="(item, index) in commonSellers" :key="item.id" class="mb-2">
                <span style="width: 20px">{{index+1}}.</span>
                <input type="text" class="text_input number_input" :id="item.peopleObjName" v-on:keyup="$emit('keyup',$event)" style="width: 50px" />명 
                <input type="text" class="text_input number_input" :id="item.discountObjName" style="width: 150px" v-on:keyup="$emit('keyup',$event)"/>할인
                <b-button variant="light" class="mx-3" size="sm" @click="commonSellers.splice(index, 1)">범위 삭제</b-button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data : () =>({
        commonSellerCounter: 2,
    }),
    props: ['commonSellers'],
    methods: {
        discountFn: function (){
            if (this.commonSellers.length >=10) {
                alert('더이상 할인범위를 추가할수 없습니다.')
                return false
            }
            var cnt = this.commonSellerCounter++
            this.commonSellers.push({id: cnt, peopleObjName: 'peopleObjName' + cnt, discountObjName: 'discountObjName' + cnt})
        },
    }
}
</script>