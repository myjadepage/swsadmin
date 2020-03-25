<template>
  <b-row>
      <b-col cols=2 class="mx-0">
          <select class="text_input" ref="module_select_1" v-model="selectedCategory[0]" @change="findCategory(selectedCategory[0], 2)">
              <option v-for="(item, index) in category1" :key="index" :value="item">{{item.text}}</option>
          </select>
      </b-col>
      <b-col cols=2 class="mx-0">
          <select class="text_input" ref="module_select_2" v-model="selectedCategory[1]" @change="findCategory(selectedCategory[1], 3)">
              <option v-for="(item, index) in category2" :key="index" :value="item">{{item.text}}</option>
          </select>
      </b-col>
      <b-col cols=2 class="mx-0">
          <select class="text_input" ref="module_select_3" v-model="selectedCategory[2]" @change="findCategory(selectedCategory[2], 4)">
              <option v-for="(item, index) in category3" :key="index" :value="item">{{item.text}}</option>
          </select>
      </b-col>
      <b-col cols=2 class="mx-0">
          <select class="text_input" ref="module_select_4" v-model="selectedCategory[3]" @change="findCategory(selectedCategory[3], 5)">
              <option v-for="(item, index) in category4" :key="index" :value="item">{{item.text}}</option>
          </select>
      </b-col>
      <b-col cols=2 class="mx-0">
          <select class="text_input" ref="module_select_5" v-model="selectedCategory[4]">
              <option v-for="(item, index) in category5" :key="index" :value="item">{{item.text}}</option>
          </select>
      </b-col>
  </b-row>
</template>

<script>
import commmonJs from '@/assets/js/common.js'
export default {
    data () {
        return {
            initialCategory: [
                {value: 0, text: '::1차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::2차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::3차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::4차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::5차 카테고리::', feeRate: 0, parentSysId: ''}
            ],
            selectedCategory: [
                {value: 0, text: '::1차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::2차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::3차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::4차 카테고리::', feeRate: 0, parentSysId: ''},
                {value: 0, text: '::5차 카테고리::', feeRate: 0, parentSysId: ''}
            ],
            category1: [
                {value: 0, text: '::1차 카테고리::', feeRate: 0, parentSysId: ''}
            ],
            category2: [
                {value: 0, text: '::2차 카테고리::', feeRate: 0, parentSysId: ''}
            ],
            category3: [
                {value: 0, text: '::3차 카테고리::', feeRate: 0, parentSysId: ''}
            ],
            category4: [
                {value: 0, text: '::4차 카테고리::', feeRate: 0, parentSysId: ''}
            ],
            category5: [
                {value: 0, text: '::5차 카테고리::', feeRate: 0, parentSysId: ''}
            ]
        }
    },
    mixins: [commmonJs],
    mounted() {
        this.axiosGetRequest('/api/v1/categories', {categoryLevel: 1}, this.loadCategoryList)
    },
    methods: {
        loadCategoryList: function (res) {
            const reqParams = res.config.params
            let categories = res.data.jsonData.categories
            if (!categories) {
                this.initCategoryDept(reqParams.categoryLevel)
                console.log('데이터 없슴')
                return false
            }
            let targetRef = this['category'+reqParams.categoryLevel]
            targetRef.splice(0)
            targetRef[0] = this.initialCategory[reqParams.categoryLevel-1]
            this.selectedCategory[reqParams.categoryLevel-1] = this.initialCategory[reqParams.categoryLevel-1]
            for(const _item of categories) {
                targetRef.push({
                    value: _item.categorySysId,
                    text: _item.name,
                    feeRate: _item.feeRate,
                    parentSysId: _item.parentSysId
                })
            }
        },
        findCategory: function (item, nextCategoryLevel) {
            this.axiosGetRequest('/api/v1/categories',{parentSysId: item.value, categoryLevel: nextCategoryLevel}, this.loadCategoryList, this.exceptionCategory)
        },
        exceptionCategory: function (err) {
            console.log(err)
        },
        initCategoryDept: function (level){
            for (let i = level; i < 6 ; i++) {
                let row = this['category'+i]
                row.splice(0)
                row[0] = this.initialCategory[i-1]
                this.selectedCategory[i-1] = this.initialCategory[i-1]
            }
        }
    }

}
</script>

<style>

</style>