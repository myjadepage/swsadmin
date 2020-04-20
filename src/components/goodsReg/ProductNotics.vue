<template>
  <div>
    <select name="productNotice" @change="productNoticesFn" v-model="productData.productNotice.prdtNoticeBaseSysId">
        <option v-for="(item, index) in selectNotics" :key="index" :value="item.value">{{ item.text }}</option>
    </select>
    <div class="fr">
        <b-button variant="secondary" size="sm" class="m-1" @click="addNotifyRow();">상품 추가</b-button>
    </div>

    <table id="notices" width="100%" summary="상품정보고시 목록 입니다.">
        <colgroup>
            <col width="20">
            <col width="100">
            <col width="*">
            <col width="20">
        </colgroup>
        <thead>
            <tr>
                <th>No</th>
                <th>항목</th>
                <th>내용</th>
                <th class="last"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in productData.productNotice.notices" :key="index">
              <template v-if="item.procTypeCode !== 4">
                  <td>-</td>
                  <td><input type="text" class="text_input" v-model="item.item" style="width: 90%;" maxlength="100" /></td>
                  <td><textarea rows="2" class="text_input" maxlength="200" v-model="item.content"></textarea></td>
                  <td class="last"><b-button variant="light" size="sm" style="height: 23px" @click="notifyRemove(item)">항목삭제</b-button></td>
              </template>
            </tr>
        </tbody>
    </table> 
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'
export default {
  data () {
    return {
      selectNotics: []
    }
  },
  props:['productData'],
  mixins: [commonJs],
  mounted () {
      this.axiosGetRequest('/api/v1/preferences/productNoticeBases', '', function (res) {
        let getData = res.data.jsonData.productNotices
        this.selectNotics.push({value:0, text:'등록할 상품고시를 선택하세요'})
        getData.forEach(item => {
            if (item.isUse){
                this.selectNotics.push({value: item.prdtNoticeBaseSysId, text: item.groupName})
            }  
        })
      }.bind(this))
  },
  methods: {
    notifyRemove: function (item) {
      if (this.isEmpty(item['prdtNoticeSysId'])) {
        this.productData.productNotice.notices.splice(item.index, 1)
      } else {
        item.procTypeCode = 4
      }
      this.$forceUpdate()
    },
    addNotifyRow: function () {
      this.productData.productNotice.notices.push({item: '', content: '', procTypeCode: 2})
    },
    // 정보고시
    productNoticesFn: function (event) {
      var obj = event.target
      if (obj.selectedIndex > 0) {
        this.axiosGetRequest('/api/v1/preferences/productNoticeDetails/' + this.productData.productNotice.prdtNoticeBaseSysId, '', function (res) {
          let row = this.productData.productNotice.notices[0]
          if (this.isEmpty(row['prdtNoticeSysId'])) {
            this.productData.productNotice.notices.splice(0)
          }
          const data = res.data.jsonData.productDetailNotices
          data.forEach(_item => {
            this.productData.productNotice.notices.push({
              item: _item.item, 
              content: (this.isEmpty(_item.content) ? '' : _item.content), 
              procTypeCode: 2
            })
          })
        }.bind(this))
      }
    },
  }
}
</script>

<style>

</style>