<template>
    <div>
        <select :disabled="disabled" ref="module_select_1" v-model="selectedCategory[0]" @change="findCategory(selectedCategory[0], 2)">
            <option v-for="(item, index) in category1" :key="index" :value="item" v-html="isPercentFn(item)"></option>
        </select>
        <select :disabled="disabled" ref="module_select_2" v-model="selectedCategory[1]" @change="findCategory(selectedCategory[1], 3)">
            <option v-for="(item, index) in category2" :key="index" :value="item" v-html="isPercentFn(item)"></option>
        </select>
        <select :disabled="disabled" ref="module_select_3" v-model="selectedCategory[2]" @change="findCategory(selectedCategory[2], 4)">
            <option v-for="(item, index) in category3" :key="index" :value="item" v-html="isPercentFn(item)"></option>
        </select>
        <select :disabled="disabled" ref="module_select_4" v-model="selectedCategory[3]" @change="findCategory(selectedCategory[3], 5)">
            <option v-for="(item, index) in category4" :key="index" :value="item" v-html="isPercentFn(item)"></option>
        </select>
        <select :disabled="disabled" ref="module_select_5" v-model="selectedCategory[4]">
            <option v-for="(item, index) in category5" :key="index" :value="item" v-html="isPercentFn(item)"></option>
        </select>
      </div>
</template>

<script>
import commmonJs from '@/assets/js/common.js'
export default {
    data () {
        return {
            initialCategory: [
                {value: 0, text: '::1차 카테고리::', level: 1, feeRate: 0, parentSysId: 0},
                {value: 0, text: '::2차 카테고리::', level: 2, feeRate: 0, parentSysId: 0},
                {value: 0, text: '::3차 카테고리::', level: 3, feeRate: 0, parentSysId: 0},
                {value: 0, text: '::4차 카테고리::', level: 4, feeRate: 0, parentSysId: 0},
                {value: 0, text: '::5차 카테고리::', level: 5, feeRate: 0, parentSysId: 0}
            ],
            category1: [{value: 0, text: '::1차 카테고리::', level: 1, feeRate: 0, parentSysId: 0}],
            category2: [{value: 0, text: '::2차 카테고리::', level: 2, feeRate: 0, parentSysId: 0}],
            category3: [{value: 0, text: '::3차 카테고리::', level: 3, feeRate: 0, parentSysId: 0}],
            category4: [{value: 0, text: '::4차 카테고리::', level: 4, feeRate: 0, parentSysId: 0}],
            category5: [{value: 0, text: '::5차 카테고리::', level: 5, feeRate: 0, parentSysId: 0}]
        }
    }, 
    props: ['selectedCategory','isPercent', "disabled"],
    mixins: [commmonJs],
    mounted() {
        this.axiosGetRequest('/api/v1/categories', {categoryLevel: 1}, this.loadCategoryList)
        this.initSelectCategory()
    },
    methods: {
        initSelectCategory: function () {
            for (let i = 0 ; i < 5; i++){
                this.selectedCategory.push(this.initialCategory[i])
            }
        }, 
        loadCategoryList: function (res) {
            const reqParams = res.config.params
            let categories = res.data.jsonData.categories
            if (!categories) {
                console.log('데이터 없슴')
                return false
            }
            this.initCategoryDept(reqParams.categoryLevel)
            let targetRef = this['category'+reqParams.categoryLevel]
            targetRef.splice(0)
            targetRef[0] = this.initialCategory[reqParams.categoryLevel-1]
            this.selectedCategory[reqParams.categoryLevel-1] = this.initialCategory[reqParams.categoryLevel-1]
            for(const _item of categories) {
                targetRef.push({
                    value: _item.categorySysId,
                    level: reqParams.categoryLevel,
                    text: _item.name,
                    feeRate: _item.feeRate,
                    parentSysId: (this.isEmpty(_item.parentSysId) ? 0 : _item.parentSysId)
                })
            }
        },
        findCategory: function (item, nextCategoryLevel) {
            if (!this.isEmpty(item.value) && item.value !== 0){
                this.axiosGetRequest('/api/v1/categories',{parentSysId: item.value, categoryLevel: nextCategoryLevel}, this.loadCategoryList, this.exceptionCategory)
            } else {
                this.initCategoryDept(2)
            }
        },
        exceptionCategory: function (err) {
            console.log(err)
        },
        initCategoryDept: function (level){
            for (let i = level; i < 6 ; i++) {
                let row = this[`category${i}`]
                row.splice(0)
                row.push(this.initialCategory[i-1])
                this.selectedCategory[i-1] = this.initialCategory[i-1]
            }
            this.$forceUpdate()
        },
        isPercentFn: function (item){
            const isPercent = this.isPercent || false
            let isPercentViewText = ''
            if (isPercent){
                if (item.value > 0) {
                    isPercentViewText = item.text + '['+(item.feeRate / 100)+'%]'
                } else {
                    isPercentViewText = item.text
                }
            } else {
                isPercentViewText = item.text
            }
            return isPercentViewText
            // return (isPercent ? txt+'['+fee+'%]' : txt)
        }
    }

}
</script>

<style>

</style>