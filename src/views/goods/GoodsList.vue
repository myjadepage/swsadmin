<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>등록하신 상품들을 수정/관리 하실 수 있습니다.</li>
            <li>[상품영역]을 클릭하시면 영역별로 상품들을 보실 수 있습니다.</li>
            <li>서브메인 영역에 상품을 올릴시려면 상품관리에서 제일 마지막 카테고리분류(소분류)를 클릭하시면 됩니다.</li>
            <li>[상품진열]버튼을 클릭하시면 상품을 숨길수 있으며 [진열안함]버튼을 클릭하시면 상품을 전시하실수 있습니다.</li>
            <li>[상품영역]중 서브메인과 중간영역은 카테고리 지정시에만 가능합니다.</li>
        </ul>

        <form name="sFrm">
            <div class="box">
                <table class="t_form">
                    <colgroup>
                        <col width="170">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>상품분류</th>
                            <td>
                                <div class="fl mgr5">
                                    <select id="scate_1" name="scate_1">
                                        <option value="">선택</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select id="scate_2" name="scate_2">
                                        <option value="">선택</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select id="scate_3" name="scate_3">
                                    <option value="">선택</option>
                                </select>
                                </div>

                            </td>
                        </tr>
                        <!-- <tr>
                            <th>상품영역</th>
                            <td style="padding:0;">
                                <table class="t_form" style="border:none 0">
                                    <tbody>
                                        <tr>
                                            <th style="width: 100px; padding: 7px 15px">메인</th>
                                            <td style="border-top:0;">
                                                <ul class="arrange">
                                                    <li><label><input type="checkbox" name="caream" > md추천</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="caream" > best추천</label></li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="border:0;border-right:solid 1px #ddd; width: 100px; padding: 7px 15px">서브</th>
                                            <td style="border:0 ;">
                                                <ul class="arrange">
                                                    <li><label><input type="checkbox" name="careas" > 대분류 Best Seller</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="careas" > 대분류 New Item</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="careas" > 대분류 MD Choice</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="careas" > 중분류 Top Best</label></li>
                                                </ul>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr> -->
                        <tr>
                            <th>그룹별</th>
                            <td>
                                <select id="sbrand" name="sbrand">
                                <option value="">브랜드</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>상품등록일</th>
                            <td>
                                <b-row>
                                    <b-col cols="2">
                                        <b-form-datepicker id="startDate" placeholder="시작일자 선택" ></b-form-datepicker>
                                    </b-col>
                                    <b-col cols="2">
                                        <b-form-datepicker id="endDate" placeholder="종료일자 선택" ></b-form-datepicker>
                                    </b-col>
                                </b-row>
                            </td>
                        </tr>
                        <tr>
                            <th>상품판매자</th>
                            <td>
                                <select id="sdealer" name="sdealer" class="text_input" onchange="change();">
                                    <option value="">선택하세요</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>재고여부</th>
                            <td>
                                <label><input type="radio" name="sstock" checked> 전체상품</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 재고 무제한</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 재고있는 상품(무제한 제외)</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 재고가 실제 0인 상품</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 품절로 선택된 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>진열여부</th>
                            <td>
                                <label><input type="radio" name="sdisplay" checked>전체상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20">진열되어 있는 상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20">진열 안되어 있는 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>상품가격</th>
                            <td>
                                <input type="text" name="ssprice" class="text_input" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원 ~
                                <input type="text" name="seprice" class="text_input" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원
                            </td>
                        </tr>
                        <tr>
                            <th>직접검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;">
                                <option value="name">상품명</option>
                                <option value="code">상품코드</option>
                            </select>
                                <input type="text" name="sword" class="text_input">
                                <button class="btn btn-sm btn-secondary" type="submit">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <Goods-list-table></Goods-list-table>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import GoodsListTable from './GoodsList/GoodsListTable'
export default {
  data: () => ({
  }),
  mixins: [commonJs],
  components: {
      GoodsListTable
  },
  mounted () {  
  },
  methods: { 
  }
}
</script>
