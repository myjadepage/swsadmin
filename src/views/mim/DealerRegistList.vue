<template>
 <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 판매자 신청목록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자관리</li>
                    <li class="on">판매자 신청목록</li>
                </ul>
                <ul class="helpbox">
                    <li>쇼핑몰에 판매자 신청하신 목록을 관리하는 곳 입니다.</li>
                    <li>판매자의 상세내역을 잘 검토하시여 판매자 승인을 해 주시면 됩니다.</li>
                    <li>판매자 신청 목록에서 승인을 하시면 판매자목록으로 자동 등록됩니다.</li>
                </ul>

                <div class="section_head">
                    <h4>총 <strong class="red">2</strong>건의 판매자 신청이 있으며, 오늘 신청된 판매자는 <strong class="red">0</strong>건입니다.</h4>
                    <div>
                        <select id="skey" name="skey" class="text_input">
                            <option value="">전체</option>
                            <option value="id">아이디</option>
                            <option value="name">업체명</option>
                            <option value="charger">담당자</option>
                            <option value="bizno">사업자등록번호</option>
                            <option value="tel">전화번호</option>
                            <option value="mobile">핸드폰번호</option>
                            <option value="email">이메일</option>
                        </select>
                        <input type="text" name="sword" class="text_input" style="width:150px; margin:0 5px">
                        <b-button variant="secondary" size="sm">검색</b-button>
                    </div>
                </div>

                <form name="Frm" style="margin-top:10px">
                    <table class="t_list">
                        <caption>승인 대기 판매자 목록</caption>
                        <colgroup>
                            <col width="17%">
                            <col width="*">
                            <col width="13%">
                            <col width="13%">
                            <col width="13%">
                            <col width="10%">
                            <col width="150">
                            <col width="50">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>업체명</th>
                                <th>담당자</th>
                                <th>전화번호</th>
                                <th>휴대폰번호</th>
                                <th>신청일</th>
                                <th>상세정보</th>
                                <th><input type="checkbox" name="cbListAll"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>awesomeshop</td>
                                <td>어썸몰</td>
                                <td><a href="mailto:shlee@awesomebly.com">김다다</a></td>
                                <td>01-888-9999</td>
                                <td>010-6666-8888</td>
                                <td>2019-03-11</td>
                                <td><b-button variant="secondary" size="sm" @click="$router.push('/mim/dealer_detail')">상세정보</b-button></td>
                                <td><input type="checkbox" name="cbList"></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href=""><strong>1</strong></a></span>
                    </div>

                    <div class="btn_right">
                        <b-button variant="danger" size="lg" >선택삭제</b-button>
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