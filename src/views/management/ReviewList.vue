<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 상품평관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">상품평관리</li>
                </ul>
                <ul class="helpbox">
                    <li><span class="red">[회원정보보기]</span>를 클릭하시면 상품평을 적어주신 회원의 정보를 보실 수 있습니다.</li>
                    <li>상품평을 삭제 하실려면 <span class="red">[삭제]</span> 버튼을 클릭해 주세요.</li>
                </ul>


                <form name="Frm">
                    <div class="section_head">
                        <h4>오늘 등록된 상품평은 총 <span><strong>0</strong></span>개입니다.</h4>
                        <div class="mgb5">
                            <select id="skey" name="skey" class="text_input">
                                <option value="">전체</option>
                                <option value="goods">상품명</option>
                                <option value="subject">제목</option>
                                <option value="content">내용</option>
                                <option value="answer">답변</option>
                                <option value="user">평가자</option>
                                <option value="dealer">답변자</option>
                            </select>

                            <input type="text" name="sword" maxlength="50" class="text_input" style="width:150px; margin:0 5px">
                            <b-button variant="outline-secondary" size="sm">검색</b-button>
                        </div>
                    </div>

                    <table class="t_list">
                        <caption>등록된 상품평 리스트</caption>
                        <colgroup>
                            <col width="70">
                            <col width="*">
                            <col width="150">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>상품평</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td style="padding:0">
                                    <div class="over_h" style="padding:10px;">
                                        <div class="fl" style="width:70px;"><img src="/img/201324253665762.jpg" width="50" height="50"></div>
                                        <div class="fl" style="width:80%;text-align:left;padding-top:10px;"><a href="/goods/detail?gno=75" target="_blank">버든배낭</a></div>
                                    </div>
                                    <div class="over_h" style="padding:6px 10px 4px;background:#f6f6f6;border:solid 1px #ddd;">
                                        <div class="fl">
                                            <!-- 별점 -->                                          
                                            <img src="/img/star_04.png" alt="별점 4">
                                        </div>
                                        <div class="fr">몰스토어 (2017-08-31 15:08:47)</div>
                                    </div>
                                    <div style="padding:15px 10px;text-align:left;">
                                        <div><strong>물건 잘 받았습니다</strong></div>
                                        <div class="mgt10">만족스럽습니다</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <b-button variant="outline-info" size="sm" id="btnMemberInfo"
                                          @click="$refs.viewUserInfoModal.show()">회원정보보기</b-button>
                                    </div>
                                    <div class="mgt5">
                                        <b-button variant="outline-secondary" size="sm" id="btnReview" style="margin-right:5px"
                                          @click="$refs.editReviewModal.show()">수정</b-button>
                                        <b-button variant="outline-danger" size="sm" onclick="delReview(86)">삭제</b-button>
                                    </div>
                                    <div class="mgt5">
                                        <b-button variant="outline-secondary" size="sm" id="btnAnswer"
                                          @click="$refs.answerReviewModal.show()">답변</b-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paging" style="margin-top:20px">
                        <span><a href=""><strong>1</strong></a></span>
                    </div>
                </form>


