<template>
    <ul>
        <li class="admin"><strong>관리자님</strong> 안녕하세요! <i class="xi-calendar"></i> 오늘 : {{today}}</li>
        <li class="s_menu">
            <a href="/" class="btn btn-sm btn-default" target="_top" title="관리자홈"><i class="xi-home"></i></a>
            <a href="#" class="btn btn-sm btn-default" target="_blank" title="쇼핑몰홈"><i class="xi-shop"></i></a>
            <a href="logout" class="btn btn-sm btn-default" target="_top" title="로그아웃"><i class="xi-log-out"></i></a>
        </li>
    </ul>
</template>
<script>
export default {
    computed:{
        today(){
            let today = new Date()
            return `${today.getFullYear()}-${today.getMonth()+1>10?today.getMonth()+1:'0'+(today.getMonth()+1)}-${today.getDate()}`
        }
    }
}
</script>
