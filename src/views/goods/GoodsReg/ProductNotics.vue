<template>
  <div>
    <select name="productNotice" v-on:change="productNoticesFn">
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
            <tr v-for="(item, index) in notify" :key="item.id">
                <td>{{index + 1}}</td>
                <td><input type="text" class="text_input" :name="item.itemObjName" :value="item.item" style="width: 90%;" maxlength="100" /></td>
                <td><textarea :name="item.contentObjName" rows="2" class="text_input" maxlength="200" v-model="item.content"></textarea></td>
                <td class="last"><b-button variant="light" size="sm" style="height: 23px" @click="notifyRemove(index)">항목삭제</b-button></td>
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
      selectNotics: [],
      notifyCounter: 1
    }
  },
  props:['notify'],
  mixins: [commonJs],
  mounted () {

    //   var productNoticesFn = function (res) {
    //     //   productNotice
    //     var productNoticeObj = document.Frm.productNotice
    //     var productNoticeData = res.data.jsonData.productNotices
    //     for (var i = 0; i < productNoticeData.length; i++) {
    //         this.notify.push()
    //       $(productNoticeObj).append('<option value=' + productNoticeData[i].prdtNoticeBaseSysId + '>' + productNoticeData[i].groupName + '</option>')
    //     }
    //   }
      this.axiosGetRequest('http://api.shallwe.shop/api/v1/preferences/productNotices', '', this.initialNotics)
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
    notifyRemove: function (index) {
      this.notify.splice(index, 1)
    },
    addNotifyRow: function () {
      this.notifyCounter++
      this.notify.push({id: this.notifyCounter, itemObjName: 'item' + this.notifyCounter, contentObjName: 'content' + this.notifyCounter, item: '', content: ''})
    },
    // 정보고시
    productNoticesFn: function (event) {
      var obj = event.target
      if (obj.selectedIndex > 0) {
        this.axiosGetRequest('http://api.shallwe.shop/api/v1/preferences/productNoticeDetails/' + obj[obj.selectedIndex].value, '', this.productNoticesLoadFn)
      }
    },
    productNoticesLoadFn: function (res) {
      var data = res.data.jsonData.productDetailNotices
      this.notify.splice(0)
      for (var i = 0; i < data.length; i++) {
        this.notify.push({id: this.notifyCounter++, itemObjName: 'item' + this.notifyCounter++, contentObjName: 'content' + this.notifyCounter++, item: data[i].item, content: data[i].content})
      }
    }
  }
}
</script>

<style>

</style>