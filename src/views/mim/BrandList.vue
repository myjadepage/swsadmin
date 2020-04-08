<template>
<div id="contents">
                <h3><font-awesome-icon icon="play-circle" />  브랜드관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자상품관리</li>
                    <li class="on">브랜드관리</li>
                </ul>
                <ul class="helpbox">
                    <li>판매자에게서 신청된 브랜드에 관하여 관리합니다.</li>
                </ul>

                <form name="Frm">
                    <div class="section_head">
                        <h4>총 <strong class="red">2</strong>건의 정보가 등록되어 있습니다.</h4>
                        <div>                         
                            <select id="skey" name="skey">
                                <option value="brand">브랜드명</option>
                                <option value="dealer">업체명</option>
                            </select>
                             <input type="text" name="sword" class="text_input" style="width:150px; margin:0 5px">
                            <b-button variant="secondary" size="sm">검색</b-button>
                        </div>
                    </div>

                    <table class="t_list">
                        <caption>등록된 브랜드 리스트</caption>
                        <colgroup>
                            <col width="40">
                            <col width="120">
                            <col width="*">
                            <col width="350">
                            <col width="70">
                            <col width="80">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>업체명</th>
                                <th>브랜드명</th>
                                <th>이미지</th>
                                <th>상태</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>1</td>
                                <td>내친구몰<br>[dealers]</td>
                                <td>나이키</td>
                                <td>
                                    <div class="adjust_image_container">-</div>
                                </td>
                                <td>대기중</td>
                                <td>
                                    <div><span class="button small"><button type="button" onclick="edit(19)">수정</button></span></div>
                                    <div class="mgt3"><span class="button small"><button type="button" onclick="del(19)">삭제</button></span></div>

                                    <div class="mgt3"><span class="button small"><button type="button" onclick="setConfirm(19)">승인</button></span></div>

                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href="/"><strong>1</strong></a></span>
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