<!-- 회원정보보기 모달 -->
                <b-modal ref="viewUserInfoModal">
                    <template v-slot:modal-title>
                    <font-awesome-icon icon="info-circle" /> 회원정보
                    </template>
                    <table class="mform">
                        <caption>회원 정보 내역</caption>
                        <colgroup><col width="70"><col width="*"><col width="70"><col width="*"></colgroup>
                        <tbody>
                            <tr>
                                <th>회원상태</th>
                                <td colspan="3"><span>일반</span></td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td colspan="3"><span>mallstore</span></td>
                            </tr>
                            <tr>
                                <th>성명</th>
                                <td>몰스토어</td>
                                <th>회원등급</th>
                                <td>코알라회원</td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td></td>
                                <th>생년월일</th>
                                <td>1980년 11월 11일 [양력]</td>
                            </tr>
                            <tr>
                                <th>회사명</th>
                                <td></td>
                                <th>사업자<br>등록번호</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>업태</th>
                                <td></td>
                                <th>종목</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>전화</th>
                                <td>02-555-1344</td>
                                <th>팩스</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>휴대폰</th>
                                <td colspan="3">010-0000-0000</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td colspan="3">joonh0911@ncgn.co.kr</td>
                            </tr>
                            <tr>
                                <th>SMS수신</th>
                                <td>거부</td>
                                <th>메일링<br>수신</th>
                                <td>거부</td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td colspan="3">[06531]&nbsp;서울 서초구 신반포로49길 12 (잠원동, 하늘정원빌딩) 4층</td>
                            </tr>
                            <tr>
                                <th>메모</th>
                                <td colspan="3">
                                    <div style="overflow:auto; width:100%;"></div>
                                </td>
                            </tr>
                            <tr>
                                <th>가입일자</th>
                                <td colspan="3">2012-12-13 14:28:08</td>
                            </tr>
                            <tr>
                                <th>접속수</th>
                                <td>175</td>
                                <th>최근<br>접속일</th>
                                <td>2020-01-29 11:00:32</td>
                            </tr>
                            <tr>
                                <th>적립금</th>
                                <td>92,280 원</td>
                                <th>총구매<br>금액</th>
                                <td>
                                    <strong>57,700 원</strong>                                    
                                    <div style="color:#FC7701; font-size:11px; margin-top:10px;">
                                        <strong style="color:#FC7701;">※ 총구매금액</strong> = (판매가 + 옵션가) * 수량<br>
                                        (적립금, 쿠폰, 배송비, 할인금액 미포함)
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>관리자<br>메모</th>
                                <td colspan="3">
                                    <div style="overflow:auto; width:100%;"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-modal>

<!-- 상품평 수정 모달 -->
                <b-modal ref="editReviewModal">
                    <template v-slot:modal-title>
                        <font-awesome-icon icon="info-circle" /> 상품평 수정
                    </template>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="t_form">
                        <colgroup><col width="100"><col width="200"><col width="100"><col width="*"></colgroup>
                        <caption>답변 수정 폼</caption>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td colspan="3">
                                    <input type="text" name="subject" value="물건 잘 받았습니다" class="text_input" style="width:98%" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="3">
                                    <textarea name="content" rows="5" class="text_input" style="width:98%">만족스럽습니다</textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>이미지</th>
                                <td colspan="3">
                                    <div style="float:left"><input type="file" name="imgReview"></div>
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td colspan="3">
                                    <input type="text" name="writer" value="몰스토어" class="text_input" style="width:130px" maxlength="20">
                                </td>
                            </tr>
                            <tr>
                                <th>별점평가</th>
                                <td colspan="3">
                                    <star-rating active-color="#e61654"
                                    :star-size="25"
                                    :rounded-corners="true"
                                    :show-rating="false"                                                             
                                    ></star-rating>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-modal>

<!-- 상품평 답변달기 모달 -->
                <b-modal ref="answerReviewModal">
                    <template v-slot:modal-title>
                        <font-awesome-icon icon="info-circle" /> 상품평 답변
                    </template>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="t_form">
                        <colgroup><col width="130"><col width="*"></colgroup>
                        <caption>답변 등록 폼</caption>
                        <tbody>
                            <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="content" rows="5" class="text_input" style="width:98%"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type="text" name="writer" value="몰인몰" class="text_input" style="width:130px" maxlength="20" readonly>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </b-modal>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
    components: {
        StarRating
    },
    data() {
        return {
            rating: 0
        }
    },
    methods: {
        setRating: function(rating) {
            this.rating = rating
        }
    }
}
</script>

<style>
.mform {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
}
.mform th {
    text-align: center;
    padding: 7px 5px;
    border: 1px solid #E6E6E6;
    background-color: #F5F5F5;
}
.mform td {
    text-align: left;
    padding: 7px 5px;
    border: 1px solid #E6E6E6;
}
</style>