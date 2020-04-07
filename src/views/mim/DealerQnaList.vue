<template>

            <div id="contents">
                <h3>판매자 문의하기</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자관리</li>
                    <li class="on">판매자 문의하기</li>
                </ul>
                <ul class="helpbox">
                    <li>판매자에게 궁금한 사항을 질문합니다.</li>
                </ul>



                <form name="Frm" method="post">
                    <input type="hidden" name="mode">
                    <input type="hidden" name="idx">

                    <table class="t_list">
                        <caption>판매자 문의 목록</caption>
                        <colgroup>
                            <col width="50">
                            <col width="150">
                            <col width="*">
                            <col width="80">
                            <col width="80">
                            <col width="30">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>업체</th>
                                <th>질문내용</th>
                                <th>등록일</th>
                                <th>답변</th>
                                <th><input type="checkbox" name="cbListAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="6" height="50">등록된 문의가 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href="/mim/dealer_qna_list?page=1"><strong>1</strong></a></span>
                    </div>

                    <div class="btn_right">
                        <span class="button large black"><button type="button" onclick="reg()">추가하기</button></span>
                        <span class="button large black"><button type="button" onclick="delList()">선택삭제</button></span>
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