<template>
   <div id="contents">
       <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
       <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>방송관리</li>
            <li class="on">{{ $route.name }}</li>
       </ul>

       <div class="section_head">
            <h4>
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
                <b-button variant="outline-secondary" size="sm">검색</b-button>
            </h4>
            <div>
                <b-button variant="outline-secondary">경고내역</b-button>
                <b-button variant="outline-danger">강제종료내역</b-button>
            </div>
        </div>

       <form name="Frm" style="margin-top:40px">
            <ul class="livebox">
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일</strong>
                    </div>
                </li>
                <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링</strong>
                    </div>
                </li>
                 <li>
                    <div class="img_area">
                        <img src="@/assets/img/201324739120470.jpg" />
                        <span class="icon_live">LIVE</span>
                        <div class="button_area">
                            <span>판매수량 : 500개/1000</span>
                            <b-button variant="info" size="sm">경고</b-button> 
                            <b-button variant="danger" size="sm">강제종료</b-button>
                        </div>
                    </div>
                    <div class="text_area">
                        <p>콩이 언니 <span class="view_area"><font-awesome-icon icon="eye" /> 230명 시청</span></p>
                        <strong>겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링겨울 롱코트 스타일링</strong>
                    </div>
                </li>
            </ul>
       </form>
   </div>
</template>

<script>
export default {

}
</script>

<style>
.livebox {
    overflow: hidden;
}
.livebox li{
    float: left;
    margin: 0 auto;
    width: 174px;
    min-height: 325px;
    padding: 5px;
    margin-right: 20px;
    margin-bottom: 40px;
}
.livebox li:nth-child(10n) {
    clear: both;
}
.livebox .img_area{
    position: relative;
    width: 164px;
    height: 270px;
}
.livebox .img_area img{ 
    width: 100%;
    height: 100%;
}
.livebox .icon_live {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    padding:2px 5px;
    background-color:red;
    color: #fff;
    font-weight: bold;
}
.livebox .button_area {
    position: absolute;
    bottom: 0;
    text-align: center;
    padding: 10px;
    background-color: rgba(0,0,0,0.5);
}
.livebox .button_area span{
    color: #fff;
    font-size: 12px;
}
.livebox .text_area p{
    padding-top: 10px;
    color: blue;
}
.livebox .text_area strong{
    display: block;
    margin-top: 10px;
}
.livebox .view_area{
    float: right;
    color: #666;
}
.section_head button + button, .livebox button + button {
    margin-left: 5px;
}

</style>
