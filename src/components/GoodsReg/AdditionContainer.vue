<template>
    <div class="addition_container" style="width:100%">
        <ul class="over_h mgb10">
            <li class="fr">
                <b-button @click="addAdditionOptionRow()">추가구성 추가</b-button>
            </li>
        </ul>
        <div class="addition_unit" v-for="(item, mainIndex) in additionOptions" :key="item.id">
            <dl class="addition_unit addition_dl">
                <dt>추가구성명</dt>
                <dd>
                    <input type="text" :name="item.itemGroupName" class="text_input" maxlength="50"/>
                </dd>
            </dl>
            <table class="addition_unit addition_table" :name="item.detailsTable">
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
                            <b-button size="sm" style="height: 19px;font-size: 10px;" variant="danger" @click="removeAdditionOptionRow(mainIndex)">삭제</b-button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(subItem, index) in item.subAdditionOptions" :key="subItem.id">
                        <td><input type="text" class="text_input" :name="subItem.item"/></td>
                        <td><input type="text" class="text_input number_input" :name="subItem.price" v-on:keyup="$emit('keyup', $event)"/></td>
                        <td><input type="text" class="text_input number_input" :name="subItem.stockQty" v-on:keyup="$emit('keyup', $event)"/></td>
                        <td style="vertical-align:middle">
                            <input type="checkbox" :name="subItem.isSoldout"/>
                        </td>
                        <td><input type="checkbox" :name="subItem.isHide"/></td>
                        <td><b-button variant="danger" size="sm" style="height: 19px;font-size: 10px; margin-left: 37px" @click="removeSubAdditionOptionRow(mainIndex, index)">삭제</b-button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {

  data () {
    return {
      additionOptionsCounter: 1,
      subAdditionOptionsCounter: 1,
    }
  },
  props: ['additionOptions','productData'],
  methods: {
    addAdditionOptionRow: function () {
      this.additionOptionsCounter++
      var Ix = this.additionOptionsCounter
      this.additionOptions.push({id: Ix, itemGroupName: 'itemGroupName' + Ix, detailsTable: 'detailsTable' + Ix, subAdditionOptions: [{id: 1, item: 'item1', price: 'price1', stockQty: 'stockQty1', isSoldout: 'isSoldout1', isHide: 'isHide1'}]})
    },
    removeAdditionOptionRow: function (index) {
      this.additionOptions.splice(index, 1)
    },
    addSubAdditionOptionRow: function (object, mainIndex) {
      this.subAdditionOptionsCounter++
      var subInx = this.subAdditionOptionsCounter
      this.additionOptions[mainIndex].subAdditionOptions.push({id: subInx, item: 'item' + subInx, price: 'price' + subInx, stockQty: 'stockQty' + subInx, isSoldout: 'isSoldout' + subInx, isHide: 'isHide' + subInx})
    },
    removeSubAdditionOptionRow: function (mainInx, inx) {
      this.additionOptions[mainInx].subAdditionOptions.splice(inx, 1)
    }
  }
}
</script>