<template>
    <div id="wrap" style="min-width: 1866px">
        <div id="header">
            <div id="admininfo">
                <admin-menu name="AdminMenu"></admin-menu>
            </div>
            <div id="menu">
                <top-menu name="TopMenu"></top-menu>
            </div>
        </div>
        <contents-board name="ContentsBoard"></contents-board>
        <div id="footer">
            <p>Copyright ⓒ <strong>(주)이피엔스</strong> All rights reserved.</p>
        </div>
    </div>
</template>
<script>

import AdminMenu from './AdminMenu.vue'
import TopMenu from './TopMenu.vue'
import ContentsBoard from './ContentsBoard.vue'
export default {
  components:
    {
      AdminMenu: AdminMenu,
      TopMenu: TopMenu,
      ContentsBoard: ContentsBoard
    },
  data () {
    return {}
  },
  mounted: function () {
  }

}
</script>
