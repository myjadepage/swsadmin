<template>
    <div id="aside" style="z-index: 1">
        <h2>방송관리</h2>
        <dl>
            <dt><font-awesome-icon icon="minus" /> 방송관리</dt>
            <dd class="side_small_menu">
                <router-link to="/broadcast/BroadcastRequest" class=""> 방송신청목록</router-link>
                <router-link to="/broadcast/BroadcastStop" class=""> 방송중지목록</router-link>
                <router-link to="/broadcast/category" class=""> 방송송출관리</router-link>
            </dd>

            <dt><font-awesome-icon icon="minus" /> 편성표관리</dt>
            <dd class="side_small_menu">
                <a href="/broadcast/TimeTable" class=""><i class="xi-minus-min"></i>방송편성표 관리</a>
                <a href="/broadcast/TimeTableReg" class=""><i class="xi-minus-min"></i>방송편성표 등록</a>
            </dd>

            <dt><font-awesome-icon icon="minus" /> 비디오관리</dt>
            <dd class="side_small_menu">
                <a href="/broadcast/OldLive" class=""><i class="xi-minus-min"></i>지난라이브방송관리</a>
                <a href="/broadcast/video" class=""><i class="xi-minus-min"></i>비디오관리</a>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {}
</script>
