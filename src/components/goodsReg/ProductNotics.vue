<template>
  <div>
    <select name="productNotice" @change="productNoticesFn" v-model="productData.productNotice.prdtNoticeBaseSysId">
        <option v-for="(item, index) in selectNotics" :key="index" :value="item.value">{{ item.text }}</option>
    </select>
    <div class="fr">
        <b-button variant="secondary" size="sm" class="m-1" @click="addNotifyRow();">상품 추가</b-button>
        <!-- <b-button variant="danger" size="sm" class="m-1" onclick="delRowList('tb_notify');">상품 삭제</b-button> -->
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
            <tr v-for="(item, index) in notify" :key="index">
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
  props:['notify','productData'],
  mixins: [commonJs],
  mounted () {
      this.axiosGetRequest('/api/v1/preferences/productNoticeBases', '', this.initialNotics)
  },
  methods: {
    initialNotics: function (res) {
        let getData = res.data.jsonData.productNotices
        this.selectNotics.push({value:0, text:'등록할 상품고시를 선택하세요'})
        getData.forEach(item => {
            if (item.isUse){
                this.selectNotics.push({value: item.prdtNoticeBaseSysId, text: item.groupName})
            }  
        })
    },
    notifyRemove: function (item) {
      item.procTypeCode = 4
    },
    addNotifyRow: function () {
      this.notify.push({item: '', content: '', procTypeCode: 2})
    },
    // 정보고시
    productNoticesFn: function (event) {
      var obj = event.target
      if (obj.selectedIndex > 0) {
        this.axiosGetRequest('/api/v1/preferences/productNoticeDetails/' + obj[obj.selectedIndex].value, '', this.productNoticesLoadFn)
      }
    },
    productNoticesLoadFn: function (res) {
      var data = res.data.jsonData.productDetailNotices
      this.notify.forEach(_item =>{
        _item.procTypeCode = 4
      })
      data.forEach(_item => {
        this.notify.push({
          item: _item.item, 
          content: _item.content, 
          procTypeCode: 2
        })
      })
    }
  }
}
</script>

<style>

</style>