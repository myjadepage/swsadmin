<template>
<div>
  <div class="section_head">
      <h4>상품 선택</h4>
      <div>
          <b-button variant="outline-secondary" style="margin-right:5px" @click="$refs.addPrdModal.show()">상품추가</b-button>
          <b-button variant="outline-danger">상품삭제</b-button>
       </div>
  </div>

  <div class="addBox">
      <ul>
          <li>
              <img src="@/assets/img/201324739120470.jpg" />
              <span><input type="checkbox" /></span>
          </li>
          <li>
              <img src="@/assets/img/201324739120470.jpg" />
              <span><input type="checkbox" /></span>
          </li>
      </ul>
  </div>

  <b-modal ref="addPrdModal" size="400">
        <template v-slot:modal-title>
            <font-awesome-icon icon="info-circle" /> 상품선택
        </template>
        <table class="mform addprd">
            <colgroup>
                <col width="5%">
                <col width="10%">
                <col width="*">
                <col width="5%">
                <col width="5%">
                <col width="3%">
                <col width="15%">
                <col width="2%">
            </colgroup>                    
            <thead>
                <tr>
                    <th>고유번호</th>
                    <th>업체명</th>
                    <th>상품</th>
                    <th>영상유무</th>
                    <th>영상타입</th>
                    <th>재고</th>
                    <th>카테고리</th>
                    <th><input type="checkbox"/></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1000</td>
                    <td>클리오</td>
                    <td>
                        <ul>
                            <li class="img">
                                <img src="@/assets/img/201324739120470.jpg" />
                            </li>
                            <li>
                                <h4>입점업체아이폰</h4>
                                <p>공급가 : 5000</p>
                                <p>판매가 : 5000</p>
                            </li>
                            <li class="vercenter">-라이프판매가 : 6000원</li>
                            <li class="vercenter">-배송무료</li>
                            <li class="vercenter">-쿠폰적용상품</li>
                        </ul>
                    </td>
                    <td>영상유무</td>
                    <td>영상타입</td>
                    <td>7</td>
                    <td>뷰티>안경</td>
                    <td><input type="checkbox"/></td>
                </tr>              
            </tbody>
        </table>
    </b-modal>
</div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [ commonJs ],
    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style>
.addBox ul{
    overflow: hidden;
}
.addBox li{
    position: relative;
    float: left;
    margin-right: 20px;
}
.addBox li span {
    position: absolute;    
    top: 0;
    left:0;
    width: 100%;
    padding: 5px;
    background-color:rgba(0,0,0,0.5);
}

div.modal .modal-dialog.modal-400 {
    max-width: 1500px!important;
}
.addprd td{
    text-align: center;
}
.addprd ul{overflow: hidden;}
.addprd li {float: left; margin-right: 30px; height: 50px;}
.addprd li h4{
    font-size: 14px;
    font-weight: bold;
}
.addprd li.img{
     margin-right: 10px;
}
.addprd li img{
    width: 50px;
    height: 50px;
}
.addprd .vercenter {display: flex;flex-direction: row;align-items: center;}

</style>