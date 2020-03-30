<template>
            <div id="contents">
                <h3>
                    {{ $route.name }}
                </h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>환경설정</li>
                    <li>사이트정보관리</li>
                    <li class="on">
                    {{ $route.name }}
                    </li>
                </ul>
                <ul class="helpbox">
                    <li>웹브라우져 Title, 검색엔진키워드설정, 파비콘 등록, 상점명 문법설정을 설정합니다.</li>
                    <li>카드무이자할부, 소스공개 여부, 업로드 컴포넌트를 설정합니다.</li>
                    <li>카테고리분류, 상품목록 장바구니 관리기능, 업로드 컴포넌트를 설정합니다.</li>
                    <li>변동사항이 있을시에는 반드시 변경해주시기 바랍니다.</li>
                </ul>


                <form name="formInputSite" id="formInputSite">

                    <!--상단쇼핑몰타이틀-->
                    <div class="box">
                        <div class="section_head">
                            <h4><font-awesome-icon icon="arrow-circle-right" /> 상단쇼핑몰타이틀</h4>
                        </div>

                        <table class="t_form">
                            <tbody>
                                <tr>
                                    <th>웹브라우져 Title</th>
                                    <td>
                                        <input type="text" name="browserTitle" class="text_input" maxlength="150" v-model="form.browserTitle">
                                        <span class="square_blue">웹 브라우저 상단에 노출되는 사이트 소개 문구를 등록/관리 할 수 있습니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>검색엔진 키워드설정</th>
                                    <td>
                                        <div>
                                            <strong>Description(쇼핑몰설명)</strong>&emsp;
                                            <span class="square_blue">영문, 한글, 숫자만 입력하세요.</span>
                                            <input type="text" name="description" value="" class="text_input mgt5" maxlength="100" style="width:98.6%">
                                        </div>
                                        <br />
                                        <div>
                                            <strong>Keyword(키워드)</strong>&emsp;
                                            <span class="square_blue">영문, 한글, 숫자만 입력하세요.</span>
                                            <input type="text" name="keyword" value="" class="text_input mgt5" maxlength="100" style="width:98.6%">
                                        </div>
                                        <br />
                                        <div>
                                            <strong>검색엔진 관련키워드</strong>
                                            <textarea name="metaTag" rows="2" class="textarea mgt5" style="width:98.6%"></textarea>
                                            <span class="square_blue">검색엔진에서 검색시 나타나게 할 검색키워드를 적어주세요.</span>
                                        </div>
                                        <br />
                                        <!-- 설명 : 시작 -->
                                        <div>
                                            <div><img src="@/assets/img/icon_tip.gif" alt="TIP"></div>
                                            <div class="tip_box2">
                                                <span><i class="xi-lightbulb"></i> Description : 200자 이내의 문자(특수문자를 사용하시면 안됩니다. 한글/영문/숫자만 입력하세요.)</span><br>
                                                <span><i class="xi-lightbulb"></i> Keyword : 70자 이내로 작성하시고, 같은 단어는 3회 이상 반복하시면 안됩니다.</span>
                                            </div>
                                        </div>
                                        <!-- 설명 : 끝 -->
                                    </td>
                                </tr>
                                <tr>
                                    <th>파비콘</th>
                                    <td>
                                        <label class="btn btn-sm btn-secondary"><input type="file" name="uploadFavicon" class="hidden">파비콘 업로드</label>
                                        <span class="square_blue">사이즈 16×16 의 아이콘 이미지(확장자 : ico)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>오픈그래프</th>
                                    <td>
                                        <label class="btn btn-sm btn-secondary"><input type="file" name="uploadImage" class="hidden">이미지 업로드</label>
                                        <span class="square_blue">사이즈 270×270 의 아이콘 이미지(확장자 : jpg)</span>
                                    </td>
                                </tr>


                                <tr>
                                    <th>법인인감도장</th>
                                    <td>
                                        <label class="btn btn-sm btn-secondary"><input type="file" name="uploadStamp" class="hidden">법인인감도장 업로드</label>
                                        <span class="square_blue">법인인감도장을 등록 관리합니다. 인감이미지는 백그라운드(바탕색)가 투명인 jpg, gif, png 파일로 등록해주세요.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--상단쇼핑몰타이틀-->


                    <!--사이트 일반정보-->
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 사이트 일반정보</h4>
                        </div>

                        <table class="t_form">
                            <caption>사이트 일반정보 입력 폼</caption>
                            <tbody>
                                <tr>
                                    <th>카드무이자할부</th>
                                    <td>
                                        <input type="text" name="noInterest" value="무이자 없음" class="text_input" maxlength="100">
                                        <span class="square_blue">상품목록, 장바구니, 주문결제 페이지에 노출되는 무이자 정보를 등록/관리할 수 있습니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>소스공개여부</th>
                                    <td>
                                        <div>
                                            <span style="width:100px;"><input name="isOpenHtml" type="radio" value="F"> 적용</span>
                                            <span><input name="isOpenHtml" type="radio" value="T" checked=""> 적용안함</span>
                                        </div>
                                        <div class="mgt5"><span class="square_blue">오른쪽마우스 버튼의 사용을 막아 소스 및 이미지 경로를 못보게 합니다.</span></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>본인 인증</th>
                                    <td>
                                        <div class="mgb5">
                                            <span style="width:100px;"><input name="isCertify" type="radio" value="T" onClick="checkCertify()"> 사용함</span>
                                            <span><input name="isCertify" type="radio" value="F" onClick="checkCertify()"  checked> 사용안함</span>
                                        </div>
                                        <div id="bodyCertify" style="display: none;">
                                            <table class="t_form">
                                                <tbody>
                                                    <tr>
                                                        <th></th>
                                                        <th>아이디</th>
                                                        <th>비밀번호</th>
                                                    </tr>
                                                    <tr>
                                                        <th class="red"><strong>NICE 본인확인</strong></th>
                                                        <td><input type="text" name="certifyNiceId" class="text_input" style="width:150px" value="" maxlength="20"></td>
                                                        <td><input type="text" name="certifyNicePw" class="text_input" style="width:150px" value="" maxlength="20"></td>
                                                    </tr>
                                                    <tr>
                                                        <th class="red"><strong>NICE 아이핀</strong></th>
                                                        <td><input type="text" name="certifyIpinId" class="text_input" style="width:150px" value="" maxlength="20"></td>
                                                        <td><input type="text" name="certifyIpinPw" class="text_input" style="width:150px" value="" maxlength="20"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--사이트 일반정보-->


                    <!--상품관련환경-->
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 상품관련 환경설정</h4>
                        </div>

                        <table class="t_form">
                            <caption>상품관련 환경설정 입력 폼</caption>

                            <tbody>
                                <tr>
                                    <th>리스트이미지 사이즈</th>
                                    <td>
                                        <input type="text" name="imgSWidth" class="text_input" style="width:100px;" maxlength="3"> px *
                                        <input type="text" name="imgSHeight" class="text_input" style="width:100px;" maxlength="3"> px
                                        <span class="square_blue">(가로 * 세로) HOME, 각 메인 추천상품, 상품리스트의 출력되는 이미지의 사이즈를 설정합니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>상세이미지 사이즈</th>
                                    <td>
                                        <input type="text" name="imgMWidth" class="text_input" style="width:100px;" maxlength="3"> px *
                                        <input type="text" name="imgMHeight" class="text_input" style="width:100px;" maxlength="3"> px
                                        <span class="square_blue">(가로 * 세로) 상세정보페이지의 이미지 사이즈를 설정합니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>확대이미지 사이즈</th>
                                    <td>
                                        <input type="text" name="imgBWidth" class="text_input" style="width:100px;" maxlength="3"> px *
                                        <input type="text" name="imgBHeight" class="text_input" style="width:100px;" maxlength="3"> px
                                        <span class="square_blue">(가로 * 세로)상품의 확대보기(zoom)의 이미지 사이즈를 설정합니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>상품목록 장바구니 관리기능</th>
                                    <td>
                                        <span><input type="radio" name="isChoiceListCart" value="T"> 적용함</span>
                                        <span class="mgl20"><input type="radio" name="isChoiceListCart" value="F" checked> 적용안함</span>
                                        <span class="square_blue">상품리스트에서 전체항목을 장바구니에 저장하실 수 있습니다.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>품절상품 진열기능</th>
                                    <td>
                                        <span><input type="radio" name="isDisplaySoldOut" value="T" checked> 진열하기</span>
                                        <span class="mgl20"><input type="radio" name="isDisplaySoldOut" value="F"> 진열안함</span>
                                        <span class="square_blue">품절된 상품을 쇼핑몰에서 진열할지 진열하지 않을지를 결정합니다.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--상품관련환경-->

                    <!--관리자 구매확정 기간 설정-->
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 기간 설정</h4>
                        </div>

                        <table class="t_form">
                            <caption> 기간 설정 입력 폼</caption>
                            <tbody>
                                <tr>
                                    <th>배송완료 기간 설정</th>
                                    <td>
                                        <input type="text" name="deliveryperiod" value="1" maxlength="2" class="text_input" style="width:50px;"> 일 이후 설정된 기간동안 판매자가 배송완료를 안하게 되면 자동으로 <strong>‘배송완료’</strong> 로 전환 됩니다. (
                                        <strong class="blue">0</strong> 으로 설정하면 관리자가 임의설정 불가능)
                                    </td>
                                </tr>
                                <tr>
                                    <th>구매확정 기간 설정</th>
                                    <td>
                                        <input type="text" name="decisionPeriod" value="30" maxlength="2" class="text_input" style="width:50px;"> 일 이후 설정된 기간동안 사용자가 구매확정을 안하게 되면 관리자가 <strong>구매확정을 강제</strong>로 할수 있습니다. (
                                        <strong class="blue">0</strong> 으로 설정하면 관리자가 임의설정 불가능)
                                    </td>
                                </tr>
                                <tr>
                                    <th>자동탈퇴 대상자 설정</th>
                                    <td>
                                        <input type="text" name="cfgautowithdrawtarget" value="1" maxlength="3" class="text_input" style="width:50px;"> 일 동안 사이트에 <strong>로그인하지 않은</strong> 회원을 수집합니다. (
                                        <strong class="blue">0</strong> 으로 설정시 자동탈퇴대상 사용안함으로 설정)
                                    </td>
                                </tr>
                                <tr>
                                    <th>자동탈퇴일 설정</th>
                                    <td>
                                        <input type="text" name="cfgautowithdrawperiod" value="1" maxlength="3" class="text_input" style="width:50px;"> 일 이후 사이트에 <strong>로그인하지 않은</strong> 회원에 대한 회원탈퇴를 진행합니다. (
                                        <strong class="blue">0</strong> 으로 설정시 자동탈퇴 처리하지 않습니다.)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--관리자 구매확정 기간 설정-->

                    <!-- 입점업체에 이력 보기 -->
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 입점업체에 상품이력 보이기 설정</h4>
                        </div>

                        <table class="t_form">
                            <caption>입점업체에 상품이력 보이기 설정 입력 폼입니다.</caption>
                            <tbody>
                                <tr>
                                    <th>설정 여부</th>
                                    <td>
                                        <span><input type="radio" name="isGoodsLogInfo" value="T" checked>보이기</span>
                                        <span class="mgl20"><input type="radio" name="isGoodsLogInfo" value="F">안보이기</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 입점업체에 이력 보기 -->

                    <!-- 외부메일서버 -->
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 외부메일서버 관련정보</h4>
                        </div>

                        <table class="t_form">
                            <caption>외부메일서버 관련정보 입력 폼</caption>
                            <tbody>
                                <tr>
                                    <th>외부메일서버 사용여부</th>
                                    <td>
                                        <span><input type="radio" name="isOutsideSmtp" value="T"   onclick="checkSmtp()"> 사용</span>
                                        <span class="mgl20"><input type="radio" name="isOutsideSmtp" value="F"  checked  onclick="checkSmtp()"> 사용안함</span>
                                    </td>
                                </tr>

                            </tbody>
                            <tbody id="bodySmtp" style="display:none;">
                                <tr>
                                    <th>메일서버주소</th>
                                    <td>
                                        <input type="text" name="smtpServer" value="" class="text_input" style="width:250px" maxlength="50">
                                        <span class="square_blue">일서버주소를 입력하세요.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>아이디</th>
                                    <td>
                                        <input type="text" name="smtpId" value="" class="text_input" style="width:250px" maxlength="50">
                                        <span class="square_blue">메일 계정을 입력하세요.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>비밀번호</th>
                                    <td>
                                        <input type="password" name="smtpPw" value="" class="text_input" style="width:250px" maxlength="100">
                                        <span class="square_blue">정 비밀번호를 입력하세요.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 외부메일서버 -->

                    <!-- 설명 -->
                    <div class="mgt20"><img src="@/assets/img/icon_tip.gif" alt="TIP"></div>
                    <div class="tip_box2">
                        <span>외부메일서버를 사용하시면 메일관련 계정정보를 입력하셔야 합니다.</span>
                    </div>
                    <!-- 설명 -->
                </form>

                <div class="btn_center">
                    <button class="btn btn-info" id="btnInputSite">확인</button>
                    <button class="btn btn-secondary" onclick="cancle('back');">취소</button>
                </div>
    </div>
</template>

<script>
export default {
  data: () => ({
      form: {
          browserTitle: '',
      }
  }),
  methods: {

  }
}
</script>

<style>

</style>