<template>
  <div id="contents">
      <div class="section_head">
        <h4><font-awesome-icon icon="play-circle" /> 방송 상세 정보</h4>     
      </div>

      <table class="sjTable" width="100%">
            <tbody>
                <tr>
                    <th> 영상 제목</th>
                    <td>
                        <div class="img_area">
                            <img src="@/assets/img/201324739120470.jpg" />                            
                            <div class="button_area">
                                <span>대표이미지</span>                               
                            </div>
                        </div>
                        <section class="bTitle">
                            <div class="category">
                                <input class="title" name="strTitle" type="text" value="염색머리 관리 꿀팁!"  maxlength="60">
                            </div>
                        </section>
                    </td>
                </tr>

                <tr>
                    <th>영상 사이즈</th>
                    <td>
                        <label style="margin-right:10px"><input type="radio" name="sizeType" />가로형</label>
                        <label><input type="radio" name="sizeType" />세로형</label>
                    </td>
                </tr>
               
                <tr>
                    <th>영상 정보</th>
                    <td>
                        <div class="category">
                            <input type="text" name="strNoti" value="염색머리관리 꿀팁 알려드려요" maxlength="100"  readonly>
                        </div>                       
                        <div class="category">
                            <sws-category :selectedCategory="FilterFields.categoryList"></sws-category>
                        </div>
                        <div class="category">
                            <input type="text" value="뷰티, 헤어, 메이크업"  readonly/>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th> 판매할 상품 정보</th>
                    <td>
                         <ul class="productbox">
                            <li>
                                <div class="img_area">
                                    <img src="@/assets/img/201324739120470.jpg"/>                                                                 
                                </div>
                                <div class="text_area">                                   
                                    <strong>겨울 롱코트 스타일링겨울 롱코트 </strong>
                                </div>
                            </li>
                         </ul>
                    </td>
                </tr>

                <tr>
                    <th>상태</th>
                    <td>승인 대기중</td>
                </tr>
            </tbody>
       </table>
       <div class="btn_center">
           <b-button variant="secondary" size="lg" >승인하기</b-button>
           <b-button variant="outline-danger" size="lg" style="margin:0 5px" @click="$refs.cancleModal.show()">취소하기</b-button>
           <b-button variant="outline-secondary" size="lg">닫기</b-button>
       </div>


       <b-modal ref="cancleModal">
           <template v-slot:modal-title>
                <font-awesome-icon icon="info-circle" /> 방송 취소
            </template>
            <div style="padding:10px">
                <h4>해당 방송을 <strong class="text-danger" style="font-size:1.5rem">취소</strong> 하시겠습니까?</h4>
                <dl style="margin-top:20px; width:100%">
                    <dt>방송 취소사유 입력(필수)</dt>
                    <dd style="width:100%">
                        <textarea style="width:100%; height:100px"> 
                            청소년 유해 물건(술, 담배/전자담배/비타민스틱/성기구등)에 대한 내용
                        </textarea>
                    </dd>
                </dl>
            </div>
       </b-modal>
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'
import SwsCategory from '@/components/common/SwsCategory.vue'
export default {
    mixins: [commonJs],
    components: {
        SwsCategory
    },
    data () {
        return {   
            FilterFields:{
                categoryList:[]
            }
        }
    }

}
</script>

<style>
.sjTable {
    border-top: 1px solid #e0e5eb;
    border-bottom: 1px solid #e0e5eb;
    background-color: #fff;
}
.sjTable th {
    text-align: left;
    padding: 20px;
    border-bottom: 1px solid #e0e5eb;
    font-size: 16px;
    background-color: #f3f8fc;
    color: #84a9bf;
}
.sjTable td {
    text-align: left;
    padding: 20px;
    border-bottom: 1px solid #e0e5eb;
    font-size: 14px;
}
.sjTable .img_area{
    display: inline-block;
    position: relative;    
    width: 140px;
    height: 180px;
}
.sjTable .img_area img{ 
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.sjTable .button_area {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 10px;
    background-color: rgba(0,0,0,0.5);
}
.sjTable .button_area span{
    color: #fff;
    font-size: 12px;
}
.bTitle {
    display: inline-block;
    padding: 0 10px;
    vertical-align: top;
}
.category {
    margin: 5px 0;
}
.category input {
    border: 1px solid #e0e5eb;
    color: #7e8fa3;
    width: 682px;
    padding: 5px 10px;
    margin-bottom: 5px;
}
.category input.title {
    font-weight: bold;
    font-size: 17px;
    border: 0;
    border-bottom: 2px solid #e0e5eb;
    background-color: #fff;
    color: #202c37;
    width: 540px;
}
.category select {
    padding: 5px;
    width: 225px;
    height: 32px;
    border: 1px solid #e0e5eb;
    color: #7e8fa3;
}
.category select.first {
    width: 682px;
}
.productbox li{
    float: left;
    margin: 0 auto;
    width: 110px;
    padding: 5px;
    margin-right: 10px;
}
.productbox .img_area{
    position: relative;
    width: 100px;
    height: 130px;
}
.productbox .img_area img{ 
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.productbox .text_area strong{
    display: block;
    margin-top: 10px;
}
</style>