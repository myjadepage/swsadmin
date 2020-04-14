<template>
  <div>
        <div class="vodBox">
            <div class="vUser">
                <router-link to="/" class="bj">
                    <div class="clearfix">
                        <div class="jung_img">
                            <div class="aspect_1 unit-picResize" style="overflow: hidden; background-image: url('https://image.puddinglive.com/user/test9/757c4e8ae52e12079d7676461de07b89.jpg')">
                                <img src="https://image.puddinglive.com/user/test9/757c4e8ae52e12079d7676461de07b89.jpg" alt="profile_image" style="visibility: hidden;">
                            </div>
                        </div>
                    </div>
                    <span>레인보우</span>
                </router-link>

                <router-link to="" class="bnn1">
                    <font-awesome-icon icon="plus" style="background-color:#efefef" /> 팔로우
                </router-link>

                <router-link to="" class="bnn1">
                    <font-awesome-icon icon="paper-plane" /> 메시지
                </router-link>
            </div>
	
            <ul class="vBtns">
                <li><b-button variant="secondary">경고</b-button></li>
                <li><b-button variant="danger">강제종료</b-button></li>
            </ul>

            <div class="videoWrap">
                <div id="videoLayerCover" tabindex="1" style="width:395px; height:700px;">
                    <div id="player" class="is-small is-tiny use-play-1 is-autoplay is-loaded is-paused is-waiting">
                    </div>
                </div>

                <section class="reply w380">
                    <div class="rTitle">
                        <h3><font-awesome-icon icon="comment-dots" /> 댓글</h3>
                        <span><strong id="comment_cnt">0</strong>개</span>
                    </div>
                    <div>
                        <ul id="comment">
                        </ul>
                    </div>
                    <section class="sH9wk  _JgwE ">                      
                        <div class="RxpZH">                           
                            <textarea id="comment_text" aria-label="댓글 달기..." placeholder="댓글 달기..." class="Ypffh" autocomplete="off" style="overflow:hidden"></textarea>
                        </div>
                    </section>
                    <div class="MEAGs">
                        <b-button variant="primary" class="oF4XW dCJp8">댓글달기</b-button>
                    </div>
                </section>
            </div>

            <!-- live info -->
            <div class="tSero">
                <div class="vTitleSero">
                    <h3><span class="bn2"><font-awesome-icon icon="play-circle" /> LIVE</span>은비의 책소개</h3>
                    <div class="view">
                        <div class="vl_2">
                            <span><font-awesome-icon icon="eye" /> 조회수 80회</span>
                            <span>
                                <router-link to="" class="bnn1">
                                    <font-awesome-icon icon="heart" style="background-color:#efefef" /> 좋아요
                                </router-link> 0회</span>
                        </div>
                    </div>
                </div>

                <div class="relWrap">
                    <h3 class="vTitle2">관련 상품</h3>
                    <section class="regular">
                        <div class="imgLink" style="width: 84px;">
                            <router-link to="" title="라이징스타 엔젤 톤업크림30g">
                                <img src="https://images.shop-tree.com/images/stores/WZyqO1gRwg/products/1620891607857563.jpg" width="80" height="80" alt="">								
                            </router-link>
                        </div>
                    </section>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
/*vodbox*/
.clearfix { display: inline-block;}
.clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
}
.unit-picResize {
    background-size:cover;
    background-position:center center;
    background-repeat:no-repeat;
}
.aspect_1 { width: 50px; height: 50px; overflow: hidden; border: 1px soid blue; border-radius: 50%;}
.w380 { width: 380px !important;}

