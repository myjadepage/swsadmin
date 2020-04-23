<template>
  <div id="contents">
    <h3><font-awesome-icon icon="play-circle" /> 상품평관리</h3>
    <ul class="navi">
        <li class="home"><a href="/" target="_top">홈</a></li>
        <li>운영관리</li>
        <li>게시판운영관리</li>
        <li class="on">상품평관리</li>
    </ul>
    <ul class="helpbox">
        <li><span class="red">[회원정보보기]</span>를 클릭하시면 상품평을 적어주신 회원의 정보를 보실 수 있습니다.</li>
        <li>상품평을 삭제 하실려면 <span class="red">[삭제]</span> 버튼을 클릭해 주세요.</li>
    </ul>

    <table class="t_list">
        <caption>검색 영역</caption>
        <colgroup>
            <col width="130">
            <col width="*">
        </colgroup>
        <tbody>
            <tr>
                <th>등록일자</th>
                <td style="text-align:left; padding-left:10px">
                    <sws-date :parentData="reviewFilter"></sws-date>
                </td>
            </tr>
            <tr>
                <th>리뷰타입</th>
                <td style="text-align:left;padding-left:10px">
                     <select class="text_input" v-model="reviewFilter.reviewTypeField">
                         <option> ::선택하세요:: </option>
                         <option v-for="(item, index) in reviewTypeFilter" :key="index" :value="item.value">{{ item.text }}</option>
                     </select>                     
                </td>
            </tr>
            <tr>
                <th>직접검색</th>                
                 <td style="text-align:left;padding-left:10px">
                     <select class="text_input" v-model="reviewFilter.searchField">
                         <option v-for="(item, index) in searchFilter" :key="index" :value="item.value">{{ item.text }}</option>
                     </select>
                     <input type="text" class="text_input" v-model="reviewFilter.searchText" style="width:300px;margin:0 5px ">
                     <!-- <b-button id="fileterBoard" type="submit" variant="outline-secondary" size="sm"> <font-awesome-icon icon="search" size="sm"/>&emsp;검색 </b-button> -->
                 </td>
            </tr>
        </tbody>
    </table>
    <div class="btn_center">
        <b-button variant="outline-secondary" size="lg" @click="searchClicked">
            <font-awesome-icon icon="search" size="sm"/> 검색</b-button>
    </div>

    <div class="section_head">
        <h4>등록된 상품평은 총 <span><strong>{{ reviewData.length }}</strong></span>개입니다.</h4>
    </div>
    
    
    <form name="Frm">
        <b-table ref="qnaTable" head-variant="light" striped    
          :fields="fields"
          :items="reviewData"
          :keyword="searchQuery"                
        >
            <template v-slot:table-colgroup>
                <col width="70">
                <col width="100">
                <col width="380">
                <col width="*">
                <col width="200">
                <col width="200">
                <col width="200">
                <col width="100">               
            </template>

            <template  v-slot:cell(image) = "row">
                <img :src="row.item.image" style="width:50px">                 
            </template>

            <template  v-slot:cell(name) = "row">          
                <p style="padding-right:20px"> {{ row.item.name }}</p>
            </template>  

            <template  v-slot:cell(content) = "row">          
                <div style="width:450px;" class="ellipsis"> {{ row.item.content }}</div>
            </template> 

            <template v-slot:cell(starPoint) = "row">
                <star-rating active-color="#e61654" :star-size="20" :rounded-corners="true" :show-rating="false"
                  :rating="row.item.starPoint"
                ></star-rating>
            </template>

            <template  v-slot:cell(userId) = "row">          
                <a href="#" @click="$refs.viewUserInfoModal.show()">{{ row.item.userId }}</a>
            </template> 

            <template v-slot:cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? '상세닫기' : '상세보기'}}
                </b-button>
            </template>

            <template v-slot:row-details = "row">              
                <div>                         
                    <b-card>
                        <b-row class="mb-2">                   
                            <b-col><strong>상품평 :</strong> {{ row.item.content }}</b-col>
                            <b-col sm="2" class="text-sm-right">
                                <!-- <div>
                                    <b-button variant="outline-info" size="sm" id="btnMemberInfo"
                                          @click="$refs.viewUserInfoModal.show()">회원정보보기</b-button>
                                    </div> -->
                                    <div class="mgt5">
                                        <!-- <b-button variant="outline-secondary" size="sm" id="btnReview" style="margin-right:5px"
                                          @click="$refs.editReviewModal.show()">수정</b-button> -->
                                        <!-- <b-button variant="outline-secondary" size="sm" id="btnAnswer"  style="margin-right:5px"
                                          @click="$refs.answerReviewModal.show()">답변</b-button> -->
                                        <b-button variant="outline-danger"  @click="deleteReviewClicked(row)">삭제</b-button>
                                    </div>                                   
                                    <!-- <div class="mgt5">
                                        <label><input type="checkbox"/> 미노출</label>
                                    </div> -->
                            </b-col>
                        </b-row>

                        <!-- 상품평이미지 또는 동영상 -->
                        <b-row> 
                            <ul>                               
                                <li class="fl" style="padding:10px"
                                  v-for="item in row.item.productReviewPhotos" 
                                  :key="item.prdtReviewPhotoSysId"
                                >
                                  <img :src="item.photoUrl"  style="width:350px">
                                </li>
                            </ul>
                        </b-row>                      
                    </b-card>   
                </div>           
            </template>  
        </b-table>
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
    <!-- <b-modal ref="answerReviewModal" size="lg" @ok="answerReviewSubmit">
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
                        <textarea style="width:100%; min-height:200px" class="text_input" v-model="answerReview"></textarea>
                    </td>
                </tr>  
            </tbody>
        </table>
    </b-modal> -->
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import commonJs from '@/assets/js/common.js'
import SwsDate from '@/components/common/SwsDate'

