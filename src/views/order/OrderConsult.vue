<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>주문/매출관리</li>
            <li>주문관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>   
        <ul class="helpbox">
            <li>주문상담 관리 페이지입니다.</li>
        </ul>
    </div>
</template>

<script>
export default {}
</script>