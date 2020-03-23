<template>
   <div id="contents">
                <h3>게시판통합관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>상점운영관리</li>
                    <li class="on">게시판통합관리</li>
                </ul>
                <ul class="helpbox">
                    <li>입점업체와 관련된 게시판은 관리자의 메뉴에 영향을 받지 않습니다.</li>
                    <li>공지사항 경우 관리자 로그인을 하신 뒤 일반게시판처럼 글쓰기를 하시면 됩니다.</li>
                    <li>관리자 로그인을 하시면 모든 게시물의 비밀번호가 자동으로 보여집니다. 불필요한 게시물은 바로바로 삭제하세요~ ^^</li>
                </ul>

                <form name="Frm">
                    <input type="hidden" name="mode" value="REG">
                    <input type="hidden" name="idx" value="0">
                    <input type="hidden" name="boardId" value="">
                    <input type="hidden" name="isFix" value="">
                    <input type="hidden" name="uploadMaxSize" value="7">

                    <div class="section_head">
                        <h4>게시판 등록</h4>
                    </div>

                    <table class="t_form">
                        <caption>게시판 등록,수정 폼</caption>
                        <colgroup>
                            <col width="130">
                            <col width="*">
                            <col width="130">
                            <col width="*">
                        </colgroup>

                        <tbody>
                            <tr>
                                <th>게시판 아이디</th>
                                <td colspan="3">
                                    <input type="text" name="idInput" class="text_input" style="width:150px;" maxlength="20">
                                    <span class="button small"><button type="button" onclick="checkOverlapId()">아이디 중복확인</button></span>
                                </td>
                            </tr>

                            <tr>
                                <th>게시판 유형</th>
                                <td colspan="3">
                                    <dl class="choose">
                                        <dt><input type="radio" name="boardType" value="100" onclick="checkBoardType()" checked=""></dt>
                                        <dd class="mr20">일반형</dd>
                                        <dt><input type="radio" name="boardType" value="200" onclick="checkBoardType()"></dt>
                                        <dd class="mr20">앨범형</dd>
                                        <dt><input type="radio" name="boardType" value="300" onclick="checkBoardType()"></dt>
                                        <dd class="mr20">자료실형</dd>
                                        <dt><input type="radio" name="boardType" value="400" onclick="checkBoardType()"></dt>
                                        <dd>웹진형</dd>
                                    </dl>
                                </td>
                            </tr>
                            <tr>
                                <th>게시판명</th>
                                <td colspan="3">
                                    <input type="text" name="title" class="text_input" style="width:98%" value="" maxlength="50">
                                </td>
                            </tr>

                            <tr>
                                <th>좌측메뉴</th>
                                <td colspan="3">
                                    <select id="leftmenu" name="leftmenu" style="width:100%"><option value="">메뉴 없음</option><optgroup label="- 고정 메뉴 -"></optgroup><option value="-1">마이페이지 메뉴</option><option value="-2">고객센터 메뉴</option></select>
                                </td>
                            </tr>

                            <tr>
                                <th>목록당 게시물수</th>
                                <td colspan="3">
                                    <input type="text" name="pageSize" class="text_input" style="width:50px;" maxlength="3" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)" value="20"> 개
                                    <span class="blue">(예 : 20)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>게시판 가로폭</th>
                                <td colspan="3">
                                    <input type="text" name="width" class="text_input" style="width:50px;" maxlength="5" value="100">
                                    <select id="widthUnit" name="widthUnit" style="font-size:11px;"><option value="px">픽셀</option><option value="%" selected="">%</option></select>

                                    <span class="blue">(예 : 100% 또는 650픽셀)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>제목글자수 제한</th>
                                <td colspan="3">
                                    <input type="text" name="subjectLimit" class="text_input" style="width:50px;" maxlength="3" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)" value="20"> 글자
                                    <span class="blue">(공백 또는 0 으로 설정하면 제한없음)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>답글 설정</th>
                                <td colspan="3">
                                    <input type="radio" name="isReply" value="T" onclick="checkReply()" checked="">답글 허용
                                    <input type="radio" name="isReply" value="F" onclick="checkReply()">허용 안함 &nbsp;&nbsp;&nbsp; (
                                    <input type="checkbox" name="isReplyEmail" value="T" checked=""> 답글 등록시 질문작성자에게 메일발송)
                                </td>
                            </tr>
                            <tr>
                                <th>댓글 설정</th>
                                <td colspan="3">
                                    <input type="radio" name="isComment" value="T" onclick="checkComment()" checked="">댓글 허용
                                    <input type="radio" name="isComment" value="F" onclick="checkComment()">허용 안함
                                </td>
                            </tr>
                            <tr>
                                <th>비밀글 설정</th>
                                <td>
                                    <input type="radio" name="isSecret" value="T" checked="">비밀글 허용
                                    <input type="radio" name="isSecret" value="F">허용 안함
                                </td>
                                <th>링크 설정</th>
                                <td>
                                    <input type="radio" name="isLink" value="T">링크 허용
                                    <input type="radio" name="isLink" value="F" checked="">허용 안함
                                </td>
                            </tr>

                        </tbody>
                        <tbody id="bodyImage" style="display:none;">
                            <tr>
                                <th>썸네일 배열개수</th>
                                <td>
                                    <input type="radio" name="gridCols" value="2" disabled=""> 2개
                                    <input type="radio" name="gridCols" value="3" disabled=""> 3개
                                    <input type="radio" name="gridCols" value="4" checked="" disabled=""> 4개
                                    <input type="radio" name="gridCols" value="5" disabled=""> 5개
                                </td>
                                <th>썸네일 사이즈</th>
                                <td>
                                    <input type="text" name="thumbWidth" class="text_input" style="width:50px" maxlength="3" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)" value=""> ×
                                    <input type="text" name="thumbHeight" class="text_input" style="width:50px" maxlength="3" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)" value="">
                                </td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <th>게시판 분류 사용</th>
                                <td colspan="3">

                                    <input type="radio" name="isUseGroup" value="T" onclick="checkUseGroup()"> 분류 사용
                                    <input type="radio" name="isUseGroup" value="F" onclick="checkUseGroup()" checked=""> 사용 안함 &nbsp;&nbsp;&nbsp;
                                    <span class="blue">설명) 게시물의 종류을 분리하여 각각 게시물의 내용을 쉽게 구분해줍니다.</span>
                                </td>
                            </tr>

                        </tbody>
                        <tbody id="bodyGroup" style="display:none">
                            <tr>
                                <th>게시판 분류 입력</th>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:300px">
                                            <div>
                                                <select id="sGroup" name="sGroup" size="5" style="width:300px" onclick="checkGroup();">

                        </select>
                                            </div>

                                            <div class="mgt5 over_h">
                                                <div class="fl">
                                                    <span class="button small"><button type="button" onclick="moveGroup('UP');">▲</button></span>
                                                    <span class="button small"><button type="button" onclick="moveGroup('DOWN');">▼</button></span>
                                                </div>
                                                <div class="fr">
                                                    <span class="button small"><button type="button" onclick="delGroup();">삭제</button></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fl" style="margin-left:20px">
                                            <input type="text" name="groupInput" class="text_input" style="width:200px;" maxlength="30" onkeyup="if (event.keyCode==13) addGroup();">
                                            <span class="button small"><button id="btnGroupInput" type="button" mode="add" onclick="addGroup()">추가</button></span>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <th>업로드 개수제한</th>
                                <td>
                                    <select id="uploadLimitAmount" name="uploadLimitAmount" onchange="checkUploadLimitAmount()"><option value="">업로드 허용 안함</option><option value="1">1 개까지 허용</option><option value="2">2 개까지 허용</option><option value="3">3 개까지 허용</option><option value="4">4 개까지 허용</option><option value="5">5 개까지 허용</option><option value="6">6 개까지 허용</option><option value="7">7 개까지 허용</option><option value="8">8 개까지 허용</option><option value="9">9 개까지 허용</option><option value="10">10 개까지 허용</option></select>
                                </td>
                                <th>업로드 용량제한</th>
                                <td>
                                    <input type="text" name="uploadLimitSize" value="7" class="text_input" style="width: 30px; background-color: silver;" maxlength="3" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)" onblur="checkUploadLimitSize()" disabled="">                                    MB 이하
                                    <span class="blue">(최대 7MB 까지 설정가능)</span>
                                </td>
                            </tr>

                            <tr>
                                <th>권한설정</th>
                                <td colspan="3" style="border:0;padding:0">
                                    <table style="border-top:none;" class="t_list">
                                        <colgroup>
                                            <col width="*">
                                            <col width="*">
                                            <col width="*">
                                            <col width="*">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th style="padding-bottom:0">작성</th>
                                                <th style="padding-bottom:0">목록</th>
                                                <th style="padding-bottom:0">보기</th>
                                                <th style="padding-bottom:0">댓글</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><select id="permReg" name="permReg" style="width:80%"><option value="0">제한없음</option><option value="16-1">일반회원 이상</option><option value="16-4">코알라회원 이상</option><option value="2">부운영자 이상</option><option value="1">관리자 이상</option></select></td>
                                                <td><select id="permList" name="permList" style="width:80%"><option value="0">제한없음</option><option value="16-1">일반회원 이상</option><option value="16-4">코알라회원 이상</option><option value="2">부운영자 이상</option><option value="1">관리자 이상</option></select></td>
                                                <td><select id="permView" name="permView" style="width:80%"><option value="0">제한없음</option><option value="16-1">일반회원 이상</option><option value="16-4">코알라회원 이상</option><option value="2">부운영자 이상</option><option value="1">관리자 이상</option></select></td>
                                                <td><select id="permComment" name="permComment" style="width:80%"><option value="0">제한없음</option><option value="16-1">일반회원 이상</option><option value="16-4">코알라회원 이상</option><option value="2">부운영자 이상</option><option value="1">관리자 이상</option></select></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <th>댓글 스팸방지</th>
                                <td colspan="3">
                                    <input type="radio" name="isAntiSpam" value="T">스팸방지 허용
                                    <input type="radio" name="isAntiSpam" value="F" checked="">허용 안함
                                </td>
                            </tr>
                            <tr>
                                <th>코멘트 스팸방지</th>
                                <td colspan="3">
                                    <input type="radio" name="isAntiSpamComment" value="T">스팸방지 허용
                                    <input type="radio" name="isAntiSpamComment" value="F" checked="">허용 안함
                                </td>
                            </tr>

                            <tr>
                                <th>필터링</th>
                                <td colspan="3">
                                    <div><textarea name="filtering" rows="3" style="width:90%" class="text_input"></textarea></div>
                                    <div class="mgt5 blue">","(콤마)로 구분 (예 : 년,새끼,병신)</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="section_head">
                        <h4>게시판 디자인</h4>
                    </div>

                    <table class="t_list" style="border:solid 1px #ddd;">
                        <thead>
                            <tr>
                                <th>상단 디자인</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0">
                                    <div><textarea name="topDecor" style="width: 100%; height: 150px; display: none;" id="topDecor-placeholder"></textarea><iframe id="__se2_frame_topDecor-placeholder" name="__se2_frame_topDecor-placeholder" frameborder="0"
                                            scrolling="no" style="width: 100%; height: 252px;" src="/js/SmartEditor2Skin.html"></iframe></div>

                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>하단 디자인</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:0">
                                    <div><textarea name="bottomDecor" style="width: 100%; height: 150px; display: none;" id="bottomDecor-placeholder"></textarea><iframe id="__se2_frame_bottomDecor-placeholder" name="__se2_frame_bottomDecor-placeholder" frameborder="0"
                                            scrolling="no" style="width: 100%; height: 252px;" src="/js/SmartEditor2Skin(1).html"></iframe></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn">
                        <span class="button large black"><button type="button" onclick="validSubmit()">확인</button></span>
                        <span class="button large black"><button type="button" onclick="cancel()">취소</button></span>
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