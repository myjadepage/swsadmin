<template>
  <div class="addition_container" style="width:100%">
    <ul class="over_h mgb10">
      <li class="fr">
        <b-button @click="addAdditionOptionRow()">추가구성 추가</b-button>
      </li>
    </ul>
    <div class="addition_unit" v-for="(item, mainIndex) in productData.addingProducts" :key="mainIndex">
      <template v-if="item.procTypeCode !== 4">
        <dl class="addition_unit addition_dl">
          <dt>추가구성명</dt>
          <dd>
            <input type="text" v-model="item.base.itemGroup" class="text_input" maxlength="50" />
          </dd>
        </dl>
        <table class="addition_unit addition_table">
          <col width="*" />
          <col width="10%" />
          <col width="10%" />
          <col width="9%" />
          <col width="9%" />
          <col width="10%" />
          <thead>
            <tr>
              <th>추가구성항목</th>
              <th>추가금액</th>
              <th>재고수량</th>
              <th>품절여부</th>
              <th>숨김여부</th>
              <th>
                <b-button size="sm" style="height: 19px;font-size: 10px;" @click="addSubAdditionOptionRow(item, mainIndex)">추가</b-button>&emsp;
                <b-button size="sm" style="height: 19px;font-size: 10px;" variant="danger" @click="removeAdditionOptionRow(item, mainIndex)" >삭제</b-button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subItem, index) in item.details" :key="index">
              <template v-if="subItem.procTypeCode !== 4">
                <td><input type="text" class="text_input" v-model="subItem.item" /></td>
                <td><input type="text" class="text_input number_input" v-model.number="subItem.price" /></td>
                <td><input type="text" class="text_input number_input" v-model.number="subItem.stockQty" /></td>
                <td style="vertical-align:middle"><input type="checkbox" v-model="subItem.isSoldout" /></td>
                <td><input type="checkbox" v-model="subItem.isHide" /></td>
                <td><b-button variant="danger" size="sm" style="height: 19px;font-size: 10px; margin-left: 37px" @click="removeSubAdditionOptionRow(subItem, mainIndex, index)">삭제</b-button></td>
              </template>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
export default {
  data() {
    return {};
  },
  props: ["productData"],
  mixins: [commonJs],
  methods: {
    addAdditionOptionRow: function() {
      this.productData.addingProducts.push({
          base: {
            itemGroup: '',
            procTypeCode: 2
          },
          details: [
            {
              item: "",
              price: 0,
              stockQty: 0,
              isSoldout: false,
              isHide: false,
              procTypeCode: 2
            }
          ],
          procTypeCode: 2
      });
    },
    removeAdditionOptionRow: function(_item, mainIndex) {
      if (this.isEmpty(_item.base['prdtAddingProductSysId'])){
        this.productData.addingProducts.splice(mainIndex, 1)
      } else {
        _item.procTypeCode = 4
        _item.base.procTypeCode = 4
        _item.details.forEach(sub => {
          sub.procTypeCode = 4
        })
      }
      this.forceUpdate()
    },
    addSubAdditionOptionRow: function(object, mainIndex) {
      this.productData.addingProducts[mainIndex].details.push({
        item: "",
        price: 0,
        stockQty: 0,
        isSoldout: false,
        isHide: false,
        procTypeCode: 2
      });
    },
    removeSubAdditionOptionRow: function(subItem, mainInx, subInx) {
      if (this.isEmpty(subItem['prdtAddingProductDetailSysId'])){
        this.productData.addingProducts[mainInx].details.splice(subInx, 1)
      } else {
        this.productData.addingProducts[mainInx].details[subInx].procTypeCode = 4
      }
      this.forceUpdate()
    },
    forceUpdate: function () {
      this.$forceUpdate()
    }
  }
};
</script>