.vodBox{width: 820px;  margin: 10px auto 20px; padding: 25px 0;   background-color: #fff; box-shadow: 0 1px 10px rgba(0,0,0,0.1);  z-index: 120; position: relative; display: block; min-height: 800px;}
.vBtns {float: right; position: relative; font-size: 15px;}
.vBtns li {display: inline-block; margin-right: 10px;}

.vUser { display: flex; align-items: center; float: left; position: relative; top: -15px; left: 12px;}
.vUser span{ margin: 0 5px;}
.vUser a{font-size: 14px; border-radius: 5%; color: #8192a5; font-size: 12px; border:1px solid #e0e5eb; margin-right: 5px; }
.vUser .bnn1{ width: 80px; height: 30px; text-align: center; padding-top: 5px;}
.vUser .bnn1:last-child{ padding-right: 3px;}
.vUser .done{ color: #9f56f2 !important; border:1px solid rgba(159,86,242,0.5);}
.vUser a.bj{font-size: 16px; padding-right: 0; color: #202c37; border: 0;}
.vUser a.bj span { position: relative; top: -17px;}
.vPrice { color: #9f56f2;}

.videoWrap { clear: both;  position: relative; display: flex; margin-left: 12px; }
#videoLayerCover{ background-color: #333;}
.vTitle { border-bottom: 1px dotted #ccc; display: flex; justify-content: space-between; align-items: center;  padding: 5px 5px 20px 10px; margin-top: 7px; color: #202c37;}
.vTitle2{ padding: 15px 0 15px; font-weight: 400; }
.vSimilar { color: #fff; padding: 20px 0; text-align: center; font-weight: 400;}
.vTitle .view{ font-size: 13px; font-weight: 400; position: relative; top: 5px; right: 15px; color: #777; white-space: nowrap;}
.v_horizon .vTitle .view{right: 5px;}

.reply{ width: 365px; height: 450px; overflow: hidden; position: absolute; right: 12px;  border: 1px solid #ccc;}
.reply .rTitle{padding: 10px; border-bottom: 1px solid #ccc; position: relative;}
.reply .rTitle span{ position: absolute; top:10px; right: 10px; font-size: 15px; color: #555; }
.rTitle h3 img{ position: relative; top: 2px;}
.reply ul{ overflow:auto; height: 350px;}
.reply ul li{  word-break: break-all; vertical-align: top; }

.reply ul li.dat { border-bottom: 1px dotted #e0e5eb; margin-bottom: 15px;}
.reply h4{ height: 70px; display: inline-block;}
.reply ul li a{ vertical-align: top;}

.sH9wk{ background-color: #fff; height: 53px; border-top: 1px solid #ccc; position: relative;}
.dattoso{ position: absolute; top: -29px;/*box-shadow: 0 1px 3px rgba(0,0,0,0.2);*/ padding: 6px 14px; width: 300px; font-size: 12px; color: #fff; background-color:#5774f4; border-radius: 1px;}
.dabtoother{ background-color: #f9f4ff; }
.dattoso strong{ color: #f9f4ff;}
.dattoso button{ border: 0; padding: 0; margin: 0; background-color: #5774f4; float: right; color: #fff;}
.Ypffh { display: inline-block; width: 300px; height: 49px; padding: 10px;  border: 0; position: relative; top: 3px;}
.MEAGs{ float: right; vertical-align: top; position: relative; top: -51px; }
.oF4XW { height: 49px; width: 75px;color: #fff; background-color: #49b1c6; position: relative; }

.vTitleSero{  padding-bottom: 15px;  border-bottom: 1px solid #ccc; position: relative; left: -5px;}
.vTitleSero h3{ margin-top: 10px; color: #202c37; max-height: 49px; overflow: hidden; text-overflow: hidden;font-size: 15px;font-weight: bold;}
.vTitleSero .view{ margin-top: 12px; font-size: 13px; color: #777;  padding-right: 10px;}
.vTitleSero .view .vl_1{ display: inline-block; position: relative; top: 2px; color: #8192a5;}
.vl_2{ display: inline-block;}
.vl_2 button { background-color: #fff; border: 1px solid #ccc; border-radius: 5px; color: #777; font-size: 12px; padding: 3px 10px 5px;}
.vl_2 span{margin-left: 8px; color: #8192a5;}

.bn2 { font-size: 12px; display: inline-block;background-color: red; color: #fff; padding: 7px; border-radius: 5px; margin-right: 5px;}

.imgLink .popular-rate {width:370px;  padding:5px ;border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; letter-spacing:0; font-size:13px; opacity:1; border: 1px solid #e0e5eb; background-color: rgba(255,255,255,1);}
.imgLink .popular-rate .proPrice { width: 360px; }
.imgLink{ position: relative; }
.imgLink .btn-bj-photo{top:5px; right:25px; color:#fff; }

.onAir_video .slick-next{ right: -8px !important;}
.onAir_video .imgLink a.imLink{display: block; width: 370px; height: 208px; overflow: hidden; background-color: #eee; border-top-left-radius: 15px; border-top-right-radius: 15px; }


.relWrap {}
.v_horizon .relWrap{ padding: 0 12px;}
.relPro { }
.tSero { width: 380px;  position: absolute; right: 7px; top: 540px;}
.tSero .relPro dd{ width: 80px; height: 80px; margin-right: 5px; }

.tSero .vTitle { padding: 15px 0; font-size: 15px;}
.tSero .vTitle2{font-size: 15px; padding: 7px 0;}
.tSeroLive { width: 380px;  position: absolute; right: 7px; top: 460px;}

.relPro dd{ width: 100px; height: 100px; overflow: hidden; margin-right: 10px; display: inline-block; border: 1px solid #ccc; background-color: #000; position: relative;}
.v_horizon .relPro dd{ margin-right: 5px;}
.relPro a{ width: 100%; height: auto; position: absolute; z-index: 10;}
.relPro a:hover{ }
.relPro a .tit { position: absolute; font-size: 12px; width: 100%; height: 100%; letter-spacing: -0.15em; color: #fff;  left: 0; bottom: 0; padding: 5px; z-index: 11; background-color: rgba(0,0,0,0.5); opacity: 0; display: flex; align-items:flex-end; flex-flow: row wrap;}
.relPro a .tit .price { font-weight: bold; font-size: 14px; width: 100%;}
.relPro a .tit:hover{ opacity: 1; transition: 0.3s;}
.relPro a img{ width: 100%; }
.relPro h6{ width: 95px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12px;}




</style>