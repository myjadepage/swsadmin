<template>
    <ul>
        <li class="admin">
            <strong>{{ name?name:'관리자' }}님</strong> 안녕하세요!
            <font-awesome-icon icon="calendar" /> 오늘 : {{ today }}
        </li>
        <li class="s_menu">
            <!-- <a href="/dashboard" class="btn btn-sm btn-default" target="_top" title="관리자홈"><i class="xi-home"></i></a> -->
            <!-- <a href="#" class="btn btn-sm btn-default" target="_blank" title="쇼핑몰홈"><i class="xi-shop"></i></a> -->
            <router-link to="/" class="btn btn-sm btn-default" target="_top" title="로그아웃">로그아웃 
                <font-awesome-icon icon="sign-out-alt" /></router-link>
        </li>
    </ul>
</template>
<script>
export default {
    computed:{
        today(){
            let today = new Date()
            return `${today.getFullYear()}-${today.getMonth()+1>10?today.getMonth()+1:'0'+(today.getMonth()+1)}-${today.getDate()}`
        },
        name(){
            return sessionStorage.getItem('userName')
        }
    }
}
</script>
