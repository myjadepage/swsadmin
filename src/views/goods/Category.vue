<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>카테고리관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>카테고리를 설정합니다.</li>
            <li>이미지파일은 GIF, JPG로 올려주시기 바랍니다.</li>
        </ul>

        <table id="frameBox">
            <colgroup>
                <col width="250">
                <col width="10">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th class="frame_cate">
                        <div class="border">
                            <div class="menu">
                                <ul>
                                    <li><b-button variant="success" id="btn-expand-all">전체</b-button></li>
                                    <li><b-button variant="danger" id="btn-collapse-all">닫기</b-button></li>
                                </ul>
                            </div>
                            <div id="tree"></div>
                        </div>
                    </th>
                    <td></td>
                    <td>

                        <form name="Frm" method="post">
                            <div id="wrap_body">
                                <!-- 카테고리 정보 : 시작 -->
                                <div class="box" style="padding-top:0">
                                    <div class="section_head" style="margin-top: 0;">
                                        <h4><i class="xi-check-circle"></i> 카테고리 추가</h4>
                                    </div>

                                    <table class="t_form">
                                        <caption>카테고리 내용 입력폼</caption>
                                        <tbody>
                                            <tr>
                                                <th>현재 카테고리</th>
                                                <td class="category">
                                                    <u id="target_category"> 추가</u>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>카테고리명</th>
                                                <td>
                                                    <input type="text" name="name" value="" class="text_input" style="width:98%" maxlength="100">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>수수료율</th>
                                                <td>
                                                    <input type="text" name="cms" class="text_input" style="width:50px" value="" maxlength="5" onkeyup="onlyFloat(this)" onblur="onlyFloat(this)"> %
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>숨김 여부</th>
                                                <td>
                                                    <span><input type="radio" name="hidden" value="0" checked>노출</span>
                                                    <span class="mgl20"><input type="radio" name="hidden" value="1">숨김</span>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <!-- 카테고리 정보 : 끝 //-->

                                <!-- 상단 꾸미기 : 시작 -->
                                <div class="box">
                                    <div class="section_head">
                                        <h4><i class="xi-check-circle"></i> 카테고리 상단 디자인</h4>
                                    </div>
                                    <vue-editor id="vueEditor" v-model="categorCommentHtml"></vue-editor>

                                    <table class="t_form">
                                        <tbody>
                                            <tr>
                                                <th>하위 적용</th>
                                                <td>
                                                    <input type="checkbox" name="isInheritTopDecor" value="T"> 하위 카테고리에도 동일 하게 적용.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- 상단 꾸미기 : 끝 //-->

                                <!-- 카테고리 슬라이드 배너 : 시작 -->
                                <div class="box">
                                    <div class="sortable_title">
                                        <h4><i class="xi-check-circle"></i> 카테고리 슬라이드 배너</h4>
                                        <p>
                                            <span><input type="checkbox" name="cbListAll" onclick="cbBannerAll(this)">전체선택</span>
                                            <button type="button" class="btn btn-sm btn-info mgl20">배너추가</button>
                                            <button type="button" class="btn btn-sm btn-danger">배너삭제</button>
                                            <button type="button" class="btn btn-sm btn-secondary">저장</button>
                                        </p>
                                    </div>
                                    <ul class="sortable sortable_banner ui-sortable mgt10" id="bannerList">
                                        <li>
                                            <input type="checkbox" name="cbBanner" class="cb">

                                            <div class="banner">
                                                <img src="@/assets/img/event_category_2_1_1.jpg" alt="배너1">
                                            </div>
                                            <div class="caption">
                                                <span class="ellipsis">배너1</span>
                                                <hr/>
                                                <button class="btn btn-sm btn-secondary" type="button">수정</button>
                                                <a href="@/assets/img/event_category_2_1_1.jpg" class="btn btn-sm btn-default">원본</a>
                                            </div>
                                        </li>

                                        <li>
                                            <input type="checkbox" name="cbBanner" class="cb">
                                            <div class="banner">
                                                <img src="@/assets/img/event_category_2_2_1.jpg" alt="배너2" ow="790" oh="410">
                                            </div>
                                            <div class="caption">
                                                <span class="ellipsis">배너2</span>
                                                <hr/>
                                                <button class="btn btn-sm btn-secondary" type="button">수정</button>
                                                <a href="@/assets/img/event_category_2_2_1.jpg" class="btn btn-sm btn-default">원본</a>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                                <!-- 카테고리 슬라이드 배너 : 끝 //-->

                                <div class="box">
                                    <div class="section_head">
                                        <h4><i class="xi-check-circle"></i> Best 추천상품 관리</h4>
                                    </div>

                                    <table class="t_form">
                                        <tbody>
                                            <tr>
                                                <th>출력여부</th>
                                                <td>
                                                    <label><input type="radio" name="areaHiddenCMA" value="0" checked> 출력</label>
                                                    <label><input type="radio" name="areaHiddenCMA" value="1" class="mgl20"> 숨김</label>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>상품관리</th>
                                                <td>
                                                    <select id="areaGoodsCMA" name="areaGoodsCMA" class="text_input" size="5" multiple max="0" style="width:100%" ondblclick="openGoods(this)"></select>

                                                    <div class="over_h mgt5">
                                                        <div class="fl">
                                                            <button class="btn btn-sm btn-default" onclick="moveGoods('areaGoodsCMA', 'UP');">▲</button>
                                                            <button class="btn btn-sm btn-default" onclick="moveGoods('areaGoodsCMA', 'DOWN');">▼</button>
                                                            <button class="btn btn-sm btn-danger" onclick="delGoods('areaGoodsCMA');">삭제</button>
                                                        </div>
                                                        <div class="fr">
                                                            <button class="btn btn-sm btn-secondary" onclick="openSelectGoods('areaGoodsCMA');">상품선택</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="box">
                                    <div class="section_head">
                                        <h4><i class="xi-check-circle"></i> New 상품 관리</h4>
                                    </div>

                                    <table class="t_form">
                                        <tbody>
                                            <tr>
                                                <th>출력여부</th>
                                                <td>
                                                    <label><input type="radio" name="areaHiddenCMB" value="0" checked> 출력</label>
                                                    <label><input type="radio" name="areaHiddenCMB" value="1" class="mgl20"> 숨김</label>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>상품관리</th>
                                                <td>
                                                    <select id="areaGoodsCMB" name="areaGoodsCMB" class="text_input" size="5" multiple max="0" style="width:100%" ondblclick="openGoods(this)"></select>

                                                    <div class="over_h mgt5">
                                                        <div class="fl">
                                                            <button class="btn btn-sm btn-default" onclick="moveGoods('areaGoodsCMB', 'UP');">▲</button>
                                                            <button class="btn btn-sm btn-default" onclick="moveGoods('areaGoodsCMB', 'DOWN');">▼</button>
                                                            <button class="btn btn-sm btn-danger" onclick="delGoods('areaGoodsCMB');">삭제</button>
                                                        </div>
                                                        <div class="fr">
                                                            <button class="btn btn-sm btn-secondary" onclick="openSelectGoods('areaGoodsCMB');">상품선택</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="box">
                                    <div class="section_head">
                                        <h4><i class="xi-check-circle"></i> MD 추천상품 관리</h4>
                                    </div>

                                    <table class="t_form">
                                        <tbody>
                                            <tr>
                                                <th>출력여부</th>
                                                <td>
                                                    <label><input type="radio" name="areaHiddenCMC" value="0" checked> 출력</label>
                                                    <label><input type="radio" name="areaHiddenCMC" value="1" class="mgl20"> 숨김</label>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>상품관리</th>
                                                <td>
                                                    <select id="areaGoodsCMC" name="areaGoodsCMC" class="text_input" size="5" multiple max="0" style="width:100%" ondblclick="openGoods(this)"></select>

                                                    <div class="over_h mgt5">
                                                        <div class="fl">
                                                            <button class="btn btn-sm btn-default" onclick="moveGoods('areaGoodsCMC', 'UP');">▲</button>
                                                            <button class="btn btn-sm btn-default" onclick="moveGoods('areaGoodsCMC', 'DOWN');">▼</button>
                                                            <button class="btn btn-sm btn-danger" onclick="delGoods('areaGoodsCMC');">삭제</button>
                                                        </div>
                                                        <div class="fr">
                                                            <button class="btn btn-sm btn-secondary" onclick="openSelectGoods('areaGoodsCMC');">상품선택</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="btn_center">
                                    <button type="button" class="btn btn-info">확인</button>
                                    <button type="button" class="btn btn-danger">삭제</button>
                                </div>

                            </div>

                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

import { VueEditor } from 'vue2-editor'
export default {
  data () {
    return {
      categorCommentHtml: '<p>카테고리 상탄 디자인을 입력하여 주십시오</p>'
    }
  },
  components:
    {
      VueEditor
    }
}
</script>
<style>
    #vueEditor{
        height: 200px;
    }
</style>
