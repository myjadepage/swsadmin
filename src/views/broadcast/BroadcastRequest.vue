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

        <form name="sFrm" onsubmit="return false">
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
                                <sws-category :selectedCategory="FilterFields.categoryList"></sws-category>
                            </td>
                        </tr>
                        <tr>
                            <th>상품판매자</th>
                            <td>
                                <Sws-seller :parentData="FilterFields"  @changeFn="changeBrand"></Sws-seller>
                            </td>
                        </tr>
                        <tr>
                            <th>상품등록일</th>
                            <td>
                                <sws-date :parentData="FilterFields"></sws-date>
                            </td>
                        </tr>
                        <tr>
                            <th>그룹별</th>
                            <td>
                                <sws-brand ref="brand" :parentData="FilterFields"></sws-brand>
                            </td>
                        </tr>
                        <tr>
                            <th>재고여부</th>
                            <td>
                                <label><input type="radio" name="sstock" value="all" v-model="FilterFields.valuable" checked> 전체상품</label>
                                <label><input type="radio" name="sstock" value="unlimit" class="mgl20" v-model="FilterFields.valuable"> 재고 무제한</label>
                                <label><input type="radio" name="sstock" value="limit" class="mgl20 " v-model="FilterFields.valuable"> 재고있는 상품(무제한 제외)</label>
                                <label><input type="radio" name="sstock" value="not_soldout" class="mgl20" v-model="FilterFields.valuable"> 재고가 실제 0인 상품</label>
                                <label><input type="radio" name="sstock" value="soldout" class="mgl20" v-model="FilterFields.valuable"> 품절로 선택된 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>진열여부</th>
                            <td>
                                <label><input type="radio" name="sdisplay" value=2 v-model.number="FilterFields.isDisplay">전체상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20" value=1 v-model.number="FilterFields.isDisplay">진열되어 있는 상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20" value=0 v-model.number="FilterFields.isDisplay">진열 안되어 있는 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>상품가격</th>
                            <td>
                                <input type="text" name="ssprice" class="text_input number_input" v-model.number="FilterFields.minPrice"> 원 ~
                                <input type="text" name="seprice" class="text_input number_input" v-model.number="FilterFields.maxPrice"> 원
                            </td>
                        </tr>
                        <tr>
                            <th>직접검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;" v-model="FilterFields.prdtCode">
                                    <option value="name">상품명</option>
                                    <option value="prdtCode">상품코드</option>
                                </select>
                                <input type="text" name="sword" class="text_input" v-model="FilterFields.FieldText" @keyup.enter="searchFilteringFn">
                                &emsp;
                                <b-button variant="secondary" size="sm" @click="searchFilteringFn">검색</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>