export default {
    mixins: [ commonJs ],
    components: {
        StarRating,
        SwsDate
    },
    data() {
        return {
            reviewTypeFilter: [                        
                {value: {code: 0, title: 'text'}, text: '일반'},
                {value: {code: 1, title: 'photo'}, text: '포토'},
                {value: {code: 2, title: 'video'}, text: '동영상'}
            ],
            searchFilter: [               
                {value: {code: 0, title: 'All'}, text: '전체'},
                {value: {code: 1, title: 'name'}, text: '상품명'}
            ],
            reviewFilter: {
                reviewStatusList: this.reviewData,               
                startDate: '',
                endDate: '',
                searchText: '',
                searchField: {code: 0, title: 'All'}
            },
            rating: 0,          
            searchQuery:'',
            fields:[
                {key : 'prdtReviewSysId', label : 'No', sortable: true},
                {key : 'image', label : '상품이미지', sortable: false},
                {key : 'name', label : '상품명', sortable: true},
                {key : 'content', label : '상품평', sortable: false},
                {key : 'reviewType', label : '상품평타입', sortable: false},
                {key : 'starPoint', label : '별점', sortable: true},
                {key : 'userId', label : '작성자', sortable: true},
                {key : 'createdAt', label : '등록일', sortable: true},
                {key : 'show_details', label : '상세보기', sortable: false}
            ],
            reviewData: []
        }
    },
    mounted () { 
        this.axiosGetRequest('/api/v1/products/reviews/list', '',this.loadReviewList)
        this.onSubmit()
    },
    methods: {
        setRating: function(rating) {
            this.rating = rating
        },
        loadReviewList(res) {
            console.log(res)
            let result = res.data.jsonData.productReviews
            if(result) {
                for(let i=0 ; i < result.length; i++ ) {
                    this.reviewData.push({
                        'prdtReviewSysId': result[i].prdtReviewSysId,
                        'image': result[i].smallImageUrl,
                        'name': result[i].name,
                        'userId': result[i].userId,
                        'createdAt': this.changeDate(result[i].createdAt),
                        'content': result[i].content,
                        'reviewType' : this.changeReviewType(result[i].reviewType),
                        'starPoint': result[i].starPoint,
                        'productReviewPhotos': result[i].productReviewPhotos,
                        'prdtSysId': result[i].prdtSysId
                    })
                }
            }
            console.log(this.reviewData)
        },
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        },
        changeReviewType(flag) {
            switch ( flag) {
                case 0 : return '일반';
                case 1 : return '포토';
                case 2 : return '동영상';
            }           
        }, 
        deleteReviewClicked(row) {
            this.axiosDeleteRequest('/api/v1/products/' + row.item.prdtSysId + '/reviews/' + row.item.prdtReviewSysId,'', this.deleteReviewCallback,'', sessionStorage.getItem('accessToken'))
        },
        deleteReviewCallback(res) {
            if(res.data.jsonData.resultCode === '0001'){
                alert('상품평이 삭제되었습니다.')
                window.location.reload()
            }
        },
        searchClicked() {
            let searchParams = {}
            searchParams.startDate = this.reviewFilter.startDate
            searchParams.endDate = this.reviewFilter.endDate

            if(!this.isEmpty(this.reviewFilter.searchText) && this.reviewFilter.searchText !== ""){
                searchParams.keywordCode = this.reviewFilter.searchField.code
                searchParams[this.reviewFilter.searchField.title] = this.reviewFilter.searchText
            }
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