<template>
    <div id="contents">
        <h3>{{ $route.name }}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>각 디렉토리별로 브랜드별 정리를 하실 수 있는 곳입니다.</li>
            <li>브랜드명을 적으시고 추가 해 주시면 상품등록에서 브랜드를 선택해 주시면 됩니다.</li>
        </ul>
        <form name="Frm">
            <div class="section_head mgb5">
                <h4><i class="xi-check-circle"></i> 총 <strong>9</strong>개의 정보가 등록되어있습니다.</h4>
                <div>
                    <select id="skey" name="skey" class="text_input">
                        <option value="name">브랜드명</option>
                    </select>
                    <input type="text" name="sword" value="" class="text_input" style="width:150px">
                    <button type="submit" class="btn btn-sm btn-default">검색</button>
                </div>
            </div>

            <table class="t_list">
                <caption>등록된 배너 리스트</caption>
                <colgroup>
                    <col width="100">
                    <col width="300">
                    <col width="*">
                    <col width="200">
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>브랜드명</th>
                        <th>이미지</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>FRED PERRY</td>
                        <td>
                            <div class="adjust_image_container"><img src="@/assets/img/brand_logo8.jpg" ow="182" oh="100"></div>
                        </td>
                        <td>
                            <div>
                                <b-button variant="default" onclick="edit(4)">수정</b-button>
                                <b-button variant="danger" onclick="del(4)">삭제</b-button>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>SAINT JAMES</td>
                        <td>
                            <div class="adjust_image_container"><img src="@/assets/img/brand_logo9.jpg" ow="182" oh="100"></div>
                        </td>
                        <td>
                            <div>
                                <b-button variant="default" onclick="edit(1)">수정</b-button>
                                <b-button variant="danger" onclick="del(1)">삭제</b-button>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div class="paging" style="margin-top:20px">
                <span><a href="/goods/brand_list?page=1&skey=&sword="><strong>1</strong></a></span>
            </div>

            <div class="btn_center">
                <button type="button" class="btn btn-lg btn-info" onclick="reg()">추가하기</button>
            </div>

        </form>
    </div>
</template>
<script>
export default {}
</script>
